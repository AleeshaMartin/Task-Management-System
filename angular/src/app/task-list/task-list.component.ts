import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

interface Task {
  taskId: 0;
  taskName: '';
  taskDescription: '';
  assignedTo: 0;
  priority: '';
  deadline: '';
  status: '';
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskdetails: Task[] = [];
  currentPage = 0;
  projectId!: number;
  role: string;
  userId: number;

  tasksPerPage = 2;
  sortOrder = 'ascending';
  searchTerm = '';
  decodedToken: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    
      this.route.queryParams.subscribe(params => {
        this.projectId = params['projectId'];
      });

    const decodedTokenString = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization','Bearer ${decodedTokenString}');
     if (decodedTokenString) {
       this.decodedToken = jwtDecode(decodedTokenString);
     }   
      this.role = this.decodedToken.role;
    this.userId = this.decodedToken.id;
  }

  ngOnInit() {
   // this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    console.log(this.projectId)
    this.loadTaskDetails();
  }

  loadTaskDetails() {
    if (this.role === 'MANAGER') {
      this.http.get<Task[]>(`http://localhost:8080/projects/${this.projectId}/tasks`)
        .subscribe(
          (response) => {
            this.taskdetails = response;
            console.log(response)
            console.log(this.taskdetails)
          },
          (error) => {
            console.error('Error fetching options:', error);
          }
        );
    } else {
      this.http.get<Task[]>(`http://localhost:8080/projects/users/${this.userId}/tasks`)
        .subscribe(
          (response) => {
            this.taskdetails = response;
          },
          (error) => {
            console.log('Error fetching options:', error);
          }
        );
    }
  }

  deleteTask(taskId: number) {
    this.http.delete(`http://localhost:8080/task/${taskId}`)
      .subscribe(
        () => {
        
          this.router.navigateByUrl("/dashboard")
        }
      );
      this.router.navigateByUrl("/dashboard")
  }

  showSuccessAlert() {
   alert("Task deleted successfully")
  }

  get pageCount() {
    return Math.ceil(this.filteredTasks.length / this.tasksPerPage);
  }
  


  
  
  
  
// val=currenttask
  get filteredTasks() {
    console.log('Search term:', this.searchTerm);
    const filteredTasks = this.sortedTasks.filter((val) => {
      if (this.searchTerm.trim() === '') {
        return true;
      } else if (
        val.taskName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        val.taskId.toString().includes(this.searchTerm)
      ) {
        return true;
      }
      return false;
    });
    console.log('Filtered tasks:', filteredTasks);
    return filteredTasks;
  }
  
  
//   the callback function returns the difference between the timestamps of the
// deadline
// properties of
// a
// and
// b
// . This sorts the tasks in ascending order based on the deadline.

  get sortedTasks() {
    return this.taskdetails.sort((a, b) => {
      if (this.sortOrder == 'ascending') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else {
        return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      }
    });
  }

  // handlePageChange(page: number) {
  //   this.currentPage = page;
  // }

  handleSortOrder() {
    this.sortOrder = this.sortOrder === 'ascending' ? 'descending' : 'ascending';
  }

  getStatusColorClass(status: string) {
    if (status === 'completed') {
      return 'text-success';
    } else if (status === 'inprogress') {
      return 'text-info';
    } else if (status === 'pending') {
      return 'text-danger';
    } else {
      return '';
    }
  }
}
