import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor() { }

  currentImg:number = 0;

  @ViewChild("img_carousel") img_carousel !: ElementRef;
  // @ViewChild("myName") myNameImg !: ElementRef;


  ngOnInit(): void {
  }

  next(){
    this.currentImg += 1;
    let trnsformXVal = 20;
    
    let childCount = this.img_carousel.nativeElement.childElementCount;
    
    
    if(this.currentImg > (childCount - 1)){
        this.currentImg = 0;
    }
    
    this.img_carousel.nativeElement.style.transform = `translateX(-${this.currentImg * trnsformXVal}rem)`;
    
    // alert("Button was clicked");
    console.log("Button was clicked");
  }

  prev(){
  }

}
