package com.example.beatblendr.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;
import com.example.beatblendr.entity.Review;
import com.example.beatblendr.entity.Song;
import com.example.beatblendr.entity.User;
import lombok.AllArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String spotifyId;
    private String username;
    private String email;
    private String accessToken;
    private String refreshToken;
    private List<Review> reviews;
    private List<Song> songs;
    private List<User> friends;
    
}
