package com.example.gra.controller;

import com.example.gra.dto.*;
import com.example.gra.service.LevelService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/levels")
@CrossOrigin(origins = "http://localhost:5173") // Port Vite'a
public class LevelController {

    private final LevelService levelService;

    public LevelController(LevelService levelService) {
        this.levelService = levelService;
    }

    @GetMapping("/{id}")
    public LevelDto getLevel(@PathVariable int id) {
        return levelService.getLevel(id);
    }

    @PostMapping("/{id}/answer")
    public AnswerResponse checkAnswer(@PathVariable int id, @RequestBody AnswerRequest request) {
        return levelService.verifyAnswer(id, request.getSelectedOptionIndex());
    }
}