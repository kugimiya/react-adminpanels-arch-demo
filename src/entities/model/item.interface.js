import { action, computed, observable } from 'mobx';

export class IItem {
  id;

  @action.bound update(data) {
    Object.entries(data).forEach(([ key, value ]) => {
      if (this[key] === undefined) {
        this[key] = observable.box(value);
      } else {
        this[key] = value;
      }
    });
  }
}
