package com.example.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepository;
@Service
public class UserService {
	
	
    @Autowired
	private UserRepository userRepository;
	
	public List<User> getUser(){
		return userRepository.getuseronly();
	}

}