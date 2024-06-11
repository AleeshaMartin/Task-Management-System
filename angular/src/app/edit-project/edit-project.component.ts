import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { ProjectService } from '../project.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  @ViewChild('projectForm')
  projectForm!: NgForm;
  project: Project = {
    projectName: '',
    startDate: '',
    endDate: '',
    description: '',
    createdBy: 0,
    members: [],
    //id: 0
  };
  users: User[] = [];
  baseUrl = 'http://localhost:8080';
  decodedToken: any;
  id!: Number;

  constructor(
    private route:ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private projectService : ProjectService
  ) {}

  ngOnInit() {
    const decodedTokenString = localStorage.getItem('token');
     if (decodedTokenString) {
       this.decodedToken = jwtDecode(decodedTokenString);
     }
     this.project.createdBy= this.decodedToken.id;
    this.fetchUsers();
    this.id=Number(this.route.snapshot.paramMap.get("projectid"))
  }



  addMember(): void {
    this.project.members.push({ label: '', value: 0 });  
  }

  
  removeMember(index: number): void {
    this.project.members.splice(index, 1);
  }
  getUserName(user: User): string {
    return `ID: ${user.id} - Name: ${user.username1}`;
  }
  


  
  // async fetchUsers() {
  //   try {
  //     const response = await this.http.get<any>(`${this.baseUrl}/usersonly`).toPromise();
  //     console.log(response);
  //     this.users = response;
      
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // }


  async fetchUsers() {
    try {
      console.log('Fetching users...');
      const response = await this.http.get<any>(`${this.baseUrl}/usersonly`).toPromise();
      console.log('Response:', response);
      this.users = response;
      console.log('Users:', this.users);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      console.error('Error status:', error.status);
      console.error('Error message:', error.message);
      console.error('Error headers:', error.headers);
    }
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
      this.projectService.updateproject(requestBody,this.id)
        .subscribe(
          () => {
            this.showSuccessAlert();
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 1000);
          }
        );
    }
  }

  showSuccessAlert() {
console.log("Project updated successfully")
  }

  get today() {
    return new Date().toISOString().split('T')[0];
  }
}
