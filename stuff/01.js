import { normalize, schema } from 'normalizr';
const input = { books: [{ id: 1, title: 'rework' }, { id: 2, title: '대한민국이 묻는다'}] },
  book = new schema.Entity('book'),
  bookSchema = { books: [book] },
  normalized = normalize(input, bookSchema);

console.log(require('util').inspect(normalized, { depth: null }));