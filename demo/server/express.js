import express from 'express';

const server = express();

const PORT = process.env.PORT || 8080;

const staticMiddleware = express.static('dist');

server.use(staticMiddleware);

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
