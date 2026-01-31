import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { Storage } from '@ionic/storage-angular'
import {addIcons} from 'ionicons';
import { pauseOutline, play, searchOutline,  eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline, peopleOutline, personCircleOutline, personOutline, heart } from 'ionicons/icons';

addIcons({
  'person-circle-outline': personCircleOutline,
  'lock-closed-outline': lockClosedOutline,
  'mail-outline': mailOutline,
  'eye-off-outline':eyeOffOutline,
  'eye-outline':eyeOutline,
  'people-outline':peopleOutline,
  'person-outline':personOutline,
  'search-outline':searchOutline,
  'pause-outline':pauseOutline,
  'play':play,
  'heart': heart
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    Storage
  ],
});
