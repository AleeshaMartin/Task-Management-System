import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http :HttpClient) { }

  loginUser(user :any):Observable<Object>{
    return this.http.post("http://localhost:8080/api/auth/login",user,{responseType: 'text'});
  }

  registerUser(user :any):Observable<Object>{
    return this.http.post("http://localhost:8080/api/auth/register",user,{responseType: 'text'});
  }

  checkmanager(loginid:Number){
    return this.http.get(`http://localhost:8080/project/manager/check/${loginid}`);
  }
  checkuser(loginid:Number){
    return this.http.get(`http://localhost:8080/project/user/check/${loginid}`);
  }
  getmanagerproject(loginid:Number){
  return  this.http.get(`http://localhost:8080/projects/manager/${loginid}`)
  }
  getuserprojectid(loginid:Number){
    return  this.http.get(`http://localhost:8080/project/user/${loginid}`)
    }
  getuserproject(project_id:Number){
    return this.http.get(`http://localhost:8080/projects/${project_id}`)
    }

  createproject(project:any){
    return       this.http.post(`http://localhost:8080/projects`, project)
   }

   getproject(project_id:any){
    return this.http.get(`http://localhost:8080/projects/${project_id}`)
   }

   updateproject(project:any,id:Number){
    return  this.http.put(`http://localhost:8080/projects/`+id, project)

   }
   deleteproject(project_id:any){
    return this.http.delete(`http://localhost:8080/projects/${project_id}`)
   }

   createtask(projectId:any,task:any){
    this.http.post(`http://localhost:8080/projects/${projectId}/tasks`, task)
   }

}
