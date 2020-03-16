import { observable } from 'mobx';


export class ICollectionModel {
  @observable collection = {};

  entityScheme;
  entityClass;

  constructor(entityScheme, entityClass) {
    this.entityScheme = entityScheme;
    this.entityClass = entityClass;
  }

  create(id, entityData) {
    this.collection[id] = new this.entityClass(this.entityScheme);
    this.update(id, entityData);
  }

  update(id, entityData) {
    this.collection[id].update(entityData);
  }

  delete(id) {
    delete this.collection[id];
  }
}
