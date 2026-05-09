package com.example.gra.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateCyberThreat(String prompt) {
        try {
            String url = apiUrl + "?key=" + apiKey;

            // Reszta kodu pozostaje bez zmian...
            Map<String, Object> requestBody = Map.of(
                    "contents", List.of(
                            Map.of("parts", List.of(
                                    Map.of("text", "Jesteś ekspertem ds. cyberbezpieczeństwa. " +
                                            "Generujesz krótkie, realistyczne treści ataków do gry edukacyjnej. " +
                                            "Zwracaj tylko treść wiadomości, bez komentarza. Zadanie: " + prompt)
                            ))
                    )
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<JsonNode> response = restTemplate.postForEntity(url, entity, JsonNode.class);

            return response.getBody()
                    .path("candidates").get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText().trim();

        } catch (Exception e) {
            return "Błąd AI: " + e.getMessage();
        }
    }
}