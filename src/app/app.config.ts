import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './service/auth.service';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authHeaderInterceptor } from './interceptors/auth-header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authHeaderInterceptor])),
    // { provide: AuthService } need to figure out why angular mention to register in the provider
  ]
};
