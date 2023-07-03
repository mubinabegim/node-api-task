import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../models/user';
import {
  getAllUsers as getAllUsersFromDb,
  getUserById as getUserByIdFromDb,
  createUser as createUserInDb,
  updateUser as updateUserInDb,
  deleteUser as deleteUserInDb,
} from '../../db/inMemoryDb';

export async function getAllUsers(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const users = await getAllUsersFromDb();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

export async function getUserById(req: IncomingMessage, res: ServerResponse, userId: string): Promise<void> {
  const user = await getUserByIdFromDb(userId);

  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  }
}

export async function createUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Username and age are required' }));
      return;
    }

    const newUser: User = {
      id: uuidv4(),
      username,
      age,
      hobbies: hobbies || [],
    };

    const createdUser = await createUserInDb(newUser);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(createdUser));
  });
}

export async function updateUser(req: IncomingMessage, res: ServerResponse, userId: string): Promise<void> {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Username and age are required' }));
      return;
    }

    const updatedUser: User = {
      id: userId,
      username,
      age,
      hobbies: hobbies || [],
    };

    const user = await updateUserInDb(updatedUser);

    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  });
}

export async function deleteUser(req: IncomingMessage, res: ServerResponse, userId: string): Promise<void> {
  const deleted = await deleteUserInDb(userId);

  if (deleted) {
    res.writeHead(204);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  }
}
