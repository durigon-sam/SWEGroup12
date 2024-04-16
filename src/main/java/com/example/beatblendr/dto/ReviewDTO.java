package com.example.beatblendr.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import com.example.beatblendr.entity.User;

import lombok.AllArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {

    private Long reviewId;
    private String spotifyId;
    private Long type;
    private Long rating;
    private String description;   
    private User user;
}
