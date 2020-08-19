const http = require('http')
const ip = require('./ip')

http.createServer(async function (request, response) {
  const body = await getBody(request)
  console.log(new Date().toLocaleTimeString(), ' ---- ', request.method, JSON.parse(body).detail);
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.end('ok')
}).listen(3006, ip)

console.log(`Server running at http://${ip}:3006`)

/**
 * 获取request.body
 * @param request {IncomingMessage}
 */
function getBody(request) {
  return new Promise((resolve, reject) => {
    let str = '';
    request.on('data', chunk => {
      str += chunk;
    })

    request.on('end', () => {
      resolve(str);
    })
  })
}