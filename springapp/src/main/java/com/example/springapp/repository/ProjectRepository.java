package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.springapp.model.Project;

public interface ProjectRepository extends JpaRepository<Project,Long>{
 //dashboard code
	
    Project findByCreatedBy(Long id); 
    
    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM project WHERE created_by= :id")
    int checkproject(Long id);
}
