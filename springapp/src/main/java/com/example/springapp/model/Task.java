package com.example.springapp.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Task {
    @Id
    @GeneratedValue
    private Long taskId;
    @Column(length=50)
    private String taskName;
    @Column(length=200)
    private String taskDescription;
    private String assignedTo;
    private LocalDate deadline;
    private String priority;
    private String status;
    

    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name = "projectid", nullable = false)
    @JsonIgnore
    private Project project;

    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name = "userid", nullable = false)
    @JsonIgnore
    private User user;

    
    public Task() {
    }
    public Task(Long taskId, String taskName, String taskDescription, String assignedTo, LocalDate deadline,
            String priority, String status, Project project, User user) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.assignedTo = assignedTo;
        this.deadline = deadline;
        this.priority = priority;
        this.status = status;
        this.project = project;
        this.user = user;
       
    }
    public Long getTaskId() {
        return taskId;
    }
    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }
    public String getTaskName() {
        return taskName;
    }
    public void setTaskName(String taskname) {
        this.taskName = taskname;
    }
    public String getTaskDescription() {
        return taskDescription;
    }
    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }
    public String getAssignedTo() {
        return assignedTo;
    }
    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }
    public LocalDate getDeadline() {
        return deadline;
    }
    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }
    public String getPriority() {
        return priority;
    }
    public void setPriority(String priority) {
        this.priority = priority;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Project getProject() {
        return project;
    }
    public void setProject(Project project) {
        this.project = project;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
     
 
    @Override
    public String toString() {
        return "Task [id=" + taskId + ", taskName=" + taskName + ", taskDescription=" + taskDescription + ", assignedTo="
                + assignedTo + ", deadline=" + deadline + ", priority=" + priority + ", status=" + status + ", project="
                + project + ", user=" + user + "]";      
    }
 
};




  