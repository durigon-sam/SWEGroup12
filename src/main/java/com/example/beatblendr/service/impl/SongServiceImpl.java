package com.example.beatblendr.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.beatblendr.dto.SongDTO;
import com.example.beatblendr.entity.Song;
import com.example.beatblendr.mapper.SongMapper;
import com.example.beatblendr.repository.SongRepository;
import com.example.beatblendr.service.SongService;
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
