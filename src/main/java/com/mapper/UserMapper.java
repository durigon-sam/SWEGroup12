package com.mapper;

import com.dto.UserDTO;
import com.entity.User;

public class UserMapper {

    public static UserDTO mapToUserDTO(User user){
        return new UserDTO(
            user.getId(),
            user.getUsername(),
            user.getSpotifyAccount(),
            user.getEmail()
        );
    }

    public static User mapToUser(UserDTO userDTO){
        return new User(
            userDTO.getId(),
            userDTO.getUsername(),
            userDTO.getSpotifyAccount(),
            userDTO.getEmail()
        );
    }

    
    
}
