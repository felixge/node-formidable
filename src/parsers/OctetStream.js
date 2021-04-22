import { PassThrough } from 'stream';

class OctetStreamParser extends PassThrough {
  constructor(options = {}) {
    super();
    this.globalOptions = { ...options };
  }
}

export default OctetStreamParser;
