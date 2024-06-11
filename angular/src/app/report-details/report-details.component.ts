import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';




 interface Project {
  id?: string;
  projectName?: string;
  description?: string;
  members?: any[];
  startDate?: string;
  endDate?: string;
  tasks?: Task[];
}
 interface Task {
  taskId?: string;
  taskName?: string;
  taskDescription?: string;
  assignedTo?: string;
  priority?: string;
  deadline?: string;
  status?: string;
}

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})

export class ReportDetailsComponent implements OnInit {
  selectedValues: any[] = [];
    project: Project = {};
  tasks: Task[] = [];
  completedTask = 0;
  totalTask = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadProject();
  }




//   The
// paramMap
// property is an observable that contains the key-value pairs of the route parameters. The
// get()
// method retrieves the value associated with the specified key, which in this case is 'id'.

  loadProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Project>(`http://localhost:8080/projects/${id}`).subscribe(
      (data) => {
       
        this.project = data;
        this.selectedValues = data.members || [];
        console.log(this.selectedValues)
        this.tasks = data.tasks || [];
        this.calculateProjectProgress();
      },
      (error) => {
        console.error('Error loading project:', error);
      }
    );
  }

  calculateProjectProgress(): void {
    let completed = 0;
    let totaltask = 0;
    this.tasks.forEach((task) => {
      totaltask++;
      if (task.status === 'completed') {
        completed++;
      }
    });
    this.completedTask = completed;
    this.totalTask = totaltask;
  }

 
}
