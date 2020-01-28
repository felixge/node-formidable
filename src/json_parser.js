/* eslint-disable no-underscore-dangle */
const { Transform } = require('stream');

class JSONParser extends Transform {
  constructor() {
    super({ readableObjectMode: true });
    this.chunks = [];
  }

  _transform(chunk, encoding, callback) {
    this.chunks.push(String(chunk)); // todo consider using a string decoder
    callback();
  }

  _flush(callback) {
    try {
      const fields = JSON.parse(this.chunks.join(''));
      Object.keys(fields).forEach((key) => {
        const value = fields[key];
        this.push({ key, value });
      });
    } catch (e) {
      callback(e);
      return;
    }
    this.chunks = null;
    callback();
  }
}

exports.JSONParser = JSONParser;
