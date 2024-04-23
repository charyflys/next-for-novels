export default function Redirect (req, res) {
    // Insert redirect rules here
    if (req.url.startsWith('/novel')) {
      res.statusCode = 308
      res.setHeader('location', '/articleview')
      // Caching headers
      res.set('Cache-control', 's-maxage=600')
      return res.end()
    }
  
    res.statusCode = 404
    return res.end('Not found')
  }