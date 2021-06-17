// /**
//  * This is not a production server yet!
//  * This is only a minimal backend to get started.
//  */

// import * as express from 'express';

// const app = express();

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to node-express-server!' });
// });

// const port = process.env.port || 3333;
// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/api`);
// });
// server.on('error', console.error);

// import config from "./config";

import * as express from 'express';
import expressLoader from './loaders';
async function startServer() {
  const app = express();
  const port = process.env.port || 3333;
  await expressLoader({ expressApp: app });

  app
    .listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api`);
    })
    .on('error', console.error);
}

startServer();
