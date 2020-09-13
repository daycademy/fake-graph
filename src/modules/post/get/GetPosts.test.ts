import { Connection } from 'typeorm';
import { testConn } from '../../../test-util/testConn';
import { graphqlTestCall } from '../../../test-util/graphqlTestCall';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const getPostsQuery = `{
  posts {
    id
    text
  }
}
`;

describe('Get Posts', () => {
  it('are ten posts in database', async () => {
    const response = await graphqlTestCall(getPostsQuery);

    expect(response.data!.posts).toHaveLength(10);
  });
});
