const http = require('http')
const querystring = require('querystring')

class Request {
  static request ({ url, method = 'GET', data, headers = {}, timeout = 0 } = {}) {
    return new Promise((resolve, reject) => {
      const req = http.request(url, {
        method,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data || ''),
          ...headers,
        },
        timeout,
      }, res => {
        res.setEncoding('utf8')
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => resolve({
          status: res.statusCode,
          data,
          headers: res.headers,
        }))
      })
      req.on('error', reject)
      req.write(data || '')
      req.end()
    })
  }

  static get (url, headers) {
    return Request.request({
      url,
      headers,
    })
  }

  static post (url, data, headers) {
    return Request.request({
      url,
      method: 'POST',
      data,
      headers,
    })
  }
}

module.exports = Request