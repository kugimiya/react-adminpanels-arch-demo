import { IFormModel } from './model/form.iterface';
import { IEntityModel } from './model/entity.interface';
import { IEntityService } from './service/entity.interface';
import { IEntityTransport } from './transport/entity.interface';

// Схема сущности
const UserEntityScheme = {
  id:         { name: '',     value: undefined, type: 'string', isRequired: false, isShown: false, isAllowed: false },
  login:      { name: 'Login', value: undefined, type: 'string', isRequired: false, isShown: true,  isAllowed: true },
  firstName:  { name: 'Имя', value: undefined, type: 'string', isRequired: false, isShown: true,  isAllowed: true },
  lastName:   { name: 'Фамилия', value: undefined, type: 'string', isRequired: false, isShown: true,  isAllowed: true },
  middleName: { name: 'Отчество', value: undefined, type: 'string', isRequired: false, isShown: true,  isAllowed: true },
  status:     { name: 'Статус', value: undefined, type: 'string', isRequired: false, isShown: true,  isAllowed: true },
  roleId:     { name: 'Должность', value: undefined, type: 'string', isRequired: false, isShown: true,  isAllowed: true }
};

// Схема параметров для работы транспортного (networking) слоя
// По идее, тут полей должно быть больше, но тестовый API идеальный, так что шош...
const UserTransportScheme = {
  baseUri: 'http://localhost:3030/user',

  // Конвертация JS-нейминг-стайла в PHP-нейминг-стайл (не пишите бек на PHP, поцаны)
  updatePreProcess: formData => {
    return ({
      id: formData.id,
      login: formData.login,
      firstname: formData.firstName,
      lastname: formData.lastName,
      middlename: formData.middleName,
      status: formData.status,
      role_id: formData.roleId,
    });
  }
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
    super(
      new UserTransport(),
      new UserForm(),       // Это форма редактирования, само по себе миниатюрное сервис-хранилище
      new UserForm()        // Это форма создания, same
    );
  }
}

// Встречайте, сущность; самодостаточна, избыточна, юзабельна в гипотетических задачах
export class UserEntity {
  service = new UserService(); // Тут React-компоненты могут командовать сущностью
  model = new UserModel();     // Тут они берут её данные
}
