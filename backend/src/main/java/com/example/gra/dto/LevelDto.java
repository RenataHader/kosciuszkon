// LevelDto.java
package com.example.gra.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class LevelDto {
    private int id;
    private String title;
    private String scenario;
    private List<String> options;
    private boolean isAiGenerated;
}