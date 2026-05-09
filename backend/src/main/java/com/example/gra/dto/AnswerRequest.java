// AnswerRequest.java
package com.example.gra.dto;

import lombok.Data;

import java.util.List;

@Data
public class AnswerRequest {
    private List<Integer> selectedOptionIndex;
}