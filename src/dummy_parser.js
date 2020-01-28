/* eslint-disable no-underscore-dangle */
const { Transform } = require('stream');

class DummyParser extends Transform {
  constructor(incomingForm) {
    super();
    this.incomingForm = incomingForm;
  }

  _flush(callback) {
    this.incomingForm.ended = true;
    this.incomingForm._maybeEnd();
    callback();
  }
}

exports.DummyParser = DummyParser;
