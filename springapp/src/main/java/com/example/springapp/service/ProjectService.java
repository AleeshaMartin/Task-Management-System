package com.example.springapp.service;

import java.util.List;

import com.example.springapp.model.Project;

public interface ProjectService {
    Project addProject(Project projects);
    Project getProjectById(Long id);
    List<Project> getAllProjects();
    Project updateProject(Long id, Project projects);
    void deleteProjectById(Long id);
    //dashboard code
    Project getProjectbymid(Long id);
    int checkprojects(Long id);

}
