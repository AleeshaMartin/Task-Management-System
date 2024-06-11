package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.springapp.model.Members;

public interface MembersRepository extends JpaRepository<Members,Long>{
//dashboard code
@Query(nativeQuery = true, value = "SELECT * FROM members WHERE value = :id")
    Members findByValuee(Long id);
    
    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM members WHERE value= :id")
    int checkproject(Long id);
    
}
