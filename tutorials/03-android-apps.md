# How do I restrict my APP to specific Android applications?

You can restrict APP to specific Android applications by providing a debug certificate fingerprint or a release certificate fingerprint.

## Debug certificate fingerprint

For Linux or macOS:

```sh
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

For Windows:

```sh
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

## Release certificate fingerprint

```sh
keytool -list -v -keystore your_keystore_name -alias your_alias_name
```

> Replace your_keystore_name with the fully-qualified path and name of the keystore, including the .keystore extension. Replace your_alias_name with the alias that you assigned to the certificate when you created it.

# Example

```javascript
const express = require('express')
const restriction = require('express-restriction')
const app = express()
const port = 3000

const allowedAndroidApps = [
  {
    packageName: 'com.foo',
    signature: 'd30dac129121e16967719b6291afa16675445d75'
  },
  {
    packageName: 'com.bar',
    signature: '1591082628a39381544ba0c30e707c382ecae1dc'
  }
]

// use in whole app
app.use(restriction.android(allowedAndroidApps))

// or use in specific routes
app.get(
  '/',
  restriction.android(
    allowedAndroidApps
  ) /* only allowed android apps access here */
)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
