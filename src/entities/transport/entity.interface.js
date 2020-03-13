import { ITransport } from './transport.interface';


export class IEntityTransport extends ITransport {
  baseUri;

  createPostProcess;
  readPostProcess;
  updatePostProcess;
  deletePostProcess;

  createPreProcess;
  readPreProcess;
  updatePreProcess;
  deletePreProcess;

  /**
   * @param {string} baseUri - base uri of entity
   *
   * @param {callback} createPostProcess - post hook of create method
   * @param {callback} readPostProcess - post hook of read method
   * @param {callback} updatePostProcess - post hook of update method
   * @param {callback} deletePostProcess - post hook of delete method
   *
   * @param {callback} createPreProcess - pre hook of create method
   * @param {callback} readPreProcess - pre hook of read method
   * @param {callback} updatePreProcess - pre hook of update method
   * @param {callback} deletePreProcess - pre hook of delete method
   */
  constructor ({
    baseUri,

    createPostProcess,
    readPostProcess,
    updatePostProcess,
    deletePostProcess,

    createPreProcess,
    readPreProcess,
    updatePreProcess,
    deletePreProcess,
  }) {
    super();

    this.baseUri = baseUri;

    this.createPostProcess = createPostProcess;
    this.readPostProcess = readPostProcess;
    this.updatePostProcess = updatePostProcess;
    this.deletePostProcess = deletePostProcess;

    this.createPreProcess = createPreProcess;
    this.readPreProcess = readPreProcess;
    this.updatePreProcess = updatePreProcess;
    this.deletePreProcess = deletePreProcess;
  }

  async wrapperRequest({ method, data, postHook }) {
    try {
      const payload = await this.request({ url: this.baseUri, method: method, data });
      if (postHook !== undefined) {
        return postHook(null, payload, data);
      }
    } catch (error) {
      if (postHook !== undefined) {
        return postHook(error);
      }
    }
  }

  async create(data) {
    return await this.wrapperRequest({
      method: 'POST',
      data: this.createPreProcess ? this.createPreProcess(data) : data,
      postHook: this.createPostProcess
    });
  }

  async read(data) {
    return await this.wrapperRequest({
      method: 'GET',
      data: this.readPreProcess ? this.readPreProcess(data) : data,
      postHook: this.readPostProcess
    });
  }

  async update(data) {
    return await this.wrapperRequest({
      method: 'PUT',
      data: this.updatePreProcess ? this.updatePreProcess(data) : data,
      postHook: this.updatePostProcess
    });
  }

  async delete(data) {
    return await this.wrapperRequest({
      method: 'DELETE',
      data: this.deletePreProcess ? this.deletePreProcess(data) : data,
      postHook: this.deletePostProcess
    });
  }
}
