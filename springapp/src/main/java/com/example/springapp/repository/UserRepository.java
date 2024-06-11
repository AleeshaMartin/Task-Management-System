package com.example.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.springapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByEmail(String email);

	@Query(nativeQuery = true, value = "SELECT * FROM user WHERE username1 NOT IN (SELECT label FROM members WHERE project_id IS NOT NULL) AND role = 'USER'")
	List<User> getuseronly();
}
