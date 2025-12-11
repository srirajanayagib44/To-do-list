package com.todoapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    
    @GetMapping("/")
    public String index() {
        return "index";
    }
    
    @GetMapping("/tasks")
    public String tasks() {
        return "tasks";
    }
    
    @GetMapping("/users")
    public String users() {
        return "users";
    }
    
    @GetMapping("/tags")
    public String tags() {
        return "tags";
    }
    
    @GetMapping("/reports")
    public String reports() {
        return "reports";
    }
}

