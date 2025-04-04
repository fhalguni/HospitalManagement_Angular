import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable()
export class httpErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occured';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `client-side error:${error.error.message}`;
        } else {
          errorMessage = `server-error (${error.status}):${error.message}`;
        }
        console.error(errorMessage);
        this.snackBar.open(errorMessage, 'close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
