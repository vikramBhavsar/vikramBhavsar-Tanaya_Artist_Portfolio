import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectGLRY, ProjectModel, SectionGLRY, SectionModel } from '../models/project-contents';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  managementURL:string = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }


  getProjectList():Observable<ProjectModel[]>{
    return this.http.get<ProjectModel[]>(this.managementURL+'all-projects');
  }

  postProjectData(projectModel : ProjectModel):Observable<any>{
    return this.http.post(this.managementURL + 'projects',JSON.stringify(projectModel),this.httpOptions);
  }


  getDetailsOfProject(projectID:string):Observable<ProjectGLRY>{
    return this.http.get<ProjectGLRY>(this.managementURL+`project/${projectID}`);
  }


  postSectionData(sectionModel:SectionModel):Observable<any>{
    return this.http.post(this.managementURL+'section',JSON.stringify(sectionModel),this.httpOptions);
  }


  postMediaContentToServer(formData:FormData):Observable<any>{
    return this.http.post(this.managementURL + 'media',formData)
  }



  getSectionDetails(sectionID:string):Observable<SectionGLRY>{
    return this.http.get<SectionGLRY>(this.managementURL + `section/${sectionID}`);
  }


  updateSectionDetails(sectionDetails:SectionModel):Observable<any>{
    return this.http.put(this.managementURL + `section/${sectionDetails.id}`, JSON.stringify(sectionDetails),this.httpOptions);
  }

  deleteSectionDetails(sectionID:string):Observable<any>{
    return this.http.delete(this.managementURL + `section/${sectionID}`,this.httpOptions);
  }
}
