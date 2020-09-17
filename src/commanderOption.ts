import { program } from 'commander'

program
  .version('0.0.1')
  .option('-p, --port <port>', '指定端口，默认3006', '3006')
  .requiredOption('--proxy-url <url>', '转发域名')
  .exitOverride()
export default program