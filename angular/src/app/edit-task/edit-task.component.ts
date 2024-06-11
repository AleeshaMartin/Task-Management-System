import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { HttpClient } from '@angular/common/http';
 // import Swal from 'sweetalert2';
  import { jwtDecode } from 'jwt-decode';

  interface Task {
    taskId: number;
    taskName: string;
    taskDescription: string;
    assignedTo: string;
    priority: string;
    deadline: string;
    status: string;
  }
  
  interface Option {
    label: string;
    value: string;
  }
  
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})

  export class EditTaskComponent implements OnInit {
    task: Task = {
      taskId: 0,
      taskName: '',
      taskDescription: '',
      assignedTo: '',
      priority: '',
      deadline: '',
      status: '',
    };
    options: Option[] = [];
    projectId!: number;
    taskId!: number;
    role!: string;
    isManager!: boolean;
    decodedToken: any;
  
    constructor(
      private route: ActivatedRoute,
      private http: HttpClient,
      private router: Router
    ) {
      const decodedTokenString = localStorage.getItem('token');
      if (decodedTokenString) {
        this.decodedToken = jwtDecode(decodedTokenString);
        this.role = this.decodedToken.role;
        this.isManager = this.role === 'MANAGER';
      }
    }
  
    ngOnInit() {
      this.projectId = Number(this.route.snapshot.queryParamMap.get('projectId'));
      this.taskId = Number(this.route.snapshot.queryParamMap.get('taskId'));
      console.log(this.taskId);
      this.loadProjectDetails();
      this.loadTaskDetails();
    }


//   The server is expected to return a JSON object with a
// members
// property that contains an array of
// Option
// objects.

    loadProjectDetails() {
      this.http.get<{ members: Option[] }>(`http://localhost:8080/projects/${this.projectId}`)
        .subscribe(
          (response) => {
            this.options = response.members;
            console.log(this.options)
          },
          (error) => {
            console.error('Error loading project:', error);
          }
        );
    }
  
    loadTaskDetails() {
      this.http.get<Task>(`http://localhost:8080/tasks/${this.taskId}`)
        .subscribe(
          (response) => {
            this.task = response;
          },
          (error) => {
            console.error('Error fetching task:', error);
          }
        );
    }
  
    // used to handle changes to form fields in a user interface
    handleChange(event: any) {
      const { name, value } = event.target;
      this.task = {
        ...this.task,
        [name]: value
      };
    }
    
    onSubmit() {
      this.http.put(`http://localhost:8080/tasks/${this.taskId}`, this.task)
        .subscribe(
          () => {
            this.showSuccessAlert();
            setTimeout(() => {
              this.router.navigate(['/tasklist'], { queryParams: { projectId: this.projectId } } );
            }, 2000);
          },
          (error) => {
            console.error('Error updating task:', error);
          }
        );
    }
  
    showSuccessAlert() {
      alert("task updated successfully")
    }
  }
  
  // route
  // : an instance of
  // ActivatedRoute
  // that provides access to the route data.

//   router
// : an instance of
// Router
// that provides routing functionality.