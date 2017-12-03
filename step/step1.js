import input from '../input.json';
import fs from 'fs';
import { normalize, schema } from 'normalizr';
import path from 'path';

// customized schema
const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
    commenter: user
});
const post = new schema.Entity('posts', {   // output에 posts: {} 형태로 표시 될 것임
    author: user,
    comments: [ comment ]
});    
const postsSchema = [ post ];

// end of customized schema

/**
 * 전체 구조를 먼저 파악함.
 * JSON 은 post Array 형태로 되어 있고, post는 id, title, author, comments:[] 로 이루어짐
 * 
 * entities.posts 만 보면 문제가 없다.
 * 하지만 user가 가진 posts와 comment 를 찾을 수 없고,
 * comments가 어떤 post에 속하는지 알 수가 없다.
 */

const normalizedData = normalize(input, postsSchema);
const output = JSON.stringify(normalizedData, null, 2);
fs.writeFileSync(path.resolve(__dirname, './output.step1.json'), output);

console.log('./output.step1.json has been created');