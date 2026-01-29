import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage';

export const IntroGuard: CanActivateFn = async () => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const introVisto = await storage.get('introVisto');

  if (introVisto) {
    return true; // deja entrar a Home
  }

  //  bloquea y redirige a Intro
  router.navigate(['/']);
  return false;
};
