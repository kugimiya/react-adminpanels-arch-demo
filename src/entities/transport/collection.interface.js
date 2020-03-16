import { ITransport } from './transport.interface';


export class ICollectionTransport extends ITransport {
  baseUri;
  readPostProcess;
  readPreProcess;

  constructor({ baseUri, readPostProcess, readPreProcess }) {
    super();

    this.baseUri = baseUri;
    this.readPostProcess = readPostProcess;
    this.readPreProcess = readPreProcess;
  }

  wrapperRequest({ method, data, postHook }) {
    return this.request({ url: this.baseUri, method: method, data })
      .then(payload => postHook(null, payload, data))
      .catch(err => postHook(err));
  }

  read(data) {
    return this.wrapperRequest({
      method: 'GET',
      data: this.readPreProcess ? this.readPreProcess(data) : data,
      postHook: this.readPostProcess
    });
  }
}
