const httpMocks = require('node-mocks-http')
const restrict = require('../src')

const androidApps = [
  {
    packageName: 'com.foo',
    signature: 'd30dac129121e16967719b6291afa16675445d75'
  },
  {
    packageName: 'com.bar',
    signature: '1591082628a39381544ba0c30e707c382ecae1dc'
  }
]

const middleware = restrict.android(androidApps)

describe('android restriction', () => {
  test('should call next()', done => {
    const req = httpMocks.createRequest({
      headers: {
        'x-android-package': androidApps[1].packageName,
        'x-android-cert': androidApps[1].signature
      }
    })
    const res = httpMocks.createResponse()

    const callback = err => {
      expect(err).toBeFalsy()
      done()
    }

    middleware(req, res, callback)
  })

  test('wrong package name, should return forbidden error', done => {
    const req = httpMocks.createRequest({
      headers: {
        'x-android-package': 'com.baz',
        'x-android-cert': androidApps[0].signature
      }
    })
    const res = httpMocks.createResponse()

    const callback = err => {
      expect(err.name).toBe('ForbiddenError')
      done()
    }

    middleware(req, res, callback)
  })

  test('wrong signature, should return forbidden error', done => {
    const req = httpMocks.createRequest({
      headers: {
        'x-android-package': androidApps[0].packageName,
        'x-android-cert': 'a-random-signature'
      }
    })
    const res = httpMocks.createResponse()

    const callback = err => {
      expect(err.name).toBe('ForbiddenError')
      done()
    }

    middleware(req, res, callback)
  })

  test('missing package name, should return forbidden error', done => {
    const req = httpMocks.createRequest({
      headers: {
        'x-android-cert': androidApps[0].signature
      }
    })
    const res = httpMocks.createResponse()

    const callback = err => {
      expect(err.name).toBe('ForbiddenError')
      done()
    }

    middleware(req, res, callback)
  })

  test('missing signature, should return forbidden error', done => {
    const req = httpMocks.createRequest({
      headers: {
        'x-android-package': androidApps[0].packageName
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
