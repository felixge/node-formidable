'use strict';

const http = require('http');
const assert = require('assert');
const Formidable = require('../../src/index');

const testData = {
  numbers: [1, 2, 3, 4, 5],
  nested: { key: 'value' },
};

const PORT = 13532;
const server = http.createServer((req, res) => {
  const form = new Formidable();

  form.parse(req, (err, fields) => {
    assert.deepEqual(fields, testData);

    res.end();
    server.close();
  });
});

server.listen(PORT, (err) => {
  const choosenPort = server.address().port;
  const url = `http://localhost:${choosenPort}`;
  console.log('Server up and running at:', url);

  assert(!err, 'should not have error, but be falsey');

  const request = http.request({
    port: PORT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  request.write(JSON.stringify(testData));
  request.end();
});
