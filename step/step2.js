import input from '../input.json';
import fs from 'fs';
import { normalize, schema } from 'normalizr';
import path from 'path';

// customized schema
const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
    commenter: user
}, {
    processStrategy: (value, parent, key) => {
        console.log(`  comments:processStrategy 
        key[${key}]
        value[${JSON.stringify(value)}]
        parent[${JSON.stringify(parent)}]`);
        return { ...value, post: parent.id };
    }
});
const post = new schema.Entity('posts', {
    author: user,
    comments: [ comment ]
});
const postsSchema = [ post ];

// end of customized schema

/**
 * processStrategy(value, parent, key): Strategy to use when pre-processing the entity. 
    Use this method to add extra data, defaults, and/or completely change the entity before normalization is complete.
    Defaults to returning a shallow copy of the input entity.
        Note: It is recommended to always return a copy of your input and not modify the original.
            The function accepts the following arguments, in order:
        value: The input value of the entity.
        parent: The parent object of the input array.
        key: The key at which the input array appears on the parent object.

 * comment를 처리하기전에 해당 comment가 어떤 post 소속인지를 확인 할 수 있게 했다.
 * parent: input.json 에서 post가 comments 를 가지고 있으므로, parent는 post가 된다.
 * 하지만 user가 어떤 post와 comment를 가지는지 확인이 안된다.
 */

const normalizedData = normalize(input, postsSchema);
const output = JSON.stringify(normalizedData, null, 2);
fs.writeFileSync(path.resolve(__dirname, './output.step2.json'), output);

console.log('./output.step2.json has been created');