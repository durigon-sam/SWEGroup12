package com.example.beatblendr.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.example.beatblendr.dto.ReviewDTO;
import com.example.beatblendr.dto.UserDTO;
import com.example.beatblendr.entity.Review;
import com.example.beatblendr.entity.User;
import com.example.beatblendr.exception.DuplicateFriendException;
import com.example.beatblendr.exception.UserNotFoundException;
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
    public UserDTO findBySpotifyId(String spotifyId) {
        
        for(UserDTO u: findAll()){
            if(u.getSpotifyId().equals(spotifyId)){
                UserDTO userDTO = UserMapper.mapToUserDTO(userRepository.findBySpotifyId(spotifyId));
                return userDTO;

            }
        }
        throw new UserNotFoundException(spotifyId);
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
        
        User user = userRepository.findById(id).get(0);
        user.setId(updatedUserDTO.getId());
        user.setEmail(updatedUserDTO.getEmail());
        user.setUsername(updatedUserDTO.getUsername());
        user.setAccessToken(updatedUserDTO.getAccessToken());
        user.setRefreshToken(updatedUserDTO.getRefreshToken());
        user.setFriends(updatedUserDTO.getFriends());
        user.setReviews(updatedUserDTO.getReviews());
        user.setSongs(updatedUserDTO.getSongs());


     
        User updatedUser = userRepository.save(user);
        return UserMapper.mapToUserDTO(updatedUser);
    }

    @Override
    public UserDTO findById(long id) {
       User user = userRepository.findById(id).get(0);
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

       for(User u: foundUser.getFriends()){
            if(u.getId()==addedFriend.getId()){
                throw new DuplicateFriendException("null"); 
            }
       }
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

    @Override
    public List<Review> getReviews(UserDTO userDTO) {
        User user = UserMapper.mapToUser(userDTO);

        return user.getReviews();

    }

    @Override
    public UserDTO findByAccessToken(String accessToken) {

        for(UserDTO u: findAll()){
            if(u.getAccessToken().equals(accessToken)){
                UserDTO userDTO = UserMapper.mapToUserDTO(userRepository.findByAccessToken(accessToken));
                return userDTO;

            }
        }
        throw new UserNotFoundException("User Not Found");
    }

    @Override
    public void deleteFriend(UserDTO userDTO, UserDTO userFriendDto) {

        User foundUser = UserMapper.mapToUser(userDTO);
        User deleteFriend = UserMapper.mapToUser(userFriendDto);

        List<User> updatedList = new ArrayList<>();
        for(User u: foundUser.getFriends()){
            if(u.getId()!=deleteFriend.getId()){
                updatedList.add(u);
            }
        }
        foundUser.setFriends(updatedList);
        userRepository.save(foundUser);
    
    }



}
