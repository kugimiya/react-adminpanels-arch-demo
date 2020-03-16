// Схема сущности
import { EntityGenerator } from './entities/generator';


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

const UsersCollectionTransportScheme = {
  baseUri: 'http://localhost:3030/users',
  readPostProcess: (err, payload, data) => {
    console.log({ err, payload, data });

    return payload.users.map(u => ({
      id: u.user_id,
      firstName: u.firstname,
      lastName: u.lastname,
      middleName: u.middlename,
      status: u.status,
      roleId: u.role_id,
      login: u.login
    }));
  },
  readPreProcess: data => data
};

const { Entity, CollectionEntity } = EntityGenerator(UserEntityScheme, UserTransportScheme, UsersCollectionTransportScheme);
const user = new Entity();
const users = new CollectionEntity();

user.service.editForm.setValue('id', '2');
user.service.editForm.setValue('login', 'admin');
user.service.editForm.setValue('firstName', 'Админ');
user.service.editForm.setValue('lastName', 'Главный');
user.service.editForm.setValue('middleName', '');
user.service.editForm.setValue('status', 'A');
user.service.editForm.setValue('roleId', '0');

user.service.update(user.model);

users.service.read({}, users.model).then(() => {
  console.log(users.model.collection);
});

window.user = user;
