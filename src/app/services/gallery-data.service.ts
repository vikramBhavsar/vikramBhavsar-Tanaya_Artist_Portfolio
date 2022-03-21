import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})


export class GalleryDataService {


  home_URLS_list!:string[];
  project_URLS_list!:string[];

  constructor(private httpClient: HttpClient) { }


  // This gets the list of all URLS on for main page.
  getUrls(){
      let listOfURLs = ['/home','/about','/contact'];
      return listOfURLs;
  }
  
  // This gets list of all projects available in gallery
  getGalleryProject(){
    let listOfProjectURLs = ['project 1','project 2','project 3'];
    return listOfProjectURLs;
  }


  getGalleryData():Observable<any>{
      return this.httpClient.get("assets/data.json");
  }







  
}






