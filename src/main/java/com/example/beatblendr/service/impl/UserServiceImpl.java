package com.example.beatblendr.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
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

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        

            User user = UserMapper.mapToUser(userDTO);
            User savedUser = userRepository.save(user);

        return UserMapper.mapToUserDTO(savedUser);
    }

    @Override
    public UserDTO findByEmail(String email) {
        
        List<User> users = userRepository.findByEmail(email);
        List<UserDTO> foundUsers = users.stream().map(
            (user) -> UserMapper.mapToUserDTO(user))
            .collect(Collectors.toList()
        );
        return foundUsers.get(0);
    }
    @Override
    public List<UserDTO> findAll() {
        
        List<User> users = userRepository.findAll();
        List<UserDTO> savedUsers = users.stream().map(
            (user) -> UserMapper.mapToUserDTO(user))
            .collect(Collectors.toList()
        );
        return savedUsers;
    }
    @Override
    public UserDTO updateUser(long id, UserDTO updatedUserDTO){
        
        User user = userRepository.findById(id);
        user.setEmail(updatedUserDTO.getEmail());
        user.setId(updatedUserDTO.getId());
        user.setSpotifyId(updatedUserDTO.getSpotifyId());
        user.setUsername(updatedUserDTO.getUsername());
     
        User updatedUser = userRepository.save(user);
        return UserMapper.mapToUserDTO(updatedUser);
    }

    @Override
    public UserDTO findById(long id) {
       User user = userRepository.findById(id);
       UserDTO foundUser = UserMapper.mapToUserDTO(user);
        
        return foundUser;
    }
    @Override
    public UserDTO findBySpotifyId(String spotifyId) {
       User user = userRepository.findBySpotifyId(spotifyId);
       UserDTO foundUser = UserMapper.mapToUserDTO(user);
        
        return foundUser;
    }


    @Override
    public void deleteUser(Long id) {
        
        userRepository.deleteById(id);
        
    }

    @Override
    public void addFriend(UserDTO user, UserDTO friend) {
        
       User foundUser = UserMapper.mapToUser(user);
       User addedFriend = UserMapper.mapToUser(friend);
       foundUser.getFriends().add(addedFriend);
       userRepository.save(foundUser);

    }

    @Override
    public UserDTO findByUsername(String username) {
        List<User> users = userRepository.findByUsername(username);
        List<UserDTO> foundUsers = users.stream().map(
            (user) -> UserMapper.mapToUserDTO(user))
            .collect(Collectors.toList()
        );
        return foundUsers.get(0);
    }

    @Override
    public List<User> getFriends(UserDTO userDTO) {
        User user = UserMapper.mapToUser(userDTO);
        
        return user.getFriends();
    }



}
