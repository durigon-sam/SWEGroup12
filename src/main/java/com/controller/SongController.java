package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dto.SongDTO;
import com.dto.UserDTO;
import com.service.SongService;
import com.service.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@RestController
@RequestMapping("api/song")
public class SongController {

    @Autowired
    private SongService songService;

    @PostMapping
    public ResponseEntity<SongDTO> createSong(@RequestBody SongDTO songDTO){
        SongDTO savedSong = songService.createSong(songDTO);

        return new ResponseEntity<>(savedSong, HttpStatus.CREATED);
        
    }

    //add more controller methods for the user.
    //Some of these can just go in the UserRepository because of how awesome JPA is

    //Get user by ID

    //Get all users

    //Edit user by ID

    //Delete user by ID
    
}
