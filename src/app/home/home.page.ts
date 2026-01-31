import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, ModalController } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { MusicService } from '../services/music';
import { StorageService } from '../services/storage';
import { NavController } from '@ionic/angular/standalone';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomePage implements OnInit {
  //color base
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  //colores del slide
  colorSlideTitle = 'var(--color-slide-title)';
  colorSlideTexto = 'var(--color-texto-slide)';
  //estados actuales
  colorActual = this.colorOscuro;
  temaActual = this.colorSlideTitle;


  //[actividad 1 (lista)] 

  tracks: any;
  albums: any;

  musicaActual:any ={};
  mucicaSelecionada:any = {
    name: '',
    preview_url: '',
    duration_ms: null,
    playing:false
  };

  favorites:Boolean = false;

  valorProgreso:number = 0;
  transcurridoMs:number = 0;


  constructor(
    private storageService: StorageService, private musicService: MusicService, private navCtrl:NavController, private ModalController:ModalController) {}
    
  async ngOnInit(){
    this.loadAlbums();
    this.loadTracks();
    await this.loadStorageData();
    this.simularCargaDatos(); 
  }

  loadTracks(){
    this.musicService.getTracks().then(tracks =>{
      this.tracks = tracks;
      console.log(this.tracks, "las canciones")
    })
  }
  async loadAlbums(){
    await this.musicService.getAlbums().then(albums =>{
      this.albums = albums;
      console.log(this.albums, "los albums")
    })
  }


  async cambiarColor() {
    
   this.colorActual = this.colorActual === this.colorOscuro ? this.colorClaro : this.colorOscuro
   await this.storageService.set('theme', this.colorActual)
   console.log('tema Guardado:', this.colorActual )


  }
  cambiarTema() {
  this.temaActual =
    this.temaActual === this.colorSlideTitle
      ? this.colorSlideTexto
      : this.colorSlideTitle;
}

async loadStorageData(){
   const savedTheme = await this.storageService.get('Theme')
   if (savedTheme) {
    this.colorActual = savedTheme
   }
}

async simularCargaDatos() {
  const data = await this.obtenerDatoSimulados();
  console.log('Datos simulados: ', data)
}

obtenerDatoSimulados(){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve (['Rock', 'jazz', 'Trap'])
    }, 1500)
  })
}

  verIntro() {
    this.navCtrl.navigateForward('menu/intro');
  }

  async loadSongsByAlbum(albumId: string){
  const songs = await this.musicService.getSongsByAlbum(albumId);
  const modal = await this.ModalController.create({
    component: SongsModalPage,
    componentProps: {
      songs: songs,
    },
  });
  modal.onDidDismiss().then((result) => {
    if(result.data){
      this.mucicaSelecionada = result.data;
    }
  });
  
  modal.present();
}

  play(){
    try { if (this.musicaActual && this.musicaActual.pause) { this.musicaActual.pause(); } } catch(e){}

    this.musicaActual = new Audio(this.mucicaSelecionada.preview_url);

    this.musicaActual.addEventListener('timeupdate', () => {
      const current = this.musicaActual.currentTime || 0; // seconds
      const duration = this.musicaActual.duration || 0; // seconds
      this.transcurridoMs = Math.floor(current * 1000);
      this.valorProgreso = duration > 0 ? (current / duration) : 0;
    });

    this.musicaActual.addEventListener('ended', () => {
      this.mucicaSelecionada.playing = false;
      this.valorProgreso = 0;
      this.transcurridoMs = 0;
    });

    this.musicaActual.play();
    this.mucicaSelecionada.playing = true;
  }

  pause(){
    if (this.musicaActual && this.musicaActual.pause) {
      this.musicaActual.pause();
    }
    this.mucicaSelecionada.playing = false;
  }

  getRemainngTime(){
    if (!this.musicaActual.duration || !this.musicaActual.currentTime) {
      return '0:00';
    }
    const remainingTime = this.musicaActual.duration - this.musicaActual.currentTime;
    return this.formatDuration(remainingTime * 1000);
  }

  formatDuration(durationMs: number): string {
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  async postFavorite(trackId:string){
    const userID = await this.storageService.get('id');
    const favoriteTrack:any = {
      "favorite_track":{
        "user_id":userID,
        "track_id":trackId
      }
    }

    this.favorites = await this.musicService.postFavorite_tracks(favoriteTrack);
  }

  async searchFavorite(id:string){
    const userId:any = this.storageService.get('id');
    console.log(await this.musicService.getUserFavorites(userId));
    const favorites:any[] =  JSON.parse(await this.musicService.getUserFavorites(userId));
    return favorites.find((favorite: any) => favorite.id === id);
  }

  async deleteFavorite(id:string){
    this.favorites = await this.musicService.deleteFavorite(id);
  }
  

}