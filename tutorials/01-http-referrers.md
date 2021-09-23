# How do I restrict my App to specific websites?

Here are some examples of URLs that you can allow to set up a referrer:

- A specific URL with an exact path: www.example.com/path
- Any URL in a single domain with no subdomains, using a wildcard asterisk (_): example.com/_
- Any URL in a single subdomain, using a wildcard asterisk (_): sub.example.com/_
- Any subdomain or path URLs in a single domain, using wildcard asterisks (_): _.example.com/\*
- A URL with a non-standard port: www.example.com:8000/*

**Note:** query parameters and fragments are not currently supported; they will be ignored if you include them in an HTTP referrer.

# Example

```javascript
const express = require('express')
const restriction = require('express-restriction')
const app = express()
const port = 3000

const allowedWebsites = [
  'www.foo.com/path',
  'bar.com/*',
  'sub.baz.com/*',
  '*.qux.com/*',
  'www.quux.com:8000/*'
]

// use in whole app
app.use(restriction.website(allowedWebsites))

// or use in specific routes
app.get(
  '/',
  restriction.website(allowedWebsites) /* only allowed websites access here */
)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
