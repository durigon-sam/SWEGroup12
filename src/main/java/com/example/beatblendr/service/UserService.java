package com.example.beatblendr.service;

import java.util.List;

import com.example.beatblendr.dto.UserDTO;
import com.example.beatblendr.entity.User;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    List<UserDTO> findByEmail(String email);
    List<User> findAll();
    
}
