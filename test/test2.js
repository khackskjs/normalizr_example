const util = require('util');

import {
    normalize,
    denormalize,
    schema
} from 'normalizr';

const data = [{
    id: '123',
    name: 'Jim'
}, {
    id: '456',
    name: 'Jane'
}];

const user = new schema.Entity('users');
const userListSchema = [user];
const normalizedData = normalize(data, userListSchema)

console.log('normalizedData: ')
console.log(util.inspect(normalizedData, {
    showHidden: false,
    depth: null
}));