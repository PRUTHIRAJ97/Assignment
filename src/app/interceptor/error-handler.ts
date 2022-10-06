import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthInterceptor } from './auth/auth.interceptor';
  
  export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
      private authIntercept: AuthInterceptor
    ) {}
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          let errMsg = '';
          // Client Side Error
          if (error.error instanceof ErrorEvent) {
            errMsg = `Error: ${error.error.message}`;
          } else {
            switch (error.status) {
              case 404:
                errMsg = `${error.error.message}`;
                break;
            }
          }
          return throwError(errMsg);
        })
      );
    }
  
    addAuthorizationHeader(request: HttpRequest<any>, token: any) {
      // console.log("token",token) 
      if (token) {
        return request.clone({
          setHeaders: { 'Authorization': `Bearer ${token}` },
        });
      }
      return request;
    }
  }
  