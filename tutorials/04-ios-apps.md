# Example

```javascript
const express = require('express')
const restriction = require('express-restriction')
const app = express()
const port = 3000

const bundleIdentifiers = ['com.foo', 'com.bar']

// use in whole app
app.use(restriction.ios(bundleIdentifiers))

// or use in specific routes
app.get(
  '/',
  restriction.ios(bundleIdentifiers) /* only allowed ios apps access here */
)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
