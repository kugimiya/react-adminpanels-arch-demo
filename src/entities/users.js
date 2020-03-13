import { IFormModel } from './model/form.iterface';
import { IEntityModel } from './model/entity.interface';
import { IEntityService } from './service/entity.interface';
import { IEntityTransport } from './transport/entity.interface';

// Схема сущности
const UserEntityScheme = {
  id:   { name: '',     value: undefined, type: 'string', isRequired: false, isShown: false, isAllowed: false },
  name: { name: 'Name', value: undefined, type: 'string', isRequired: false, isShown: true,  isAllowed: false },
  age:  { name: 'Age',  value: undefined, type: 'number', isRequired: false, isShown: true,  isAllowed: false }
};

// Схема параметров для работы транспортного (networking) слоя
// По идее, тут полей должно быть больше, но тестовый API идеальный, так что шош...
const UserTransportScheme = {
  baseUri: 'http://localhost:3030/user'
};

// Хранилище данных сущности (для React-компонент)
class UserModel extends IEntityModel {
  constructor () {
    super(UserEntityScheme);
  }
}

// Хранилище данных формы для сущности
class UserForm extends IFormModel {
  constructor () {
    super(UserEntityScheme);
  }
}

// Транспортный слой (networking)
class UserTransport extends IEntityTransport {
  constructor () {
    super(UserTransportScheme);
  }
}

// Слой, связывающий транспортный слой, хранилища; TODO: ещё и состояния
class UserService extends IEntityService {
  constructor () {
    super(new UserTransport());
  }
}

// Встречайте, сущность; самодостаточна, избыточна, юзабельна в гипотетических задачах
export class UserEntity {
  service = new UserService(); // Тут React-компоненты могут командовать сущностью
  model = new UserModel();     // Тут они берут её данные
  editForm = new UserForm();   // Это форма редактирования, само по себе миниатюрное сервис-хранилище
  createForm = new UserForm(); // Это форма создания, same
}
