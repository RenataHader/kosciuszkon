package com.example.gra.service;

import com.example.gra.dto.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class LevelService {
    private final List<JsonNode> levelsData = new ArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private GeminiService geminiService;

    @PostConstruct
    public void init() throws IOException {
        JsonNode root = objectMapper.readTree(new ClassPathResource("levels.json").getInputStream());
        JsonNode gameData = root.get("game_data");
        if (gameData.isArray()) {
            gameData.forEach(levelsData::add);
        }
    }

    public LevelDto getLevel(int id) {
        for (JsonNode node : levelsData) {
            if (node.get("level").asInt() == id) {
                List<String> options = new ArrayList<>();
                node.get("clickable_elements").forEach(opt -> options.add(opt.asText()));

                String question = node.get("question").asText();
                boolean isAi = node.has("is_ai_generated") && node.get("is_ai_generated").asBoolean();

                // Jeśli w JSON poziom ma flagę is_ai_generated, prosimy Gemini o nową treść
                if (isAi) {
                    String dynamicContent = geminiService.generateCyberThreat(
                            "Wygeneruj nową treść dla poziomu: " + node.get("title").asText() +
                                    ". Oryginalny opis: " + question);
                    if (!dynamicContent.contains("Błąd")) {
                        question = dynamicContent;
                    }
                }

                return new LevelDto(node.get("level").asInt(), node.get("title").asText(), question, options, isAi);
            }
        }
        return null;
    }

    public AnswerResponse verifyAnswer(int id, List<Integer> selectedOptionIndex) {
        for (JsonNode node : levelsData) {
            if (node.get("level").asInt() == id) {
                // Pobieramy wszystkie elementy możliwe do kliknięcia z JSON
                List<String> clickable = new ArrayList<>();
                node.get("clickable_elements").forEach(opt -> clickable.add(opt.asText()));

                // Pobieramy poprawne odpowiedzi z JSON
                List<String> correctAnswers = new ArrayList<>();
                node.get("correct_answers").forEach(ans -> correctAnswers.add(ans.asText()));

                try {
                    // Mapujemy przesłane przez użytkownika indeksy na teksty z listy 'clickable'
                    List<String> selectedValues = selectedOptionIndex.stream()
                            .map(clickable::get)
                            .toList();

                    // Sprawdzamy, czy gracz wybrał dokładnie tyle samo elementów co w kluczu i czy teksty się zgadzają
                    boolean correct = selectedValues.size() == correctAnswers.size()
                            && selectedValues.containsAll(correctAnswers);

                    return new AnswerResponse(correct, node.get("explanation").asText());
                } catch (IndexOutOfBoundsException e) {
                    return new AnswerResponse(false, "Przesłano nieprawidłowy indeks opcji.");
                }
            }
        }
        return new AnswerResponse(false, "Nie znaleziono poziomu.");
    }
}