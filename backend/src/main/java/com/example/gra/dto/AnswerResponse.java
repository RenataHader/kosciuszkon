// AnswerResponse.java
package com.example.gra.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AnswerResponse {
    private boolean correct;
    private String explanation;
}