package com.todoapp.service;

import com.todoapp.dto.TagDTO;
import com.todoapp.dto.TaskDTO;
import com.todoapp.model.Priority;
import com.todoapp.model.Status;
import com.todoapp.model.Tag;
import com.todoapp.model.Task;
import com.todoapp.model.User;
import com.todoapp.repository.TagRepository;
import com.todoapp.repository.TaskRepository;
import com.todoapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository, TagRepository tagRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
    }
    
    public TaskDTO createTask(TaskDTO taskDTO) {
        User user = userRepository.findById(taskDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + taskDTO.getUserId()));
        
        Task task = new Task();
        task.setUser(user);
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setPriority(taskDTO.getPriority() != null ? taskDTO.getPriority() : Priority.MEDIUM);
        task.setStatus(taskDTO.getStatus() != null ? taskDTO.getStatus() : Status.PENDING);
        task.setDueDate(taskDTO.getDueDate());
        
        Task savedTask = taskRepository.save(task);
        return convertToDTO(savedTask);
    }
    
    @Transactional(readOnly = true)
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public TaskDTO getTaskById(Integer taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        return convertToDTO(task);
    }
    
    @Transactional(readOnly = true)
    public List<TaskDTO> getTasksByUserId(Integer userId) {
        return taskRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<TaskDTO> getTasksByStatus(Status status) {
        return taskRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<TaskDTO> getTasksByPriority(Priority priority) {
        return taskRepository.findByPriority(priority).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<TaskDTO> getTasksByTagName(String tagName) {
        return taskRepository.findByTagName(tagName).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<TaskDTO> searchTasks(String tagName, Priority priority, Status status) {
        if (tagName != null && priority != null && status != null) {
            return taskRepository.findByTagName(tagName).stream()
                    .filter(t -> t.getPriority() == priority && t.getStatus() == status)
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } else if (tagName != null && priority != null) {
            return taskRepository.findByTagNameAndPriority(tagName, priority).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } else if (tagName != null && status != null) {
            return taskRepository.findByTagNameAndStatus(tagName, status).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } else if (priority != null && status != null) {
            return taskRepository.findByPriorityAndStatus(priority, status).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } else if (tagName != null) {
            return getTasksByTagName(tagName);
        } else if (priority != null) {
            return getTasksByPriority(priority);
        } else if (status != null) {
            return getTasksByStatus(status);
        }
        return getAllTasks();
    }
    
    public TaskDTO updateTask(Integer taskId, TaskDTO taskDTO) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setPriority(taskDTO.getPriority());
        task.setStatus(taskDTO.getStatus());
        task.setDueDate(taskDTO.getDueDate());
        
        Task updatedTask = taskRepository.save(task);
        return convertToDTO(updatedTask);
    }
    
    public void deleteTask(Integer taskId) {
        if (!taskRepository.existsById(taskId)) {
            throw new RuntimeException("Task not found with id: " + taskId);
        }
        taskRepository.deleteById(taskId);
    }
    
    public TaskDTO assignTagsToTask(Integer taskId, List<Integer> tagIds) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        
        task.getTags().clear();
        
        for (Integer tagId : tagIds) {
            Tag tag = tagRepository.findById(tagId)
                    .orElseThrow(() -> new RuntimeException("Tag not found with id: " + tagId));
            task.addTag(tag);
        }
        
        Task updatedTask = taskRepository.save(task);
        return convertToDTO(updatedTask);
    }
    
    @Transactional(readOnly = true)
    public List<TaskDTO> getPendingTasks() {
        return getTasksByStatus(Status.PENDING);
    }
    
    @Transactional(readOnly = true)
    public List<TaskDTO> getCompletedTasks() {
        return getTasksByStatus(Status.COMPLETED);
    }
    
    // Conversion methods
    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setTaskId(task.getTaskId());
        dto.setUserId(task.getUser().getUserId());
        dto.setUserName(task.getUser().getName());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setPriority(task.getPriority());
        dto.setStatus(task.getStatus());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setDueDate(task.getDueDate());
        
        if (task.getTags() != null && !task.getTags().isEmpty()) {
            List<TagDTO> tagDTOs = task.getTags().stream()
                    .map(tag -> {
                        TagDTO tagDTO = new TagDTO();
                        tagDTO.setTagId(tag.getTagId());
                        tagDTO.setName(tag.getName());
                        tagDTO.setDescription(tag.getDescription());
                        return tagDTO;
                    })
                    .collect(Collectors.toList());
            dto.setTags(tagDTOs);
        } else {
            dto.setTags(new ArrayList<>());
        }
        
        return dto;
    }
}

