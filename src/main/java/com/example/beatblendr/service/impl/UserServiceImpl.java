package com.example.beatblendr.service.impl;

import org.springframework.stereotype.Service;
import com.example.beatblendr.dto.UserDTO;
import com.example.beatblendr.entity.User;
import com.example.beatblendr.mapper.UserMapper;
import com.example.beatblendr.repository.UserRepository;
import com.example.beatblendr.service.UserService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = UserMapper.mapToUser(userDTO);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDTO(savedUser);
    }

}
