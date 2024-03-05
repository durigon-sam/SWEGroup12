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

    public static UserDTO mapToUserDTO(UserDTO userDTO){
        return new UserDTO(
            userDTO.getId(),
            userDTO.getUsername(),
            userDTO.getSpotifyAccount(),
            userDTO.getEmail()
        );
    }
    
}
