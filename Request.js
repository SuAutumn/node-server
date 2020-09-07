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
        // do not set encoding formatter, otherwise response data will be parsed as string
        // res.setEncoding('utf8')
        let buffer = Buffer.alloc(0)
        res.on('data', chunk => {
          buffer = Buffer.concat([
            buffer,
            Buffer.alloc(Buffer.byteLength(chunk), chunk),
          ])
        })
        res.on('end', () => {
          return resolve({
            status: res.statusCode,
            data: buffer,
            headers: res.headers,
          })
        })
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