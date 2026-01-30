import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MusicService {

  urlServer= "";
  constructor() { }

  getTracks() {
     return fetch(`${this.urlServer}/tracks`).then(
       response => response.json()
     );
  } 

  getAlmbuns() {
     return fetch(`${this.urlServer}/albums`).then(
       response => response.json()
     );
  }
}