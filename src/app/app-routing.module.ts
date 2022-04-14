import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// importing components
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { PrjRantsComponent } from './prj-rants/prj-rants.component';
import { MainAppComponent } from './main-app/main-app.component';
import { LoginComponent } from './login/login.component';
import { ProjectMngmComponent } from './project-mngm/project-mngm.component';
import { SectionMngmComponent } from './section-mngm/section-mngm.component';
import { SectionUpDelComponent } from './section-up-del/section-up-del.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'project-rants', component: PrjRantsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projects-mngm', component: ProjectMngmComponent },
  { path: 'sectiom-mngm/:projectid', component: SectionMngmComponent },
  { path: 'sectiom-ud/:sectionid', component: SectionUpDelComponent },
  { path: 'T', component:  MainAppComponent , children:[
    {
      path:'gallery/:projectid',
      component:  GalleryComponent
    },
    {
      path:'about',
      component:  AboutComponent
    },
    {
      path:'contact',
      component:  ContactComponent
    }
  ]},
  
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
