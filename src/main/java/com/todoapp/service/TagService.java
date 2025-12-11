package com.todoapp.service;

import com.todoapp.dto.TagDTO;
import com.todoapp.model.Tag;
import com.todoapp.repository.TagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }
    
    public TagDTO createTag(TagDTO tagDTO) {
        if (tagRepository.existsByName(tagDTO.getName())) {
            throw new RuntimeException("Tag already exists with name: " + tagDTO.getName());
        }
        
        Tag tag = convertToEntity(tagDTO);
        Tag savedTag = tagRepository.save(tag);
        return convertToDTO(savedTag);
    }
    
    @Transactional(readOnly = true)
    public List<TagDTO> getAllTags() {
        return tagRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public TagDTO getTagById(Integer tagId) {
        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + tagId));
        return convertToDTO(tag);
    }
    
    @Transactional(readOnly = true)
    public TagDTO getTagByName(String name) {
        Tag tag = tagRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Tag not found with name: " + name));
        return convertToDTO(tag);
    }
    
    public TagDTO updateTag(Integer tagId, TagDTO tagDTO) {
        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + tagId));
        
        if (!tag.getName().equals(tagDTO.getName()) && 
            tagRepository.existsByName(tagDTO.getName())) {
            throw new RuntimeException("Tag already exists with name: " + tagDTO.getName());
        }
        
        tag.setName(tagDTO.getName());
        tag.setDescription(tagDTO.getDescription());
        
        Tag updatedTag = tagRepository.save(tag);
        return convertToDTO(updatedTag);
    }
    
    public void deleteTag(Integer tagId) {
        if (!tagRepository.existsById(tagId)) {
            throw new RuntimeException("Tag not found with id: " + tagId);
        }
        tagRepository.deleteById(tagId);
    }
    
    // Conversion methods
    private TagDTO convertToDTO(Tag tag) {
        TagDTO dto = new TagDTO();
        dto.setTagId(tag.getTagId());
        dto.setName(tag.getName());
        dto.setDescription(tag.getDescription());
        return dto;
    }
    
    private Tag convertToEntity(TagDTO dto) {
        Tag tag = new Tag();
        tag.setName(dto.getName());
        tag.setDescription(dto.getDescription());
        return tag;
    }
}

