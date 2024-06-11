import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { ProjectService } from '../project.service';

interface ProjectMember {
  label: string;
  value: number;
}

interface Project {
  projectName: string;
  startDate: string;
  endDate: string;
  description: string;
  createdBy: 0,
  members: ProjectMember[];
}

interface User {
  id: number;
  username1: string;
}

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  @ViewChild('projectForm')
  projectForm!: NgForm;
  project: Project = {
    projectName: '',
    startDate: '',
    endDate: '',
    description: '',
    createdBy:0,
    members: []
  };
  users: User[] = [];
  baseUrl = 'http://localhost:8080';
  decodedToken: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    const decodedTokenString = localStorage.getItem('token');
    if (decodedTokenString) {
       this.decodedToken = jwtDecode(decodedTokenString);
     }
    this.project.createdBy= this.decodedToken.id;
    this.fetchUsers();
  }

 
  addMember(): void {
    this.project.members.push({ label: '', value: 0 });   }

  removeMember(index: number): void {
    this.project.members.splice(index, 1);
  }
  getUserName(user: User): string {
    return `ID: ${user.id} - Name: ${user.username1}`;
  }
  

  fetchUsers() {
    this.http.get<{ data?: { id: number; username1: string }[] }>(`${this.baseUrl}/usersonly`)
      .subscribe(
        (response:any) => {
        
          this.users=response
        }
      );
      console.log(this.users);
  }
  onSubmit(form: NgForm) {
 
    if (form.valid) {
      const requestBody = {
        ...this.project,
        members: this.project.members.map(member => ({
          value: member.value,
          label: this.users.find(user => user.id == member.value)?.username1 || ''
        }))
         };
  
      console.log(this.project.members)
        this.projectService.createproject(requestBody).subscribe(
          () => {
            this.showSuccessAlert();
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 2000);
          },
          (error) => {
            console.error('Error creating project:', error);
          }
        );
    }
  }

  showSuccessAlert() {
    alert("Project Created successfully")
  }

  get today() {
    return new Date().toISOString().split('T')[0];
  }
}
