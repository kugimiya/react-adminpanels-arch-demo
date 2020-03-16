export class ICollectionService {
  collectionTransport;
  entityService;

  constructor(collectionTransport, entityService) {
    this.collectionTransport = collectionTransport;
    this.entityService = entityService;
  }

  create(collectionModel) {
    return this.entityService.create()
    .then(payload => {
      collectionModel.create(
        payload.id,
        this.entityService.createForm.values
      );
    });
  }

  async read(data, collectionModel) {
    const collection = await this.collectionTransport.read();

    collection.forEach(collectionItem => {
      collectionModel.create(collectionItem.id, collectionItem);
    });

    return collection;
  }

  update(collectionModel) {
    return this.entityService.update()
    .then(() => {
      collectionModel.update(
        this.entityService.editForm.values.id,
        this.entityService.editForm.values
      );
    })
  }

  delete(id, collectionModel) {
    return this.entityService.entityTransport.delete({ id })
    .then(() => {
      collectionModel.delete(id);
    });
  }
}
