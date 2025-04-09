import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log('request to: ' + req.url);
  if (req.url.includes('open-meteo.com') || req.url.includes('nominatim')) {
    return next(req);
  }
  //console.log('request with withCredentials to: ' + req.url);
  const clonedRequest = req.clone({ withCredentials: true });
  return next(clonedRequest);
};
