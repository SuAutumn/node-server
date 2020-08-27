const http = require('http')
const ip = require('./ip')

const port = 3006;

http.createServer(async function (request, response) {
  if (request.method.toLowerCase() === 'post') {
    const body = await getBody(request)
    console.log(new Date().toLocaleTimeString(), ' ---- ', request.method, JSON.parse(body));
  } else {
    console.log(new Date().toLocaleTimeString(), ' ---- ', request.method);
  }
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.end('ok')
}).listen(port)

console.log(`Server running at http://${ip}:${port}`)

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

    request.on('error', reject)
  })
}