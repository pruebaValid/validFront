import {  catchError} from 'rxjs/operators';
import {  Injectable} from '@angular/core';
import {  HttpClient,  HttpHeaders,  HttpErrorResponse} from '@angular/common/http';
import {  throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json'
  }),
};

const path = 'http://localhost:8080';
const ERROR_BACK = 'ERROR_';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  get(endpoint) {
    return this.http.get(path + endpoint, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  post(endpoint, element) {
    return this.http.post(path + endpoint, element, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  put(endpoint, element) {
    return this.http.put(path + endpoint + '/' + element.Id, element, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  delete(endpoint, element) {
    return this.http.delete(path + endpoint + '/' + element.Id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

      try {
          // console.log( '  TITLE : ' + error.error.title );
          if ( typeof error.error.title !== undefined
            && error.error.title.includes(ERROR_BACK)) {
            return throwError( error.error.title + '-' + (error.error.developerMessage || error.error.detail || ''));
          }
        // tslint:disable-next-line: variable-name
        } catch ( _error) {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
      }
    }

    return throwError(
      'Something bad happened; please try again later.');
  }
}
