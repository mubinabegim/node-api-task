import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/usersController';

export function handleRequest(req: IncomingMessage, res: ServerResponse): void {
  const { method, url } = req;

  if (url === '/api/users' && method === 'GET') {
    getAllUsers(req, res);
  } else if (url.match(/\/api\/users\/([a-zA-Z0-9-]+)/)) {
    const userId = url.split('/')[3];
    if (method === 'GET') {
      getUserById(req, res, userId);
    } else if (method === 'PUT') {
      updateUser(req, res, userId);
    } else if (method === 'DELETE') {
      deleteUser(req, res, userId);
    }
  } else if (url === '/api/users' && method === 'POST') {
    createUser(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not found' }));
  }
}
