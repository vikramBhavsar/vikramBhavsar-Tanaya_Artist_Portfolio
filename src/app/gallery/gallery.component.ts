import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GalleryDataService } from '../services/gallery-data.service';
import { ServerData } from '../models/project-contents';

import {
  ActivatedRoute,
  NavigationEnd,
  Router,
} from '@angular/router';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {


  constructor(
    private galleryService: GalleryDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  currentImg: number = 0;

  // *** FOR ONE MULTIPLE IMAGES SECTION
  @ViewChild('img_carousel') img_carousel!: ElementRef;
  @ViewChild('one_image') one_image!: ElementRef;
  @ViewChild('img_gallery') img_gallery!: ElementRef;

  // **** VIEW CHILD USED FOR IMAGE MODAL
  @ViewChild('imgModal') imgModal!: ElementRef;

  // **** VARIABLES USED FOR OPENING THE IMAGE PROPERLY
  curImgLink: string = '../../assets/Images/Fragments/IMG_2219.JPG';
  curImgStatus: string = 'some wonderful text';

  // **** VARIABLES FOR PROJECT SELECTION SECTION WISE **** //
  curProject: number = 0;

  serverData: ServerData = {
    "PROJECTS": [
        {
          "id": "1",
          "projectName": "Fragments",
          "projectDescription": "",
          "projectDate":"",
          "sections":[],
        }
    ]
  }

  ngOnInit(): void {
    // *** getting the Project ID from the route parameter

    this.initializeRouterForProjectChange();
    this.initializerGalleryData();
  }

  // for affecting view child
  ngAfterViewInit(): void {
    // calling this function to set the image size properly on load.
    this.setImageSizeForMultipleImageSection();
  }

  initializeRouterForProjectChange() {

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let routeParams = this.route.snapshot.paramMap;
        let projectIDFromRoute = Number(routeParams.get('projectid'));
        this.curProject = projectIDFromRoute;
      }
    });
  }

  initializerGalleryData() {
    this.galleryService.getGalleryData().subscribe((res) => {
      this.serverData = this.processResultsForLayout(res);
      this.serverData = res;
      console.log(this.serverData.PROJECTS);
    });
  }

  // **** SETTING THE IMAGE FOR MULTIPLE IMAGE SECTION FUNCTION
  setImageSizeForMultipleImageSection() {
    this.img_carousel.nativeElement.style.width = '100%';
    let imgValue = this.img_carousel.nativeElement.clientWidth;
    let allImgChildren = this.img_carousel.nativeElement.children;
    console.log('changing the value to ', imgValue);

    this.img_gallery.nativeElement.style.width = `${imgValue}px`;

    for (const imgItem of allImgChildren) {
      imgItem.style.width = `${imgValue}px`;
      imgItem.firstElementChild.style.width = `${imgValue}px`;
    }
  }




  // **** THis function will process the data and put proper layout for content
  processResultsForLayout(resultsData: ServerData): ServerData{

    


    return resultsData;
  } 

  // **** TURNING THE IMAGES ON RIGHT SIDE.
  next() {
    this.currentImg += 1;
    // let trnsformXVal = 30;
    let trnsformXVal = this.one_image.nativeElement.clientWidth;
    // alert(trnsformXVal);

    let childCount = this.img_carousel.nativeElement.childElementCount;

    if (this.currentImg > childCount - 1) {
      this.currentImg = 0;
    }

    this.img_carousel.nativeElement.style.transform = `translateX(-${
      this.currentImg * trnsformXVal
    }px)`;

    // alert("Button was clicked");
    console.log('Button was clicked');
    console.log(this.img_carousel.nativeElement.clientWidth);
  }

  // *** TURN THE IMAGES ON LEFT SIDE
  prev() {
    this.currentImg -= 1;
    let trnsformXVal = 30;

    let childCount = this.img_carousel.nativeElement.childElementCount;

    if (this.currentImg < 0) {
      this.currentImg = childCount - 1;
    }

    this.img_carousel.nativeElement.style.transform = `translateX(-${
      this.currentImg * trnsformXVal
    }rem)`;

    // alert("Button was clicked");
    console.log('Button was clicked');
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
