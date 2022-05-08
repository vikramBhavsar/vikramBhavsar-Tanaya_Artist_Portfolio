import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GalleryDataService } from '../services/gallery-data.service';
import { ProjectGLRY, ServerData } from '../models/project-contents';

import {
  ActivatedRoute,
  NavigationEnd,
  Router,
} from '@angular/router';
import { GalleryProjectIDService } from '../services/gallery-project-id.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {


  constructor(
    private galleryService: GalleryDataService,
    private route: ActivatedRoute,
    private router: Router,
    private ProjectIDService:GalleryProjectIDService
  ) {}

  currentImg: number = 0;

  // **** VIEW CHILD USED FOR IMAGE MODAL
  @ViewChild('imgModal') imgModal!: ElementRef;

  // **** VARIABLES USED FOR OPENING THE IMAGE PROPERLY
  curImgLink: string = '../../assets/Images/Fragments/IMG_2219.JPG';
  curImgStatus: string = 'some wonderful text';

  // **** VARIABLES FOR PROJECT SELECTION SECTION WISE **** //
  curProject: string = '';

  projectGLRY :ProjectGLRY = {
    "id": "1",
    "projectName": "Fragments",
    "projectDescription": "",
    "sections":[],
  }

  public ngOnDestroy():void{

  }

  ngOnInit(): void {

    // Setting the service for project ID subscription
    this.ProjectIDService.getMessage().subscribe(msg =>{
      this.curProject = msg;
      this.initializerGalleryData();
    })
  }

  // for affecting view child
  ngAfterViewInit(): void {
  }

  initializerGalleryData() {
    
    let that = this;

    this.galleryService.getGalleryData(this.curProject.toString()).subscribe({
      next(res){
        that.projectGLRY = that.processResultsForLayout(res);
        console.log(res);
        console.log("Below is Server Data received: ");
        console.log(that.projectGLRY);
      },
      error(msg){
        console.log(msg);
      }
    })
  }


  // **** THis function will process the data and put proper layout for content
  processResultsForLayout(resultsData: ProjectGLRY): ProjectGLRY{

    ///
    // This function should check for following
        // ***** DIFFERENT TYPES OF SECTIONS ***** //
    // (MG) -- multiple gallery contents
    // (SD) -- Single image with description
    // (S) -- Single Image with no description (currently looks okay)
    // (3W) -- Three images without description
    // (2W) -- Two images without description
    ///

    for(var i = 0; i < resultsData.sections.length; i++){
      if(resultsData.sections[i].mediaContent.length  == 1 && resultsData.sections[i].sectionDescription.length == 0){
        resultsData.sections[i].sectionDisplayType = 'S';
      }else if(resultsData.sections[i].mediaContent.length  == 1 && resultsData.sections[i].sectionDescription.length > 1){
        resultsData.sections[i].sectionDisplayType = 'SD';
      }else if(resultsData.sections[i].mediaContent.length == 3){
        resultsData.sections[i].sectionDisplayType = '3W';
      }else if(resultsData.sections[i].mediaContent.length  == 2 && resultsData.sections[i].sectionDescription.length == 0){
        resultsData.sections[i].sectionDisplayType = '2W';
      }else{
        resultsData.sections[i].sectionDisplayType = 'MG';
      }
    }
    return resultsData;
  } 


  // Function to open image
  openImage(imgUrl: string, imgDetails: string) {
    this.imgModal.nativeElement.classList.toggle('active');
    this.curImgLink = imgUrl;
    this.curImgStatus = imgDetails;
  }

  // FUNCTION TO CLOSE THE IMAGE
  closeModalImage() {
    this.imgModal.nativeElement.classList.toggle('active');
  }
}
