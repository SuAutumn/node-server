const os = require('os');

let ip = ''
const networkInterface = os.networkInterfaces()

Object.keys(networkInterface).forEach(key => {
  networkInterface[key].forEach(net => {
    if (net.family.toLowerCase() === 'ipv4' && !net.internal) {
      ip = net.address
    }
  })
})

module.exports = ip;
