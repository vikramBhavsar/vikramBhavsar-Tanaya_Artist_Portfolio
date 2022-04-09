import { Component, OnInit } from '@angular/core';
import { AboutDataService } from '../services/about-data.service';
import { About } from '../models/about';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private aboutDataService : AboutDataService) { }

  content!:About[];

  ngOnInit(): void {

    this.initializeData();
  }


  // This will initial the page with about content
  initializeData(){
    this.aboutDataService.getAboutData().subscribe(res =>{
      console.log(res);
      this.content = res;
      console.log(this.content);
    })
  }

}
