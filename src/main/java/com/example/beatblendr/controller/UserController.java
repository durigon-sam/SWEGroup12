package com.example.beatblendr.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.beatblendr.dto.UserDTO;
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
public class UserController {

    @Autowired
    private UserService userService;
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO){
        UserDTO savedUser = userService.createUser(userDTO);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        
    }

    //add more controller methods for the user.
    //Some of these can just go in the UserRepository because of how awesome JPA is

    //Get user by Email
    @GetMapping
    public ResponseEntity<UserDTO> getUser(@RequestBody UserDTO userDTO){
        UserDTO savedUser = (UserDTO) userService.findByEmail(userDTO.getEmail());
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    //Get all users
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        List<User> users = userService.findAll();
        List<UserDTO> foundUsers = users.stream().map(
            (User) -> UserMapper.mapToUserDTO(User))
            .collect(Collectors.toList()
        );
        return ResponseEntity.ok(foundUsers);
    }
    //Edit user by ID

    //Delete user by ID
    
}
