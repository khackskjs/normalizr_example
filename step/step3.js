import input from '../input.json';
import fs from 'fs';
import { normalize, schema } from 'normalizr';
import path from 'path';

const userProcessStrategy = (value, parent, key) => {
    switch (key) {
      case 'author':
        return { ...value, posts: [ parent.id ] };
      case 'commenter':
        return { ...value, comments: [ parent.id ] };
      default:
        return { ...value };
    }
  };

  const userMergeStrategy = (entityA, entityB) => {
    return {
      ...entityA,
      ...entityB,
      posts: [ ...(entityA.posts || []), ...(entityB.posts || []) ],
      comments: [ ...(entityA.comments || []), ...(entityB.comments || []) ]
    }
  };

// customized schema
const user = new schema.Entity('users', {}, {
    processStrategy: (value, parent, key) => {
        console.log(`*  users:processStrategy 
        key: ${key}
        value: ${JSON.stringify(value)}
        parent: ${JSON.stringify(parent)}`);
        return userProcessStrategy(value, parent, key);
    },
    mergeStrategy: (entityA, entityB) => {
        console.log(`-  user:mergeStrategy
        entityA: ${JSON.stringify(entityA)},
        entityB: ${JSON.stringify(entityB)}
        `);
        return userMergeStrategy(entityA, entityB);
    }
});
const comment = new schema.Entity('comments', {
    commenter: user
}, {
    processStrategy: (value, parent, key) => {
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
 * mergeStrategy(entityA, entityB): Strategy to use when merging two entities with the same id value. 
        Defaults to merge the more recently found entity onto the previous.
 */

const normalizedData = normalize(input, postsSchema);
const output = JSON.stringify(normalizedData, null, 2);
fs.writeFileSync(path.resolve(__dirname, './output.step3.json'), output);

console.log('./output.step3.json has been created');