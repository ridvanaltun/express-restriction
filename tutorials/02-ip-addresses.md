# Example

```javascript
const express = require('express')
const restriction = require('express-restriction')
const app = express()
const port = 3000

const allowedIpAddresses = [
  '192.168.0.1',
  '172.16.0.0/12',
  '2001:db8::1',
  '2001:db8::/64'
]

// use in whole app
app.use(restriction.ip(allowedIpAddresses))

// or use in specific routes
app.get(
  '/',
  restriction.ip(allowedIpAddresses) /* only allowed ip addresses access here */
)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
