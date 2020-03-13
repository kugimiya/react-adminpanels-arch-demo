export class IEntityService {
  entityTransport;
  createForm;
  editForm;

  constructor (entityTransport, createForm, editForm) {
    this.entityTransport = entityTransport;
    this.createForm = createForm;
    this.editForm = editForm;
  }

  create() {
    if (this.createForm.validate()) {
      return this.entityTransport.create(this.createForm.values);
    }
  }

  read(data) {
    return this.entityTransport.read(data);
  }

  update(entityModel) {
    if (this.editForm.validate()) {
      return this.entityTransport.update(this.editForm.values).then(payload => {
        if (entityModel === undefined) {
          return payload;
        }

        entityModel.update(this.editForm.values);
        return payload;
      });
    }
  }

  delete(id) {
    return this.entityTransport.delete({ id });
  }
}
