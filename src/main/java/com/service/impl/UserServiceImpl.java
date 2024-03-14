package com.service.impl;

import org.springframework.stereotype.Service;

import com.dto.UserDTO;
import com.entity.User;
import com.mapper.UserMapper;
import com.repository.UserRepository;
import com.service.UserService;

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
