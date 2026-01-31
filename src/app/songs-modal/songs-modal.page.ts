import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams, IonicModule, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports:[ CommonModule, FormsModule, IonicModule]
})
export class SongsModalPage implements OnInit {

  musics: any[] = [];
  constructor(private navParams: NavParams, private modalController: ModalController) {}

  ngOnInit() {
    this.musics = this.navParams.data['songs'];
  }

  async selectMusic(music: any) {
    await this.modalController.dismiss(music);
    
  }

}
