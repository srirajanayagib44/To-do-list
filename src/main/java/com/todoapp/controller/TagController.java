package com.todoapp.controller;

import com.todoapp.dto.TagDTO;
import com.todoapp.service.TagService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
@CrossOrigin(origins = "*")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }
    
    @PostMapping
    public ResponseEntity<TagDTO> createTag(@Valid @RequestBody TagDTO tagDTO) {
        try {
            TagDTO createdTag = tagService.createTag(tagDTO);
            return new ResponseEntity<>(createdTag, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping
    public ResponseEntity<List<TagDTO>> getAllTags() {
        List<TagDTO> tags = tagService.getAllTags();
        return new ResponseEntity<>(tags, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TagDTO> getTagById(@PathVariable("id") Integer tagId) {
        try {
            TagDTO tag = tagService.getTagById(tagId);
            return new ResponseEntity<>(tag, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TagDTO> updateTag(
            @PathVariable("id") Integer tagId,
            @Valid @RequestBody TagDTO tagDTO) {
        try {
            TagDTO updatedTag = tagService.updateTag(tagId, tagDTO);
            return new ResponseEntity<>(updatedTag, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable("id") Integer tagId) {
        try {
            tagService.deleteTag(tagId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

