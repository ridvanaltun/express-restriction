const httpMocks = require('node-mocks-http')
const restrict = require('../src')

const allowedWebsites = [
  'www.foo.com/path',
  'bar.com/*',
  'sub.baz.com/*',
  '*.qux.com/*',
  'www.quux.com:8000/*'
]

const middleware = restrict.website(allowedWebsites)

describe('website restriction', () => {
  test('A specific URL with an exact path: www.example.com/path, should call next()', done => {
    const req = httpMocks.createRequest({
      headers: {
        referrer: allowedWebsites[0]
      }
    })
    const res = httpMocks.createResponse()

    const callback = err => {
      expect(err).toBeFalsy()
      done()
    }

    middleware(req, res, callback)
  })

  test('Any URL in a single domain with no subdomains, using a wildcard asterisk (*): example.com/*, should call next()', done => {
    const req = httpMocks.createRequest({
      headers: {
        referrer: allowedWebsites[1]
      }
    })
    const res = httpMocks.createResponse()

    const callback = err => {
      expect(err).toBeFalsy()
      done()
    }

    middleware(req, res, callback)
  })

  test('Any URL in a single subdomain, using a wildcard asterisk (*): sub.example.com/*, should call next()', done => {
    const req = httpMocks.createRequest({
      headers: {
        referrer: allowedWebsites[2]
      }
    })
    const res = httpMocks.createResponse()

    const callback = err => {
      expect(err).toBeFalsy()
      done()
    }

    middleware(req, res, callback)
  })

  test('Any subdomain or path URLs in a single domain, using wildcard asterisks (*): *.example.com/*, should call next()', done => {
    const req = httpMocks.createRequest({
      headers: {
        referrer: allowedWebsites[3]
      }
    })
    const res = httpMocks.createResponse()

    const callback = err => {
      expect(err).toBeFalsy()
      done()
    }

    middleware(req, res, callback)
  })

  test('A URL with a non-standard port: www.example.com:8000/*, should call next()', done => {
    const req = httpMocks.createRequest({
      headers: {
        referrer: allowedWebsites[4]
      }
    })
    const res = httpMocks.createResponse()

    const callback = err => {
      expect(err).toBeFalsy()
      done()
    }

    middleware(req, res, callback)
  })
})
