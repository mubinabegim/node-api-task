import { User } from "../models/user";

const users: User[] = [];

export function getAllUsers(): User[] {
    return users;
  }

  export function getUserById(id: string): User | undefined {
    return users.find((user) => user.id === id);
  }

  export function createUser(user: User): User {
    users.push(user);
    return user;
  }

  export function updateUser(user: User): User | undefined {
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      return user;
    }
    return undefined;
  }

  export function deleteUser(id: string): boolean {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      return true;
    }
    return false;
  }