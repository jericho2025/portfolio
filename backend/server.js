import { createApp } from './app.js';
import { serverConfig } from './config.js';

const { port, host } = serverConfig();
const server = createApp().listen(port, host, () => console.log(`Portfolio API: http://${host}:${port}`));
server.on('error', error => {
  console.error(`Server could not start: ${error.code || 'unknown error'}`);
  process.exitCode = 1;
});
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 5000).unref();
  });
}
