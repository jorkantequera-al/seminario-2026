import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MusicService {

  urlServer= "https://music.fly.dev";
  constructor() { }

  getTracks() {
     return fetch(`${this.urlServer}/tracks`).then(
       response => response.json()
     );
  } 

  async getAlbums() {
     return await fetch(`${this.urlServer}/albums`).then(
       response => response.json()
     );
  }

  getSongsByAlbum(albumId: string){
  return  fetch(`${this.urlServer}/tracks/album/${albumId}`).then(
      response => response.json()
    );
  }

  async getUserFavorites(id:string){
    return  fetch(`${this.urlServer}/user_favorites/${id}`).then(
      response => response.json()
    );
  }


  async postFavorite_tracks(post:any) {
    try {
      const response = await fetch(`${this.urlServer}/favorite_tracks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteFavorite(id: string){
    const url = `${this.urlServer}/favorite_tracks/${id}`;

    try {
      const respuesta = await fetch(url, {
        method: 'DELETE', 
      });

      if (!respuesta.ok) {
        throw new Error(`Error al eliminar: ${respuesta.status}`);
      }
      return false;
    } catch (error) {

      return true;
    }
  }
}