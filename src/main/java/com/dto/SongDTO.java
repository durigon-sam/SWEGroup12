package com.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
    private long rating;
    
}
