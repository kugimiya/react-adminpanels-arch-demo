import axios from 'axios';
import uricomponent from 'uricomponent';

export class ITransport {
  request({ url = '/', data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `${ url }?${ this.serialize(data) }`,
        method
      })
      .then(response => {
        if (response.data.error === undefined || response.data.error === null) {
          reject(response.data.error);
          return;
        }

        resolve(response.data.payload);
      })
      .catch(err => reject(err));
    });
  }

  serialize(obj) {
    return uricomponent.encode(obj);
  }
}
