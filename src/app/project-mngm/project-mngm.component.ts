import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-mngm',
  templateUrl: './project-mngm.component.html',
  styleUrls: ['./project-mngm.component.scss']
})
export class ProjectMngmComponent implements OnInit {

  projectCreateForm = new FormGroup({
    projectHeading:new FormControl('',Validators.required),
    projectDescrip:new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }


  getProjectList(){

  }


  createProject(){
    
  }


}
