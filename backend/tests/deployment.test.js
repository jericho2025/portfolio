import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../app.js';
import { serverConfig } from '../config.js';

test('production uses all interfaces and supplied port; local stays loopback', () => {
  assert.deepEqual(serverConfig({ NODE_ENV: 'production', PORT: '10000' }), { host: '0.0.0.0', port: 10000 });
  assert.deepEqual(serverConfig({ RENDER: 'true', PORT: '9876', HOST: '127.0.0.1' }), { host: '0.0.0.0', port: 9876 });
  assert.deepEqual(serverConfig({}), { host: '127.0.0.1', port: 3001 });
  assert.throws(() => serverConfig({ PORT: 'bad' }));
});
test('CORS allows exact configured origins, rejects others and keeps API JSON', async t => {
  const app=createApp(undefined,{allowedOrigins:'https://portfolio.example'});
  const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));t.after(()=>new Promise(r=>server.close(r)));
  const base=`http://127.0.0.1:${server.address().port}`;
  const allowed=await fetch(base+'/api/health',{headers:{Origin:'https://portfolio.example'}});
  assert.equal(allowed.status,200);assert.equal(allowed.headers.get('access-control-allow-origin'),'https://portfolio.example');assert.equal(allowed.headers.get('access-control-allow-credentials'),null);
  const denied=await fetch(base+'/api/health',{headers:{Origin:'https://evil.example'}});assert.equal(denied.status,403);assert.equal(denied.headers.get('access-control-allow-origin'),null);
  const preflight=await fetch(base+'/api/github',{method:'OPTIONS',headers:{Origin:'https://portfolio.example','Access-Control-Request-Method':'GET'}});assert.equal(preflight.status,204);
  const plain=await fetch(base+'/api/health');assert.equal(plain.status,200);
  const missing=await fetch(base+'/api/missing');assert.equal(missing.status,404);assert.match(missing.headers.get('content-type'),/json/);
});
