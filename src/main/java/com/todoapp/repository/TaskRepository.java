package com.todoapp.repository;

import com.todoapp.model.Priority;
import com.todoapp.model.Status;
import com.todoapp.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    @Query("SELECT t FROM Task t WHERE t.user.userId = :userId")
    List<Task> findByUserId(@Param("userId") Integer userId);

    List<Task> findByStatus(Status status);

    List<Task> findByPriority(Priority priority);

    @Query("SELECT t FROM Task t WHERE t.user.userId = :userId AND t.status = :status")
    List<Task> findByUserIdAndStatus(@Param("userId") Integer userId, @Param("status") Status status);
    
    @Query("SELECT t FROM Task t JOIN t.tags tag WHERE tag.name = :tagName")
    List<Task> findByTagName(@Param("tagName") String tagName);
    
    @Query("SELECT t FROM Task t WHERE t.priority = :priority AND t.status = :status")
    List<Task> findByPriorityAndStatus(@Param("priority") Priority priority, @Param("status") Status status);
    
    @Query("SELECT t FROM Task t JOIN t.tags tag WHERE tag.name = :tagName AND t.status = :status")
    List<Task> findByTagNameAndStatus(@Param("tagName") String tagName, @Param("status") Status status);
    
    @Query("SELECT t FROM Task t JOIN t.tags tag WHERE tag.name = :tagName AND t.priority = :priority")
    List<Task> findByTagNameAndPriority(@Param("tagName") String tagName, @Param("priority") Priority priority);
}

