import * as http from 'http';
import * as cluster from 'cluster';
import * as sticky from 'sticky-session';

const port: number = 4000;

// Create the server instance
const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  // Handle your requests here
});

if ((cluster as any).isMaster) {
  const numWorkers: number = require('os').cpus().length - 1;

  console.log(`Master process ${process.pid} is running`);

  // Fork worker processes
  for (let i = 0; i < numWorkers; i++) {
    (cluster as any).fork();
  }

  (cluster as any).addListener('exit', (worker: cluster.Worker, code: number, signal: string) => {
    console.log(`Worker process ${worker.process.pid} died`);
    (cluster as any).fork(); // Fork a new worker process to replace the dead one
  });
} else {
  // Use sticky sessions to distribute requests across workers
   sticky.listen(server, port);
   console.log(`Worker process ${process.pid} is running on port ${port}`);
    
}
