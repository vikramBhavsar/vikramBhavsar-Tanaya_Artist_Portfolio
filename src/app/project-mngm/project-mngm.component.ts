import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectModel } from '../models/project-contents';
import { ManagementService } from '../services/management.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-mngm',
  templateUrl: './project-mngm.component.html',
  styleUrls: ['./project-mngm.component.scss'],
})
export class ProjectMngmComponent implements OnInit {
  projectCreateForm = new FormGroup({
    projectName: new FormControl('', Validators.required),
    projectDescrip: new FormControl(''),
  });

  //  Project model list for angukar
  projectModelList!: ProjectModel[];

  constructor(
    private mgntService: ManagementService,
    private router:Router
  ) {}

  ngOnInit(): void {

    // Populating Projects section
    this.getProjectList();
  }

  getProjectList() {
    let that = this;
    this.mgntService.getProjectList().subscribe({
      next(response) {
        that.projectModelList = response;
      },
      error(msg) {
        alert('Error: Error when getting data');
        // Assinging dymmy data for display
        that.projectModelList = [
          {
            id: '',
            projectName: '',
            projectDescription: '',
          },
        ];
        // End iof dummy assign
      },
    });
  }

  createProject() {

    let projectInstance: ProjectModel = {
      id: '',
      projectName: this.projectCreateForm.controls['projectName'].value,
      projectDescription:
        this.projectCreateForm.controls['projectDescrip'].value,
    };

    let that = this;

    this.mgntService.postProjectData(projectInstance).subscribe({
      next(response) {
        console.log(response);
        that.getProjectList();
      },
      error(msg) {
        alert(`Error Occured: ${msg.status} : ${msg.details}`);
      },
    });
  }

  // ** go back to main home page.
  goToMain(){
    this.router.navigate(['/T']);
  }

  // ** go to project
  goToProjectManagment(pid:string){
    this.router.navigate(['/sectiom-mngm',pid]);
  }
}
