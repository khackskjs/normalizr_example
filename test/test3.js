import {
    normalize,
    denormalize,
    schema
} from 'normalizr';
const util = require('util'),
data = [{
    ids: '123',
    name: 'Jim'
}, {
    ids: '456',
    name: 'Jane'
}];

const user = new schema.Entity('users', {}, { 
    // idAttribute: entity => entity.ids
    idAttribute: function(value, parent, key) {
        console.log(value, parent, key)
        return value.ids;
        return 'ids';
    }}),
    userListSchema = [user],
    normalizedData = normalize(data, userListSchema)

console.log('normalizedData: ')
console.log(util.inspect(normalizedData, {
    showHidden: false,
    depth: null
}));