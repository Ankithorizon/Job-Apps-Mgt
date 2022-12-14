import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ApplyToJobComponent } from './components/apply-to-job/apply-to-job.component';
import { FollowUpComponent } from './components/follow-up/follow-up.component';
import { JobResumeUploadComponent } from './components/job-resume-upload/job-resume-upload.component';
import { ResumeCreatorComponent } from './components/resume-creator/resume-creator.component';
import { ViewUserDataComponent } from './components/view-user-data/view-user-data.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'apply-to-job', component: ApplyToJobComponent },
  { path: 'follow-up', component: FollowUpComponent },
  { path: 'job-resume-upload', component: JobResumeUploadComponent },
  { path: 'resume-creator', component: ResumeCreatorComponent },
  { path: 'user-data', component: ViewUserDataComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
