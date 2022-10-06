import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken: any = localStorage.getItem('token')

    return next.handle(this.addAuthorizationHeader(request, accessToken)).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log("=============")
        if (!localStorage.getItem('token')) {
          this.router.navigate(['login']);
        }else{
          this.router.navigate(['login/dashboard']);
        }
        return throwError(request);
      })
    );
  }

  addAuthorizationHeader(request: HttpRequest<any>, token: any): HttpRequest<any> {
      if (token) {
        this.router.navigate(['login/dashboard']);
      }
      return request;
  }
}
