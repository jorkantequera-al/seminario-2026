import { Injectable } from '@angular/core';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private initialUsers: any[] = [
    {
      id: 1,
      nombre: 'jorge',
      apellido: 'antequera',
      email: 'jorkantequera@gmail.com',
      password: '123456',
      introVisto: true
    }
  ];

  constructor(private storageService: StorageService) { }


  async searchUser(credentials: any): Promise<{ login: boolean; intro: boolean } | null> {
    const users: any = await this.storageService.get('user');
    const usersJson = JSON.parse(users);
    const user = usersJson.find((user: any) => user.email === credentials.email && user.password === credentials.password);
    if (user) {
      return { login: true, intro: user.intro };
    }
    return null;
  }

  async loginUser(credentials: any) {
    return new Promise(async (accept, reject) => {
      const result = await this.searchUser(credentials);
      if (result) {
        await this.storageService.set('login', result.login);
        await this.storageService.set('introVisto', result.intro);
        await this.getIdUser(credentials);
        accept('login correcto');
      } else {
        reject('login incorrecto');
      }
    });
  }


  register(userData: any) {
    return {
      subscribe: async ({ next, error }: any) => {
        if (userData.email && userData.password) {
          const existUser = await this.searchUser(userData);
          if (existUser) {
            next({
              success: false,
              message: 'Usuario ya existe'
            });
          } else {
            const users = JSON.parse(await this.storageService.get('user'));
            const user = { ...userData, id: this.generateId(users), intro: false };
            users.push(user);
            await this.storageService.set('user', JSON.stringify(users));
            next({
              success: true,
              message: 'Usuario registrado correctamente'
            });
          }
        } else {
          next({
            success: false,
            message: 'Datos inválidos'
          });
        }
      }
    };
  }

  async initializeData() {
    if (await this.storageService.get('user')) {
      return;
    }
    await this.storageService.set('user', JSON.stringify(this.initialUsers));
  }

  async getIdUser(credentials: any) {
    const users = await this.storageService.get('user');
    const usersJson = JSON.parse(users);
    const user = usersJson.find((user: any) => user.email === credentials.email && user.password === credentials.password);
    this.storageService.set('id', user.id);
    return user.id;
  }

  async setUserIntro(id: number) {
    const users = await this.storageService.get('user');
    const usersJson = JSON.parse(users);
    const user = usersJson.find((user: any) => {
      if (user.id === id) {
        user.intro = true;
        usersJson.splice(usersJson.indexOf(user), 1, user);
      }
    });
    this.storageService.set('user', JSON.stringify(usersJson));
  }

  generateId(users: any[]) {
    return users.length > 0
      ? Math.max(...users.map(user => user.id ? user.id : 0)) + 1
      : 1;
  }
}

