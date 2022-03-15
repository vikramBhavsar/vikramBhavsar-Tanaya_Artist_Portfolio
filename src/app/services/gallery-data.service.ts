import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GalleryDataService {


  home_URLS_list!:string[];
  project_URLS_list!:string[];

  constructor() { }


  // This gets the list of all URLS on for main page.
  getUrls(urls:string[]){
      let listOfURLs = ['/home','/about','/contact'];
      return listOfURLs;
  }
  
  
  // This gets list of all projects available in gallery
  getGalleryProject(urls:string[]){
    let listOfProjectURLs = ['project 1','project 2','project 3'];
    return listOfProjectURLs;
  }
}






