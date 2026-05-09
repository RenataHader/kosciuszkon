package com.example.gra.service;

import com.example.gra.dto.LevelDto;
import com.example.gra.dto.AnswerResponse;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;

@Service
public class LevelService {

    // Symulacja bazy danych na start
    public LevelDto getLevel(int id) {
        if (id == 1) {
            return new LevelDto(1, "Konstruktor Haseł",
                    "Który zestaw stworzy najmocniejsze hasło?",
                    Arrays.asList("Marcin1990", "Fioletowy!2Slon?", "Piesek123"), false);
        }
        return null;
    }

    public AnswerResponse verifyAnswer(int id, int selectedIndex) {
        // Na razie prosta logika dla poziomu 1 (poprawna odp to index 1)
        boolean isCorrect = (id == 1 && selectedIndex == 1);
        String msg = isCorrect ? "Świetnie! To hasło jest bardzo trudne do złamania."
                : "Niestety, to hasło jest zbyt proste.";
        return new AnswerResponse(isCorrect, msg);
    }
}