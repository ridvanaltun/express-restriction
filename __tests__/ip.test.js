const httpMocks = require('node-mocks-http')
const restrict = require('../src')

const exactIpV4Address = '192.168.0.1'
const ipV4AddressCIDR = '172.16.0.0/12'
const exactIpV6Address = '2001:db8::1'
const ipV6AddressCIDR = '2001:db8::/64'

// ipV4
const wrongIpV4Address = '192.168.0.2'
const okIpv4AddressCIDR = '172.16.0.1' // in 172.16.0.0/12
const wrongIpV4AddressCIDR = '172.255.255.255' // not in 172.16.0.0/12

// ipV6
const wrongIpV6Address = '2002:db8::1'
const okIpv6AddressCIDR = '2001:db8::1' // in 2001:db8::/64
const wrongIpV6AddressCIDR = '2002:db8::1' // not in 2001:db8::/64

const allowedIpAddresses = [
  exactIpV4Address,
  ipV4AddressCIDR,
  exactIpV6Address,
  ipV6AddressCIDR
]

const middlewareBehindProxy = restrict.ip(allowedIpAddresses, {
  behindProxy: true
})

describe('ip restriction', () => {
  describe('behindProxy: true', () => {
    describe('ipV4', () => {
      test('exact same ip address, should call next()', done => {
        const req = httpMocks.createRequest({
          headers: {
            'x-forwarded-for': exactIpV4Address
          }
        })
        const res = httpMocks.createResponse()

        const callback = err => {
          expect(err).toBeFalsy()
          done()
        }

        middlewareBehindProxy(req, res, callback)
      })

      test('ip address in range (cidr), should call next()', done => {
        const req = httpMocks.createRequest({
          headers: {
            'x-forwarded-for': okIpv4AddressCIDR
          }
        })
        const res = httpMocks.createResponse()

        const callback = err => {
          expect(err).toBeFalsy()
          done()
        }

        middlewareBehindProxy(req, res, callback)
      })

      test('wrong ip address, should return forbidden error', done => {
        const req = httpMocks.createRequest({
          headers: {
            'x-forwarded-for': wrongIpV4Address
          }
        })
        const res = httpMocks.createResponse()

        const callback = err => {
          expect(err.name).toBe('ForbiddenError')
          done()
        }

        middlewareBehindProxy(req, res, callback)
      })

      test('wrong ip address in range (cidr), should return forbidden error', done => {
        const req = httpMocks.createRequest({
          headers: {
            'x-forwarded-for': wrongIpV4AddressCIDR
          }
        })
        const res = httpMocks.createResponse()

        const callback = err => {
          expect(err.name).toBe('ForbiddenError')
          done()
        }

        middlewareBehindProxy(req, res, callback)
      })
    })

    describe('ipV6', () => {
      test('exact same ip address, should call next()', done => {
        const req = httpMocks.createRequest({
          headers: {
            'x-forwarded-for': exactIpV6Address
          }
        })
        const res = httpMocks.createResponse()

        const callback = err => {
          expect(err).toBeFalsy()
          done()
        }

        middlewareBehindProxy(req, res, callback)
      })

      test('ip address in range (cidr), should call next()', done => {
        const req = httpMocks.createRequest({
          headers: {
            'x-forwarded-for': okIpv6AddressCIDR
          }
        })
        const res = httpMocks.createResponse()

        const callback = err => {
          expect(err).toBeFalsy()
          done()
        }

        middlewareBehindProxy(req, res, callback)
      })

      test('wrong ip address, should return forbidden error', done => {
        const req = httpMocks.createRequest({
          headers: {
            'x-forwarded-for': wrongIpV6Address
          }
        })
        const res = httpMocks.createResponse()

        const callback = err => {
          expect(err.name).toBe('ForbiddenError')
          done()
        }

        middlewareBehindProxy(req, res, callback)
      })

      test('wrong ip address in range (cidr), should return forbidden error', done => {
        const req = httpMocks.createRequest({
          headers: {
            'x-forwarded-for': wrongIpV6AddressCIDR
          }
        })
        const res = httpMocks.createResponse()

        const callback = err => {
          expect(err.name).toBe('ForbiddenError')
          done()
        }

        middlewareBehindProxy(req, res, callback)
      })
    })
  })
})
