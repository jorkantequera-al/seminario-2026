import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HomePage {

  colorclaro = 'var(--color-claro)';
  coloroscuro = 'var(--color-oscuro)';
  coloractual = this.coloroscuro;
  //Tarea 1 seminario informacion de minimo 3 slide para mostrar en clase
  genres = [
    {

      title: "Musica para chambear",
      Image: "data:image/jpeg;base64,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",
      description: "La banda sonora definitiva para tu jornada laboral. Esta lista de reproducción está diseñada para mantenerte concentrado, motivado y en la zona de productividad. Con una mezcla de lo-fi ambiental, jazz suave e instrumentales relajantes, minimiza las distracciones y te ayuda a chambear de forma eficiente y sin interrupciones."


    },
    {

      title: "Musica clasica salsa",
      Image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8478544634f4d1a78a3a8b0e03",
      description: "La salsa clásica (también conocida como salsa gorda, salsa dura o salsa vieja) es el pilar fundamental de este género musical, alcanzando su apogeo entre las décadas de 1960 y 1970. Se caracteriza por arreglos musicales complejos, un fuerte énfasis en la percusión y los metales, y letras que reflejan la vida cotidiana, la cultura latina y temas sociales."


    },
    {

      title: "Musica urbana",
      Image: "https://i.scdn.co/image/ab67616d00001e02450a9a7815041423797eb86c",
      description: "La música urbana es un término paraguas que engloba diversos géneros nacidos en entornos metropolitanos, caracterizados por ritmos contagiosos, lenguaje directo y temáticas sociales de la juventud. En 2026, el género continúa liderando las listas globales con una fuerte evolución hacia la fusión de sonidos."


    }



  ]
  
  constructor() {}

  cambiarcolor(){
    this.coloractual = this.coloractual === this.coloroscuro ? this.colorclaro : this.coloroscuro

    if (2+2 == 4){
      "si es 4"

    }else{
      "no es 4"

    }

  }
}
