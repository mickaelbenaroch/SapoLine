import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class HttpServiceService {

  //#region Public Members
  public apiUrl: string;
  //#endregion

  //#region Lifecycle Hooks
  public constructor(
    protected http: HttpClient,) {
      //this.apiUrl = "https://sapoappapi.herokuapp.com/";
      this.apiUrl = "http://localhost:8000/";
  }
  //#endregion

  //#region Public Methods
  /**
   * HTTP Get function.
   * @param relativePath What path to add to http call.
   */
  public httpGet<T>(relativePath: string, options = null): Observable<T> {    
    return this.http.get<T>(relativePath).pipe(map(
      success => {
      return success;
      },
      error => {
        console.log(error);
        return of(null);
      }
    ));
  }

  /**
   * HTTP Post function.
   * @param relativePath What path to add to http call.
   */
  public httpPost<T>(relativePath: string, body: any, options?): Observable<T> {
        if (options) {
          let token = sessionStorage.getItem('token');
          const headers = new HttpHeaders({'token': token});
          return this.http.post<T>(this.apiUrl + relativePath, body, {headers: headers}).pipe(map(
            success => {
            return success
            },
            error => {
              console.log(error)
              return of(null);
            }
          ))
        } else {
          return this.http.post<T>(this.apiUrl + relativePath, body).pipe(map(
            success => {
            return success
            },
            error => {
              console.log(error);
              return of(null);
            }
          ))
        }
  }

  /**
   * HTTP Put function.
   * @param relativePath What path to add to http call.
   */
  public httpPut<T>(relativePath: string, body: any, options = null): Observable<T> {
    return this.http.put<T>(this.apiUrl + relativePath, body).pipe(map(
      success => {
          return success;
      },
      error =>{
        console.log(error);
        return of(null);
      }
    ));
  }

  //#endregion

  //#region Private Methods
  //#endregion
}

