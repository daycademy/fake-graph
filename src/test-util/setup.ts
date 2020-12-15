import { insertData } from '../util/setup-util';
import { testConn } from './testConn';

testConn(true).then(() => {
  insertData();
});
