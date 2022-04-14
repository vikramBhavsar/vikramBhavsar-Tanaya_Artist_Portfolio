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
    projectDate: new FormControl(''),
  });

  //  Project model list for angukar
  projectModelList!: ProjectModel[];

  constructor(
    private mgntService: ManagementService,
    private datepipe: DatePipe,
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
            projectDate: '',
            projectDescription: '',
          },
        ];
        // End iof dummy assign
      },
    });
  }

  createProject() {

    // *** Error handling for date.
    let choosenDate: string = '';
    if (this.projectCreateForm.controls['projectDate'].value.length > 0) {
      try {
        choosenDate =
          this.datepipe.transform(
            new Date(this.projectCreateForm.controls['projectDate'].value),
            'YYYY-MM-dd'
          ) || '';
      } catch (error) {
        choosenDate = '';
      }
    }
    console.log(`The choosen date is ${choosenDate}`);

    let projectInstance: ProjectModel = {
      id: '',
      projectName: this.projectCreateForm.controls['projectName'].value,
      projectDescription:
        this.projectCreateForm.controls['projectDescrip'].value,
      projectDate: choosenDate,
    };

    this.mgntService.postProjectData(projectInstance).subscribe({
      next(response) {
        console.log(response);
      },
      error(msg) {
        console.log(msg);
      },
    });
  }


  // ** go to project
  goToProjectManagment(pid:string){
    alert(pid);
    this.router.navigate(['/sectiom-mngm',pid]);
  }
}
