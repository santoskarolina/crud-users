import { Injectable } from '@angular/core';
import { User } from './create-users/create-users.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usuarios: User[];

  constructor() { }

  getUsers(): User[] {
    if(localStorage.getItem('usuarios') === null) {
      this.usuarios = [];
    } else {
      this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    }
    return this.usuarios;
  }

  addUsers(newuser: User) {
    this.usuarios.push(newuser);
    let usuarios = [];
    if(localStorage.getItem('usuarios') === null) {
      usuarios = [];
      usuarios.push(newuser);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    } else {
      usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      usuarios.push(newuser); 
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
 }

 deleteUser(user: User) {
  for (let i = 0; i < this.usuarios.length; i++) {
    if (user == this.usuarios[i]) {
      this.usuarios.splice(i, 1);
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  }
}
}
