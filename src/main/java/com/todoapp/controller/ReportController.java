package com.todoapp.controller;

import com.todoapp.dto.TaskDTO;
import com.todoapp.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    private final TaskService taskService;

    public ReportController(TaskService taskService) {
        this.taskService = taskService;
    }
    
    @GetMapping("/pending-tasks")
    public ResponseEntity<List<TaskDTO>> getPendingTasks() {
        List<TaskDTO> tasks = taskService.getPendingTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
    
    @GetMapping("/completed-tasks")
    public ResponseEntity<List<TaskDTO>> getCompletedTasks() {
        List<TaskDTO> tasks = taskService.getCompletedTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
}

