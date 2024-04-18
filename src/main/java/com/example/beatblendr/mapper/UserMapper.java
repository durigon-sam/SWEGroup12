package com.example.beatblendr.mapper;

import com.example.beatblendr.dto.UserDTO;
import com.example.beatblendr.entity.User;

public class UserMapper {

    public static UserDTO mapToUserDTO(User user){
        return new UserDTO(
            user.getId(),
            user.getSpotifyId(),
            user.getUsername(),
            user.getEmail(),
            user.getAccessToken(),
            user.getRefreshToken(),
            user.getReviews(),
            user.getSongs(),
            user.getFriends()
        );
    }

public static User mapToUser(UserDTO userDTO){
        return new User(
            userDTO.getId(),
            userDTO.getSpotifyId(),
            userDTO.getUsername(),
            userDTO.getEmail(),
            userDTO.getAccessToken(),
            userDTO.getRefreshToken(),
            userDTO.getReviews(),
            userDTO.getSongs(),
            userDTO.getFriends()
        );
    }
    
}
