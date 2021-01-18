import { Book } from './../models/book';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public dataForm?: FormGroup;
  choixmenu: string = 'A';
  listData: Book[] = [];
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token'
    }),
  }

  private readonly apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getBooks() {
    const URL = `${this.apiURL}books`;
    return this.httpClient.get<any>(URL, this.httpOptions).pipe(catchError(this.handleError));
  }

  public getBook(bookId: number) {
    const url = `${this.apiURL}book/` + bookId;
    return this.httpClient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  public addBook(formData: FormData): Observable<any> {
    const URL = `${this.apiURL}book`;
    // return this.httpClient.post<any>(URL, book, this.httpOptions).pipe(catchError(this.handleError));
    return this.httpClient.post(`${URL}`, formData);
  }

  public modifyBook(bookId: number, book: Book) {
    const URL = `${this.apiURL}book/` + bookId;
    return this.httpClient.put<any>(URL, book, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteBook(bookId: number) {
    const URL = `${this.apiURL}book/` + bookId;
    return this.httpClient.delete<any>(URL).pipe(catchError(this.handleError));
  }

  public getBookByBookName(bookName: string) {
    const URL = `${this.apiURL}book/search`;
    let params = new HttpParams().set('bookName', bookName);

    return this.httpClient.get<any>(URL, { params: params });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
