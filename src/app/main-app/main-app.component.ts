import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GalleryDataService } from '../services/gallery-data.service';
import { ServerData } from '../models/project-contents';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent implements OnInit {
  // This is for small phone menu
  hamburger: boolean = false;

  // **** VARIABLES FOR PROJECT SELECTION SECTION WISE **** //
  curProject: number = 0;

  // **** This is project list data which is gathered from child component - gallery
  allPROJECTS: ServerData = {
    "PROJECTS": [
        {
          "projectID": "1",
          "projectHeader": "Fragments",
          "projectDescription": "",
          "SECTIONS":[]
        }
    ]
  }
  galleryActive:boolean = false;

  // ********************* DECLARING ALL THE VIEWCHILD BELOW *********************
  // **** VIEW CHILD FOR ACCESSING HAMBURGER MENU.
  @ViewChild('phone_side_menu') phone_side_menu!: ElementRef;

  constructor(private galleryService: GalleryDataService,
              private router : Router,
              private route : ActivatedRoute) {}

  ngOnInit(): void {

    // Initialize the project for routing related information
    this.initializeRouteInformation();

    // Initializing the project drop down
    this.initializerProjectData();
  }


  // **** FUNCTION to check route information for active gallery
  initializeRouteInformation(){

    // This is used for first instance.
    let initialPageLoadLink = window.location.href;
    if(initialPageLoadLink.includes("/T/gallery/")){
      this.galleryActive = true;
    }


    this.router.events.subscribe((val) =>{

      if(val instanceof NavigationEnd){
        // *** checking if gallery is started or not
        if(val.urlAfterRedirects.startsWith("/T/gallery/")){
          this.galleryActive = true;
        }else{
          this.galleryActive = false;
        }
      }
    })
  }

  // **** FUNCTION for initializing project list
  initializerProjectData(){
    this.galleryService.getProjectList().subscribe(res =>{
      this.allPROJECTS = res;
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
  switchProject(selectedProjID: number, fromPhone: boolean = false) {
    // ************** INFORM THE CHILD OF THE CUR PROJECT SELECTED.
    this.curProject = selectedProjID

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
}
