package com.example.springapp.service;

import java.util.List;
import com.example.springapp.model.Task;

public interface TaskService {
    Task createTask(Long projectId, Task taskRequest);

    List<Task> getAllTasks();
    List<Task> getTasksByProjectId(Long projectid);
    List<Task> getTasksByUserId(int userid);
    
    Task getTaskById(Long id);

    Task updateTask(Long taskId, Task updatedTask);

    void deleteTask(Long taskId);
    
}