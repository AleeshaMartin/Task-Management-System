package com.example.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Project;
import com.example.springapp.repository.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Project addProject(Project projects) {
        return projectRepository.save(projects);
    }

    @Override
    public Project getProjectById(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        return project.orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project updateProject(Long id, Project projects) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        Project existingProject = optionalProject.orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        existingProject.setProjectName(projects.getProjectName());
        existingProject.setDescription(projects.getDescription());
        existingProject.setStartDate(projects.getStartDate());
        existingProject.setEndDate(projects.getEndDate());
        existingProject.setMembers(projects.getMembers());

        return projectRepository.save(existingProject);
    }
    //dashboard code
    @Override
    public void deleteProjectById(Long id) {
		projectRepository.deleteById(id);
	}
    @Override
    public Project getProjectbymid(Long id) {
        return projectRepository.findByCreatedBy(id);
    }
    
    @Override
    public int checkprojects(Long id) {
        return projectRepository.checkproject(id);
    }
}

