package com.todoapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TodoApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(TodoApplication.class, args);
        System.out.println("\n========================================");
        System.out.println("Todo List Application Started!");
        System.out.println("Access the application at: http://localhost:8080");
        System.out.println("API Documentation: http://localhost:8080/api");
        System.out.println("========================================\n");
    }
}

