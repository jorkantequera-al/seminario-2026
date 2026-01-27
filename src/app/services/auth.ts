import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor() {}

  loginUser(credentials: any) {
    return new Promise((accept, reject) => {
      if (
        credentials.email === 'jorkantequera@gmail.com' &&
        credentials.password === '123456'
      ) {
        localStorage.setItem('login', 'true');
        accept('login correcto');
      } else {
        reject('login incorrecto');
      }
    });
  }

  register(userData: any) {
    return {
      subscribe: ({ next, error }: any) => {
        if (userData.email && userData.password) {

          localStorage.setItem('user',JSON.stringify(userData));
          next({
            success: true,
            message: 'Usuario registrado correctamente'
          });
        } else {
          next({
            success: false,
            message: 'Datos inválidos'
          });
        }
      }
    };
  }
}
