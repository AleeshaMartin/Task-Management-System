import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { RegisterComponent } from './register/register.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  {
    path:"",
    component: LandingpageComponent
   },
   {
    path:"login",
    component:LoginComponent, 

},
{
  path:"register",
  component: RegisterComponent

},
{
  path:"dashboard",
  component:DashboardComponent,

},
{
  path:"projects",
  component: ProjectCreateComponent ,canActivate: [authGuard]

},
{
  path:"projectdetails",
  component: ProjectDetailsComponent 

},
{
  path:"task-create",
  component: TaskCreateComponent ,canActivate: [authGuard]
},
{
  path:"tasklist",
  component: TaskListComponent 

},
{
  path:"edit-project/:projectid",
  component: EditProjectComponent ,canActivate: [authGuard]
},
{
  path:"edittask/:projectid/:taskid",
  component: EditTaskComponent 

},
{
  path:"report/:id",
  component: ReportDetailsComponent

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
