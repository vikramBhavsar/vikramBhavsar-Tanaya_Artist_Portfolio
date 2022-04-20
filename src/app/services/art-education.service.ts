import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtProjectMain, ArtProjects } from '../models/art-education';

@Injectable({
  providedIn: 'root'
})
export class ArtEducationService {

  dataLink:string = 'http://127.0.0.1:8000/api/';

  constructor(private httpClient:HttpClient ) { }


  getArtEducationProject():Observable<ArtProjects[]>{
    return this.httpClient.get<ArtProjects[]>(this.dataLink + 'art-project-list');
  }


  getArtEducationProjectDetails(projectid:string):Observable<ArtProjectMain>{
    return this.httpClient.get<ArtProjectMain>(this.dataLink + `art-education/${projectid}`);
  }
}
