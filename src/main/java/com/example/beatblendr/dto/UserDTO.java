package com.example.beatblendr.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

import com.example.beatblendr.entity.Review;
import com.example.beatblendr.entity.Song;

import lombok.AllArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String username;
    private String spotifyId;
    private String spotifySecretId;
    private String email;
    private String accessToken;
    private String refreshToken;
    private String refId;
    private List<Review> reviews;
    private List<Song> songs;
    
}
