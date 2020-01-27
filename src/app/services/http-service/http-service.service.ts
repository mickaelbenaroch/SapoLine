import { Observable } from 'rxjs';
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
      this.apiUrl = "https://sapoappapi.herokuapp.com/";
      //this.apiUrl = "http://localhost:3030/";
  }
  //#endregion

  //#region Public Methods
  /**
   * HTTP Get function.
   * @param relativePath What path to add to http call.
   */
  public httpGet<T>(relativePath: string, options = null): Observable<any> {    
    return this.http.get(relativePath).pipe(map(
      success => {
      return success;
      },
      error => {
        console.log(error);
      }
    ));
  }

  /**
   * HTTP Post function.
   * @param relativePath What path to add to http call.
   */
  public httpPost<T>(relativePath: string, body: any, options = null): Observable<any> {
        if (options && options.headers) {
          const headers = new HttpHeaders(options.headers);
          return this.http.post<any>(this.apiUrl + relativePath, body, {headers}).pipe(map(
            success => {
            return success
            },
            error => {
              console.log(error)
            }
          ))
        } else {
          return this.http.post<any>(this.apiUrl + relativePath, body).pipe(map(
            success => {
            return success
            },
            error => {
              console.log(error)
            }
          ))
        }
  }

  /**
   * HTTP Put function.
   * @param relativePath What path to add to http call.
   */
  public httpPut<T>(relativePath: string, body: any, options = null): Observable<any> {
    return this.http.put(this.apiUrl + relativePath, body).pipe(map(
      success => {
          return success;
      },
      error =>{
        console.log(error);
      }
    ));
  }

  //#endregion

  //#region Private Methods
  //#endregion
}

