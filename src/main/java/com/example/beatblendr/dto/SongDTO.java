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
public class SongDTO {

    private Long id;
    private String spotifyId;
    private String songName;
    private String albumName;
    private String artistName;
    private String image;
    private Long rating;
    private User user;

    
}
