export class IEntityService {
  entityTransport;

  constructor (entityTransport) {
    this.entityTransport = entityTransport;
  }

  create(createForm) {
    if (createForm.validate()) {
      return this.entityTransport.create(createForm.values);
    }
  }

  read(data) {
    return this.entityTransport.read(data);
  }

  update(editForm, entityModel) {
    if (editForm.validate()) {
      return this.entityTransport.update(editForm.values).then(payload => {
        if (entityModel === undefined) {
          return payload;
        }

        entityModel.update(editForm.values);
        return payload;
      });
    }
  }

  delete(id) {
    return this.entityTransport.delete({ id });
  }
}
