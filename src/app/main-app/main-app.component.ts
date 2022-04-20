import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GalleryDataService } from '../services/gallery-data.service';
import { ProjectModel, ServerData } from '../models/project-contents';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GalleryComponent } from '../gallery/gallery.component';
import { GalleryProjectIDService } from '../services/gallery-project-id.service';
import { ArtEducationService } from '../services/art-education.service';
import { ArtProjects } from '../models/art-education';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent implements OnInit {
  // This is for small phone menu
  hamburger: boolean = false;

  // Access token for login and authentication
  access:string = '';

  // **** VARIABLES FOR PROJECT SELECTION SECTION WISE **** //
  curProject: string = '';

  // **** Variables for Art Project Selection
  curArtproject:string = '';

  projectList: ProjectModel[] = [{
    "id": "1",
    "projectName": "Fragments",
    "projectDescription": "",
  }]


  artProjectList:ArtProjects[]=[{
    "id": "1",
    "projectName": "NGMA",
    "projectDescription": "",
  }]

  // Used to identify which child component is active right now
  galleryActive:boolean = false;
  artEducationActive:boolean = false;

  // ********************* DECLARING ALL THE VIEWCHILD BELOW *********************
  // **** VIEW CHILD FOR ACCESSING HAMBURGER MENU.
  @ViewChild('phone_side_menu') phone_side_menu!: ElementRef;

  constructor(private galleryService: GalleryDataService,
              private router : Router,
              private route : ActivatedRoute,
              private ProjectIDService:GalleryProjectIDService,
              private artEducation:ArtEducationService) {}

  ngOnInit(): void {

    // Initialize the project for routing related information
    this.initializeRouteInformation();

    // Initializing the project drop down
    this.initializerProjectData();

    // Initialize project drop down for art education
    this.initializeArtEducationData();

    // Initializing access token value
    this.access = localStorage.getItem("access") || '';
  }


  // **** FUNCTION to check route information for active gallery
  initializeRouteInformation(){

    // This is used for first instance.
    let initialPageLoadLink = window.location.href;

    // checking for gallery page
    if(initialPageLoadLink.includes("/T/gallery/")){
      this.galleryActive = true;
    }



    // checking for Art Education Page.
    if(initialPageLoadLink.includes("/T/art-education/")){
      this.artEducationActive = true;
    }


    this.router.events.subscribe((val) =>{

      if(val instanceof NavigationEnd){
        // *** checking if gallery is started or not
        if(val.urlAfterRedirects.startsWith("/T/gallery/")){
          this.galleryActive = true;
        }else{
          this.galleryActive = false;
        }

        // *** checking if Art Education is started or not
        if(val.urlAfterRedirects.startsWith("/T/art-education/")){
          this.artEducationActive = true;
        }else{
          this.artEducationActive = false;
        }
      }
    })
  }


  // *** Function to initialize art projects list
  initializeArtEducationData(){

    let that = this;
    this.artEducation.getArtEducationProject().subscribe({
      next(res){
        that.artProjectList = res;
        that.ProjectIDService.updateArtMessage(that.artProjectList[0].id);
      },
      error(msg){
        alert(`Error getting Projects: ${msg.status} : ${msg.details}`);
      }
    })
  }

  // **** FUNCTION for initializing project list
  initializerProjectData(){
    this.galleryService.getProjectList().subscribe(res =>{
      this.projectList = res;

      // set the data for first project
      this.ProjectIDService.updateMessage(this.projectList[0].id);
    });
  }

  // **** FUNCTION FOR TOGGLING HAMBURGER MENU ON PHONES
  TogglePhoneMenu() {
    this.hamburger = !this.hamburger;
    this.phone_side_menu.nativeElement.classList.toggle(
      'phone-side-menu-active'
    );
    console.log(this.phone_side_menu.nativeElement.classList);
  }

  // FUNCTION to select and change current project
  switchProject(selectedProjID: string, fromPhone: boolean = false) {
    // ************** INFORM THE CHILD OF THE CUR PROJECT SELECTED.
    this.curProject = selectedProjID
    this.ProjectIDService.updateMessage(this.curProject);

    // Closing the menu directly when selecting project from Side bar
    if (fromPhone) {
      this.TogglePhoneMenu();
    }
  }



  switchArtProject(selectedProjID:string, fromPhone:boolean = false){
    // ************** INFORM THE CHILD OF THE CUR PROJECT SELECTED.
    this.curArtproject = selectedProjID
    this.ProjectIDService.updateArtMessage(this.curArtproject);

    // Closing the menu directly when selecting project from Side bar
    if (fromPhone) {
      this.TogglePhoneMenu();
    }
  }


  // **** FUNCTION to close the tab when going to other child components.
  switchChild(fromPhone: boolean = false){
    if (fromPhone) {
      this.TogglePhoneMenu();
    }
  }

  // **** Function for logging out
  logout(){
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    this.router.navigate(['']);
  }
}
