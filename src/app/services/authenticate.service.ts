import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  url = "http://127.0.0.1:8000/api/token";

  performLogin(username:string,password:string): Observable<any>{
    return this.http.post(this.url,{username,password}); 
  }


  refreshToken(refresh:string): Observable<any>{
    return this.http.post(this.url+'/refresh',{refresh:refresh});
  }

  testByGettingProtectedData(): Observable<any>{
    return this.http.get("http://127.0.0.1:8000/api/projects"); 
  }
}
