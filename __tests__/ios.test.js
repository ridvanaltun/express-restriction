const httpMocks = require('node-mocks-http')
const restrict = require('../src')

const bundleIdentifiers = ['com.foo', 'com.bar']

const middleware = restrict.ios(bundleIdentifiers)

describe('ios restriction', () => {
  test('should call next()', done => {
    const req = httpMocks.createRequest({
      headers: {
        'x-ios-bundle-identifier': bundleIdentifiers[0]
      }
    })
    const res = httpMocks.createResponse()

    const callback = err => {
      expect(err).toBeFalsy()
      done()
    }

    middleware(req, res, callback)
  })

  test('wrong bundle identifier, should return forbidden error', done => {
    const req = httpMocks.createRequest({
      headers: {
        'x-ios-bundle-identifier': 'com.baz'
      }
    })
    const res = httpMocks.createResponse()

    const callback = err => {
      expect(err.name).toBe('ForbiddenError')
      done()
    }

    middleware(req, res, callback)
  })

  test('missing payload, should return forbidden error', done => {
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()

    const callback = err => {
      expect(err.name).toBe('ForbiddenError')
      done()
    }

    middleware(req, res, callback)
  })
})
