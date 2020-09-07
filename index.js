const http = require('http')
const qs = require('querystring')
const ip = require('./ip')
const Request = require('./Request')

const port = 3006
const url = 'http://192.168.1.6'

http.createServer(async function (request, response) {
  console.log(new Date().toLocaleTimeString(), ' ---- ', request.method, ' ', request.url)
  try {
    const method = request.method.toLowerCase()
    let res
    if (method === 'post') {
      const body = await getBody(request)
      console.log(body)
      res = await Request.post(url + request.url, body, request.headers)
    }
    if (method === 'get') {
      res = await Request.get(url + request.url, request.headers)
    }
    response.writeHead(
      res.status,
      res.headers,
    )
    response.end(res.data)
  } catch (e) {
    console.error(e)
    response.writeHead(500, {
      'Content-Type': 'text/plain',
    })
    response.end('internal error')
  }
}).listen(port)

console.log(`Server running at http://${ip}:${port}`)

/**
 * 获取request.body
 * @param request {IncomingMessage}
 */
function getBody (request) {
  return new Promise((resolve, reject) => {
    let str = ''
    request.on('data', chunk => {
      str += chunk
    })

    request.on('end', () => {
      resolve(str)
    })

    request.on('error', reject)
  })
}