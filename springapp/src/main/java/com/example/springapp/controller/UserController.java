package com.example.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.Role;
import com.example.springapp.model.User;
import com.example.springapp.service.UserService;

@RestController
@RequestMapping()
@CrossOrigin("http://localhost:4200")
public class UserController {

  @Autowired
	private UserService userService;

  @GetMapping("/{role}")
  public Role get(@PathVariable(value = "role")Role role) {
    return role;
  }

  @GetMapping("/usersonly")
	public List<User> getUsers(){
		return userService.getUser();
	}
}