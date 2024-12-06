import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';

export const authHeaderInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authToken = inject(LocalStorageService).getItem('token');

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
  // return next(req);
};
