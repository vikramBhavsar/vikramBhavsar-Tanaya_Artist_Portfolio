import { Injectable } from '@angular/core';
import { Subject,Observable, BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryProjectIDService {

  private projectID = new BehaviorSubject<string>('0');

  private artProjectID= new BehaviorSubject<string>('0');

  constructor() { }

  // *** Used for Art Project
  public getArtMessage(): Observable<string> {
    return this.artProjectID.asObservable();
  }


  public updateArtMessage(message:string):void{
    this.artProjectID.next(message);
  }


  // Used for gallery Project
  public getMessage(): Observable<string> {
    return this.projectID.asObservable();
  }

  public updateMessage(message: string): void {
    this.projectID.next(message);
  }
}
