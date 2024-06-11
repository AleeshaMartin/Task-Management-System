import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { catchError, map, throwError } from 'rxjs';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  projectId!: string ;
  projectName!: string;
  projectDescription!: string;
  projectStartDate!: string;
  projectEndDate: string | undefined;
  projectTeammember: any[] = [];
  decodedToken: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private projectService: ProjectService
  ) {
    this.route.queryParams.subscribe(params => {
      this.projectId = params['projectId'];
    }); 
   }

  ngOnInit(): void {
    const decodedTokenString = localStorage.getItem('token');
     if (decodedTokenString) {
       this.decodedToken = jwtDecode(decodedTokenString);
     }   
     
      this.getProjectDetails();
  }

  // This line of code subscribes to the
  // queryParams
  // observable provided by the
  // ActivatedRoute
  // service. The
  // queryParams
  // observable emits an object containing the query parameters of the current route.

  // It uses the
  // map
  // operator to extract the project details from the HTTP response,

  async getProjectDetails() {
    try {
      this.projectService.getproject(this.projectId).pipe(
        map((projectDetails: any) => {
          this.projectId = projectDetails.id;
          this.projectName = projectDetails.projectName;
          this.projectDescription = projectDetails.description;
          this.projectStartDate = projectDetails.startDate;
          this.projectEndDate = projectDetails.endDate;
          this.projectTeammember = projectDetails.members;
        }),
        catchError(error => {
          console.error('Error fetching project details:', error);
          return throwError(error);
        })
      ).subscribe();
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  }

  async deleteProject(projectId: string) {
  try {
    
    await this.projectService.deleteproject(projectId).pipe(
      catchError(error => {
        console.error('Error deleting project:', error);
        return throwError(error);
      })
    ).toPromise();
    this.sweetalert();
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  } catch (error) {
    console.error('Error deleting project:', error);
  }
}

  sweetalert() {
    alert("Project deleted Successfully");
  }
}
