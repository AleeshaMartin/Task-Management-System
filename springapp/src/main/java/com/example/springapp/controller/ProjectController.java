package com.example.springapp.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.springapp.model.Members;
import com.example.springapp.model.Project;
import com.example.springapp.repository.MembersRepository;
import com.example.springapp.service.ProjectService;


@RestController
@CrossOrigin("http://localhost:4200")
public class ProjectController {
	@Autowired
	private ProjectService projectService;


	@PostMapping("/projects")
	public ResponseEntity<Project> addProject(@RequestBody Project projects) {
		try
		{
		Project createdProject = projectService.addProject(projects);
		return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
	}
	catch(Exception e)
	{
		throw new RuntimeException(e);
	}
		
	}
    
    @GetMapping("/projects/{id}")
	public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
		try
		{
		Project project = projectService.getProjectById(id);
		return ResponseEntity.ok(project);
	}
	catch(Exception e)
	{
		throw new RuntimeException(e);
	}
	}

	@GetMapping("/projects")
	public List<Project> getAllProjects() {
		try
		{
		return projectService.getAllProjects();
	}
	catch(Exception e)
	{
		throw new RuntimeException(e);
	}
	}

	@PutMapping("/projects/{id}")
	public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projects) {
		try
		{
		Project updatedProject = projectService.updateProject(id, projects);
		return ResponseEntity.ok(updatedProject);
	}
	catch(Exception e)
	{
		throw new RuntimeException(e);
	}
	}
	@GetMapping("/projects/manager/{id}")
	  public Project getProjectmid(@PathVariable Long id)
  {
		return projectService.getProjectbymid(id);
	}

	@DeleteMapping("/projects/{id}")
	public ResponseEntity<HttpStatus> deleteProjectById(@PathVariable Long id) {
		try
		{
		projectService.deleteProjectById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	catch(Exception e)
	{
		throw new RuntimeException(e);
	}
	}
//dashboard code
@Autowired
	private MembersRepository membersRepository;
	@GetMapping("/project/user/{id}")
	  public Members getProjectuid(@PathVariable Long id)
    {
		try
		{
        return membersRepository.findByValuee(id);
	}
	catch(Exception e)
	{
		throw new RuntimeException(e);
	}
    }

	
	@GetMapping("/project/manager/check/{id}")
    public int checkProjectmanager(@PathVariable Long id)
    {
		try
		{
        int b=projectService.checkprojects(id);
       
        return b;
	}
	catch(Exception e)
	{
		throw new RuntimeException(e);
	}
    }

	
	@GetMapping("/project/user/check/{id}")
    public int checkProjectuser(@PathVariable Long id)
    {
		try
		{
        int b=membersRepository.checkproject(id);
        
        return b;
		}
	
	catch(Exception e)
	{
		throw new RuntimeException(e);
	}
		
    }
   
	
	
}
