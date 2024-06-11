import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { ProjectService } from '../project.service';
interface Task {
  taskName: string;
  taskDescription: string;
  assignedTo: string;
  priority: string;
  deadline: string;
  status: string;
}

interface Member {
  value: string;
  label: string;
}
@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent {
  
    decodedToken: any;
    task: Task = {
      taskName: '',
      taskDescription: '',
      assignedTo: '',
      priority: '',
      deadline: '',
      status: ''
    };
    options: Member[] = [];
    projectId!: number;
    name!: string;
    role: string;
  
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private http: HttpClient,
      private projectService : ProjectService
    ) {
      const decodedTokenString = localStorage.getItem('token');
       if (decodedTokenString) {
         this.decodedToken = jwtDecode(decodedTokenString);
       }     
        this.role = this.decodedToken.role;
    }
  
    ngOnInit() {
      this.projectId =Number(this.route.snapshot.queryParamMap.get('projectId'));
      this.name = String(this.route.snapshot.queryParamMap.get('name'));
  
      this.http.get<{members: Member[]; }>(`http://localhost:8080/projects/${this.projectId}`)
        .subscribe(
          (response) => {
            this.options = response.members;
            console.log(response.members)
          },
          (error) => {
            console.error('Error loading project:', error);
          }
        );
    }
  
    handleChange(event: any) {
      const { name, value } = event.target;
      this.task = { ...this.task, [name]: value };
    }
  
    resetForm() {
      this.task = {
        taskName: '',
        taskDescription: '',
        assignedTo: '',
        priority: '',
        deadline: '',
        status: ''
      };
    }
  
    showSuccessAlert() {
      alert("Task created successfully")
    }
  
    onSubmit() {
      if (this.role === 'MANAGER') {
        this.http.post(`http://localhost:8080/projects/${this.projectId}/tasks`, this.task)
          .subscribe(
            () => {
              this.showSuccessAlert();
              this.resetForm();
              setTimeout(() => {
                this.router.navigate(['/projectdetails'], { queryParams: { projectId: this.projectId } });

              }, 2000);
            },
            (error) => {
              console.error('Error creating task:', error);
            }
          );
      }
    }
  }
  

