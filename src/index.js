import { UserEntity } from './entities/user';


const user = new UserEntity();

user.service.editForm.setValue('id', '2');
user.service.editForm.setValue('login', 'admin');
user.service.editForm.setValue('firstName', 'Админ');
user.service.editForm.setValue('lastName', 'Главный');
user.service.editForm.setValue('middleName', '');
user.service.editForm.setValue('status', 'A');
user.service.editForm.setValue('roleId', '0');

user.service.update(user.model);
console.log('check network->xhr tab');

window.user = user;
