package com.example.beatblendr.controller;

import java.util.List;

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
import com.example.beatblendr.dto.SongDTO;
import com.example.beatblendr.service.SongService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "https://localhost:3000")
public class SongController {

    @Autowired
    private SongService songService;

    @PostMapping
    public ResponseEntity<SongDTO> createSong(@RequestBody SongDTO songDTO){
        SongDTO savedSong = songService.createSong(songDTO);

        return new ResponseEntity<>(savedSong, HttpStatus.CREATED);
        
    }

    @GetMapping("{id}")
    public ResponseEntity<SongDTO> getSongById(@PathVariable("id") long id){
        SongDTO savedSong = songService.findBySongId(id);
        return new ResponseEntity<>(savedSong, HttpStatus.CREATED);
    }
    //Get all users
    @GetMapping("")
    public ResponseEntity<List<SongDTO>> getAllSongs(){
        List<SongDTO> songs = songService.findAll();
        return ResponseEntity.ok(songs);
    }
    //Edit user by ID
    @PutMapping("{id}")
    public ResponseEntity<SongDTO> updateSong(@PathVariable("id") long id,
                                              @RequestBody SongDTO updatedSongDTO){
        SongDTO songDTO = songService.updateSong(id, updatedSongDTO);
        return ResponseEntity.ok(songDTO);
    }
    //Delete user by ID
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSong(@PathVariable("id") Long id){
        
        songService.deleteSong(id);
        return ResponseEntity.ok("Song Deleted Succesfully");
    }
    //add more controller methods for the user.
    //Some of these can just go in the UserRepository because of how awesome JPA is

    //Get user by ID

    //Get all users

    //Edit user by ID

    //Delete user by ID
    
}
