import { ICollectionModel } from './model/collection.interface';
import { IFormModel } from './model/form.iterface';
import { IEntityModel } from './model/entity.interface';
import { ICollectionService } from './service/collection.interface';
import { IEntityService } from './service/entity.interface';
import { ICollectionTransport } from './transport/collection.interface';
import { IEntityTransport } from './transport/entity.interface';


export function EntityGenerator(UserEntityScheme, UserTransportScheme, UsersCollectionTransportScheme) {
  // Хранилище данных сущности (для React-компонент)
  class EntityModel extends IEntityModel {
    constructor () {
      super(UserEntityScheme);
    }
  }

  // Хранилище данных формы для сущности
  class EntityForm extends IFormModel {
    constructor () {
      super(UserEntityScheme);
    }
  }

  // Транспортный слой (networking)
  class EntityTransport extends IEntityTransport {
    constructor () {
      super(UserTransportScheme);
    }
  }

  // Слой, связывающий транспортный слой, хранилища; TODO: ещё и состояния
  class EntityService extends IEntityService {
    constructor () {
      super(
        new EntityTransport(),
        new EntityForm(),       // Это форма редактирования, само по себе миниатюрное сервис-хранилище
        new EntityForm()        // Это форма создания, same
      );
    }
  }

  // Встречайте, сущность; самодостаточна, избыточна, юзабельна в гипотетических задачах
  class Entity {
    service = new EntityService(); // Тут React-компоненты могут командовать сущностью
    model = new EntityModel();     // Тут они берут её данные
  }

  /* Далее коллекция юзеров */
  class EntitiesCollectionTransport extends ICollectionTransport {
    constructor () {
      super(UsersCollectionTransportScheme);
    }
  }

  class EntitiesCollectionService extends ICollectionService {
    constructor () {
      super(
        new EntitiesCollectionTransport(),
        new EntityService()
      );
    }
  }

  class EntitiesCollectionModel extends ICollectionModel {
    constructor () {
      super(UserEntityScheme, EntityModel);
    }
  }

  class CollectionEntity {
    service = new EntitiesCollectionService();
    model = new EntitiesCollectionModel();
  }

  return {
    EntityModel,
    EntityForm,
    EntityTransport,
    EntityService,
    Entity,
    EntitiesCollectionTransport,
    EntitiesCollectionService,
    EntitiesCollectionModel,
    CollectionEntity
  };
}
