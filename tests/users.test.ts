import {
    createUser,
    getAllUsers,
    getUserById,
   
  } from '../src/db/inMemoryDb';
  
  // Test 1: Get all records with a GET api/users request (an empty array is expected)
  test('GET /api/users returns an empty array', () => {
    const users = getAllUsers();
    expect(users).toEqual([]);
  });
  
  // Test 2: A new object is created by a POST api/users request (a response containing newly created record is expected)
  test('POST /api/users creates a new user', () => {
    const user = {
      id: '1',
      username: 'JohnDoe',
      age: 30,
      hobbies: ['Reading', 'Swimming'],
    };
  
    const createdUser = createUser(user);
    expect(createdUser).toEqual(user);
  });
  
  // Test 3: With a GET api/users/{userId} request, we try to get the created record by its id (the created record is expected)
  test('GET /api/users/{userId} returns the user with the specified id', () => {
    const user = {
      id: '1',
      username: 'JohnDoe',
      age: 30,
      hobbies: ['Reading', 'Swimming'],
    };
  
    createUser(user);
  
    const retrievedUser = getUserById(user.id);
    expect(retrievedUser).toEqual(user);
  });

  