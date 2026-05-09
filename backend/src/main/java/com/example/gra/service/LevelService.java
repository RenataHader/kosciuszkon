package com.example.gra.service;

import com.example.gra.dto.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class LevelService {
    private final List<JsonNode> levelsData = new ArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void init() throws IOException {
        // Wczytujemy plik levels.json z zasobów
        JsonNode root = objectMapper.readTree(new ClassPathResource("levels.json").getInputStream());
        JsonNode gameData = root.get("game_data");
        if (gameData.isArray()) {
            for (JsonNode node : gameData) {
                levelsData.add(node);
            }
        }
    }

    public LevelDto getLevel(int id) {
        // Szukamy poziomu o danym ID
        for (JsonNode node : levelsData) {
            if (node.get("level").asInt() == id) {
                List<String> options = new ArrayList<>();
                node.get("clickable_elements").forEach(opt -> options.add(opt.asText()));

                return new LevelDto(
                        node.get("level").asInt(),
                        node.get("title").asText(),
                        node.get("question").asText(),
                        options,
                        node.has("is_ai_generated") && node.get("is_ai_generated").asBoolean()
                );
            }
        }
        return null;
    }

    public AnswerResponse verifyAnswer(int id, int selectedIndex) {
        for (JsonNode node : levelsData) {
            if (node.get("level").asInt() == id) {
                List<String> clickable = new ArrayList<>();
                node.get("clickable_elements").forEach(opt -> clickable.add(opt.asText()));

                String selectedValue = clickable.get(selectedIndex);
                boolean correct = false;

                // Sprawdzamy, czy wybrana opcja znajduje się na liście poprawnych odpowiedzi
                for (JsonNode correctNode : node.get("correct_answers")) {
                    if (correctNode.asText().equals(selectedValue)) {
                        correct = true;
                        break;
                    }
                }

                return new AnswerResponse(correct, node.get("explanation").asText());
            }
        }
        return new AnswerResponse(false, "Nie znaleziono poziomu.");
    }
}