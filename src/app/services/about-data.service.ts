import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutDataService {

  constructor(private httpClient: HttpClient) { }


  getAboutData(): Observable<any>{
    return this.httpClient.get('assets/about.json');
  }
}
