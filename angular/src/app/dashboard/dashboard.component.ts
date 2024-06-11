import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ProjectService } from '../project.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  projectid: any;
  decodedToken: any;
  project: any;
  checkProject: any;
  teamCount: any;
  userprojectid!: Number;
  private subscription: Subscription = new Subscription;
  usermember: any;
  length: any;

  constructor(private http: HttpClient, private router: Router, private projectService:ProjectService) { }

  ngOnInit(): void {
    const decodedTokenString = localStorage.getItem('token');
    if (decodedTokenString) {
      this.decodedToken = jwtDecode(decodedTokenString);
    }
    
    this.check();
    this.loadProject();
  }
  

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  check(): void {
    const loginid = this.decodedToken.id;
    console.log(loginid);
    console.log(this.decodedToken.role);
    if (this.decodedToken.role === 'MANAGER') {
      this.projectService.checkmanager(loginid).subscribe(response => {
          this.checkProject = response;
          console.log('check = ' + response + ' ** ' + this.checkProject);
        });}
     else {
      this.projectService.checkuser(loginid).subscribe(response => {
          this.checkProject = response;
          console.log('check = ' + response + ' ** ' + this.checkProject);
        });
    }
  }

  loadProject(): void {
    const loginid = this.decodedToken.id;
    if (loginid && this.decodedToken.role === 'MANAGER') {

      this.projectService.getmanagerproject(loginid).subscribe((response:any) => {
        console.log(response);
          this.project = response;
          console.log(this.project);
        });
    }else {
      this.projectService.getuserprojectid(loginid)
        .subscribe((response: any) => {
          this.usermember = response;
         
          console.log(this.usermember)
          console.log(this.usermember.project_id)
          this.projectService.getuserproject(this.usermember.project_id).
          subscribe((projectResponse: any) => {
                this.project = projectResponse;
                console.log(projectResponse)
                console.log(this.project);
              });
          
        });
    }
  }

 
  ngAfterViewInit(): void {
    this.loadProject();
  }

  createNewProject(): void {
    this.router.navigateByUrl('/projects');
  }

  viewDetails(): void {
    this.router.navigate(['/projectdetails/:id', this.projectid]);
  }

  takeReport(): void {
    this.router.navigate(['/report', this.project.id]);
  }
}