package com.example.beatblendr.mapper;

import com.example.beatblendr.dto.UserDTO;
import com.example.beatblendr.entity.User;

public class UserMapper {

    public static UserDTO mapToUserDTO(User user){
        return new UserDTO(
            user.getId(),
            user.getUsername(),
            user.getSpotifyId(),
            user.getSpotifySecretId(),
            user.getEmail(),
            user.getAccessToken(),
            user.getRefreshToken(),
            user.getRefId(),
            user.getReviews(),
            user.getSongs()
        );
    }

public static User mapToUser(UserDTO userDTO){
        return new User(
            userDTO.getId(),
            userDTO.getUsername(),
            userDTO.getSpotifyId(),
            userDTO.getSpotifySecretId(),
            userDTO.getEmail(),
            userDTO.getAccessToken(),
            userDTO.getRefreshToken(),
            userDTO.getRefId(), 
            userDTO.getReviews(),
            userDTO.getSongs()
        );
    }
    
}
