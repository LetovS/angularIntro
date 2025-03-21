import { ApplicationConfig, ErrorHandler, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import { ErrorHandlerInterceptor } from '../middleware/error-handler.interceptor';
import {GlobalErrorHandler} from '../handlers/GlobalErrorHandler';
import {ConfigService} from './services/config/config.service';

function initializeApp(config: ConfigService){
  return config.loadPromise();
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([ErrorHandlerInterceptor])),
    MessageService,
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || 'none'
        }
      }
    }),
    provideAppInitializer(() => initializeApp(inject(ConfigService)))
    /*{ provide: ErrorHandler, useClass: GlobalErrorHandler } doesn't work =/*/
  ]
};

