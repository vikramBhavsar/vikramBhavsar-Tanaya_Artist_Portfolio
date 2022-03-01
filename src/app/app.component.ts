import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tanaya_Artist_portfolio';

  clicked:boolean = false;
  @ViewChild("myName") myNameImg !: ElementRef;



  nameClick(){
    this.clicked = !this.clicked;
  }
}
