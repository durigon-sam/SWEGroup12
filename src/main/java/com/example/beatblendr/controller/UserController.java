package com.example.beatblendr.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.beatblendr.dto.UserDTO;
import com.example.beatblendr.entity.Review;
import com.example.beatblendr.entity.User;
import com.example.beatblendr.mapper.UserMapper;
import com.example.beatblendr.repository.UserRepository;
import com.example.beatblendr.service.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO){
        UserDTO savedUser = userService.createUser(userDTO);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        
    }

    //Get user by Email
    @GetMapping("email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable("email") String email){
        UserDTO savedUser = (UserDTO) userService.findByEmail(email);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("accessToken/{accesstoken}")
    public ResponseEntity<UserDTO> getUserByAccessToken(@PathVariable("accesstoken") String accessToken){
        UserDTO savedUser = (UserDTO) userService.findByAccessToken(accessToken);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") long id){
        UserDTO savedUser = userService.findById(id);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    //Get all users
    @GetMapping("")
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        List<UserDTO> users = userService.findAll();
        return ResponseEntity.ok(users);
    }
    //Edit user by ID
    @PutMapping("{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable("id") long id,
                                              @RequestBody UserDTO updatedUserDTO){
        UserDTO userDTO = userService.updateUser(id, updatedUserDTO);
        return ResponseEntity.ok(userDTO);
    }
    //Delete user by ID
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
        
        userService.deleteUser(id);
        return ResponseEntity.ok("User Deleted Succesfully");
    }
    //Add friend id represents original and username represents friend added to his list of friends
    @PostMapping("friends/add/{id}/{username}")
    public ResponseEntity<String> addFriend(@PathVariable("id") Long id, @PathVariable("username") String username){

        UserDTO user = userService.findById(id);
        UserDTO friend = userService.findByUsername(username);

        userService.addFriend(user, friend);
        
        return ResponseEntity.ok("response");
    }

    @PutMapping("friends/delete/{id}/{idFriend}")
    public ResponseEntity<String> deleteFriend(@PathVariable("id") Long id, @PathVariable("idFriend") Long idFriend){

        UserDTO user = userService.findById(id);
        UserDTO friend = userService.findById(idFriend);

        userService.deleteFriend(user, friend);
        
        return ResponseEntity.ok("response");
    }

    
    @GetMapping("friends/{id}")
    public ResponseEntity<List<User>> getFriends(@PathVariable("id") Long id){

        UserDTO user = userService.findById(id);

        List<User> friends = userService.getFriends(user);
        
        return ResponseEntity.ok(friends);

}
    @GetMapping("reviews/{id}")
    public ResponseEntity<List<Review>> getReviews(@PathVariable("id") Long id){

        UserDTO user = userService.findById(id);

        List<Review> reviews = userService.getReviews(user);
        return ResponseEntity.ok(reviews);

    }
    @GetMapping("reviews#/{id}")
    public ResponseEntity<Integer> getNumberOfReview(@PathVariable("id") Long id){

        UserDTO user = userService.findById(id);

        List<Review> reviews = userService.getReviews(user);
        return ResponseEntity.ok(reviews.size());
    }
}
