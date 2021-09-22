const net = require('net')
const IPCIDR = require('ip-cidr')
const createError = require('http-errors')

const restrictionError = () =>
  createError.Forbidden(
    'There is a restriction configured. Request does not match these restrictions.'
  )

/**
 * An Express middleware.
 *
 * @typedef {Function} ExpressMiddleware
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

/**
 * You can restrict an API key to specific Android applications by providing a debug certificate fingerprint or a release certificate fingerprint
 *
 * @typedef {string} CertificateFingerprint
 */

/**
 * @typedef {object} AndroidApp
 * @property {string}                 packageName Android package name from your AndroidManifest.xml file, like com.mydomain.app
 * @property {CertificateFingerprint} signature   SHA-1 signing-certificate fingerprint, lower-case and without : sign, like d30dac129121e16967719b6291afa16675445d75
 */

/**
 * Accept requests from Android apps with given list.
 *
 * @param {Array.<AndroidApp>}  androidApps List of Android apps.
 * @returns {ExpressMiddleware} middleware
 */
module.android = androidApps => {
  return (req, res, next) => {
    androidApps.forEach(({ packageName, signature }) => {
      const isPackageName = req.headers['x-android-package'] === packageName
      const isSignature = req.headers['x-android-cert'] === signature

      if (isPackageName && isSignature) return next()
    })

    return next(restrictionError())
  }
}

/**
 * Accept requests from iOS apps with given list.
 *
 * @param {Array} bundleIdentifiers List of iOS bundle identifiers.
 * @returns {ExpressMiddleware} middleware
 */
module.ios = bundleIdentifiers => {
  return (req, res, next) => {
    bundleIdentifiers.forEach(bundleIdentifier => {
      const isBundleIdentifier =
        req.headers['x-ios-bundle-identifier'] === bundleIdentifier

      if (isBundleIdentifier) return next()
    })

    return next(restrictionError())
  }
}

/**
 * How do I restrict my API key to specific websites?
 *
 * Use an HTTP referrer to restrict the URLs that can use an API key.
 * Here are some examples of URLs that you can allow to set up a referrer:
 *
 * - A specific URL with an exact path: www.example.com/path
 * - Any URL in a single domain with no subdomains, using a wildcard asterisk (*): example.com/*
 * - Any URL in a single subdomain, using a wildcard asterisk (*): sub.example.com/*
 * - Any subdomain or path URLs in a single domain, using wildcard asterisks (*): *.example.com/*
 * - A URL with a non-standard port: www.example.com:8000/*
 *
 * Note: query parameters and fragments are not currently supported; they will be ignored if you include them in an HTTP referrer.
 *
 * @typedef {string} HTTPReferrer
 */

/**
 * Accept requests from specified HTTP referrers (web sites).
 *
 * @param {Array.<HTTPReferrer>} httpReferrers List of HTTP referrers, like *.example.com/*.
 * @returns {ExpressMiddleware} middleware
 */
module.website = httpReferrers => {
  return (req, res, next) => {
    httpReferrers.forEach(referrer => {
      // referer has 2 spelling, use both
      const requestReferrer = req.headers.referrer || req.headers.referer
      const isReferrerMatch = requestReferrer === referrer

      //  @TODO cheat: https://github.com/brannondorsey/host-validation/blob/master/index.js

      if (isReferrerMatch) return next()
    })

    return next(restrictionError())
  }
}

/**
 * IPv4 or IPv6 or a subnet using CIDR notation (e.g. 192.168.0.0/22).
 *
 * @typedef {string} IpAddress
 */

/**
 * Accept requests from server IP addresses (web servers, cron jobs, etc.).
 *
 * @param {Array.<IpAddress>} ipAddresses List of IP addresses, example: 192.168.0.1, 172.16.0.0/12, 2001:db8::1 or 2001:db8::/64.
 * @param {object} options  Specialize the middleware
 * @param {boolean} [options.behindProxy=false]  Is this app running over a proxy?, like NGINX? Don't forget to bind client IP address to x-forwarded-for as header in proxy server.
 * @returns {ExpressMiddleware} middleware
 */
module.ip = (ipAddresses, options = { behindProxy: false }) => {
  return (req, res, next) => {
    // req.connection.remoteAddress always equals to 127.0.0.1 if the app running over a proxy
    // therefore need to check request header to learn request ip address
    // proxy server need to bind client IP address to x-forwarded-for as header
    const ipAddrWhenBehingProxy = options.behindProxy
      ? req.headers['x-forwarded-for']
      : null

    const ipAddrDefault = req.connection.remoteAddress

    const clientIpRaw = ipAddrWhenBehingProxy || ipAddrDefault

    // This can return a comma separated list of IP addresses.
    // Select first IP address
    const clientIp = clientIpRaw.split(',')[0].trim()

    const isClientIpAllowed = ipAddresses.some(ipAddress => {
      const isIp = net.isIP(ipAddress) !== 0
      const isCIDR = IPCIDR.isValidAddress(ipAddress)

      if (isIp) return ipAddress === clientIp

      if (isCIDR) {
        const cidr = new IPCIDR(ipAddress)
        const isIpInCidrRange = cidr.contains(clientIp)

        return isIpInCidrRange
      }

      return false
    })

    if (isClientIpAllowed) return next()

    return next(restrictionError())
  }
}
