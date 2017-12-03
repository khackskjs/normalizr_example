import { schema } from 'normalizr';

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
  console.log('_userMergeStrategy_entityA: ', entityA);
  console.log('_userMergeStrategy_entityB: ', entityB);
  var ret = {
    ...entityA,
    ...entityB,
    posts: [ ...(entityA.posts || []), ...(entityB.posts || []) ],
    comments: [ ...(entityA.comments || []), ...(entityB.comments || []) ]
  };
  console.log('_userMergeStrategy_ret: ', ret);
  return ret;
};

const user = new schema.Entity('users', {}, {
  mergeStrategy: userMergeStrategy,
  processStrategy: userProcessStrategy
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

export default [ post ];