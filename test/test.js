const util = require('util');

import {
  normalize,
  denormalize,
  schema
} from 'normalizr';

const myData = {
  users: [{
    id: 1
  }, {
    id: 2
  }]
};

const user = new schema.Entity('users');
const userSchema = { users: [ user ] };
const normalizedData = normalize(myData, userSchema)

console.log('normalizedData: ')
console.log(util.inspect(normalizedData, {showHidden: false, depth: null}));
