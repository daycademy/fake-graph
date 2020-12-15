import { Connection } from 'typeorm';
import { graphqlTestCall } from '../../../test-util/graphqlTestCall';
import { testConn } from '../../../test-util/testConn';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const getUserQuery = `query GetUser($id: Int!) {
  user(id: $id) {
    id
    email
    role
    username
    fullname
    age
  }
}`;

describe('Get User Query', () => {
  it('should return valid user with id 1', async () => {
    const response = await graphqlTestCall(getUserQuery, { id: 1 });

    expect(response.data!).toBeDefined();
    expect(response.data!.user).toBeDefined();
    expect(response.data!.user.id).toBe('1');
    expect(typeof response.data!.user.email).toBe('string');
    expect(response.data!.user.role).toBe('ADMIN');
    expect(typeof response.data!.user.username).toBe('string');
    expect(typeof response.data!.user.fullname).toBe('string');
    expect(typeof response.data!.user.age).toBe('number');
  });
});
