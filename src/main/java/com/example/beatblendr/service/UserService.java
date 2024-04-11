package com.example.beatblendr.service;

import java.util.List;

import com.example.beatblendr.dto.ReviewDTO;
import com.example.beatblendr.dto.UserDTO;
import com.example.beatblendr.entity.Review;
import com.example.beatblendr.entity.User;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO findByEmail(String email);
    UserDTO findBySpotifyId(String spotifyId);
    List<UserDTO> findAll();
    UserDTO updateUser(long id, UserDTO userDTO);
    UserDTO findById(long id);
    void deleteUser(Long id);
    // void insertOrUpdateUserDetails(se.michaelthelin.spotify.model_objects.specification.User user, String accessToken,
    //         String refreshToken);
    void addFriend(UserDTO user, UserDTO friend);
    UserDTO findByUsername(String username);
    List<User> getFriends(UserDTO user);
    List<Review> getReviews(UserDTO user);
    
}
