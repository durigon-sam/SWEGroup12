package com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dto.SongDTO;
import com.dto.UserDTO;
import com.entity.Song;
import com.entity.User;
import com.mapper.SongMapper;
import com.mapper.UserMapper;
import com.repository.SongRepository;
import com.repository.UserRepository;
import com.service.SongService;
import com.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SongServiceImpl implements SongService{
    
    @Autowired
    private SongRepository songRepository;

    @Override
    public SongDTO createSong(SongDTO songDTO) {
        

        Song song = SongMapper.mapToSong(songDTO);
        Song savedSong = songRepository.save(song);
        return SongMapper.mapToSongDTO(savedSong);
    }

}
