import test from 'node:test';
import assert from 'node:assert/strict';
import { apiUrl } from '../src/utils/apiUrl.js';
test('API base is optional locally, required remotely, HTTPS and origin-only in production',()=>{
  assert.equal(apiUrl('/api/github','',false),'/api/github');
  assert.equal(apiUrl('/api/github','https://portfolio-api.onrender.com/',true),'https://portfolio-api.onrender.com/api/github');
  for(const base of ['', 'http://localhost:3001','https://localhost.','https://dev.localhost','https://127.0.0.2','https://user:pass@example.com','https://example.com/path'])assert.throws(()=>apiUrl('/api/github',base,true));
});
