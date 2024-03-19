package com.example.beatblendr.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.beatblendr.dto.UserDTO;
import com.example.beatblendr.service.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO){
        UserDTO savedUser = userService.createUser(userDTO);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        
    }

    //add more controller methods for the user.
    //Some of these can just go in the UserRepository because of how awesome JPA is

    //Get user by ID

    //Get all users

    //Edit user by ID

    //Delete user by ID
    
}
