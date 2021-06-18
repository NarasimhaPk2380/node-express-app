import * as express from 'express';
import expressLoader from './loaders';
const app = express();

async function startServer() {
  const port = process.env.port || 3333;
  await expressLoader({ expressApp: app });
  app
    .listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api`);
    })
    .on('error', console.error);
}

startServer();

module.exports = app;
