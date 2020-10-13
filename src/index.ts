import Request from './Request'
import ip from './ip'
import { IncomingMessage, ServerResponse } from 'http'
import * as http from 'http'
import program from './commanderOption'

try {
  program.parse(process.argv)
} catch (e) {
  program.help()
}
const port = program.port
const url = program.proxyUrl

http
  .createServer(async function (
    request: IncomingMessage,
    response: ServerResponse
  ) {
    if (/\/log$/.test(request.url)) {
      const body = await getBody(request)
      console.log(
        `ip: ${request.connection.remoteAddress} ${new Date().toLocaleTimeString()}----${request.method} ${
          request.url
        }\ndata: ${body}`
      )

      response.writeHead(200, { 'Content-Type': 'text/plain' })
      return response.end('ok')
    }
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
      response.writeHead(res.status, res.headers)
      console.log(
        `${new Date().toLocaleTimeString()}----${request.method} ${
          request.url
        }\nproxy code: ${res.status}`
      )
      response.end(res.data)
    } catch (e) {
      console.error(e)
      response.writeHead(500, {
        'Content-Type': 'text/plain',
      })
      response.end('internal error')
    }
  })
  .listen(port)

console.log(`Server running at http://${ip}:${port}`)

/**
 * 获取request.body
 * @param request {IncomingMessage}
 */
function getBody(request: IncomingMessage) {
  return new Promise((resolve, reject) => {
    let str = ''
    request.on('data', (chunk) => {
      str += chunk
    })

    request.on('end', () => {
      resolve(str)
    })

    request.on('error', reject)
  })
}
