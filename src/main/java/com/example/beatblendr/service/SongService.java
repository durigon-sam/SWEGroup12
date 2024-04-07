package com.example.beatblendr.service;

import java.util.List;

import com.example.beatblendr.dto.ReviewDTO;
import com.example.beatblendr.dto.SongDTO;

public interface SongService {
    SongDTO createSong(SongDTO songDTO);
    SongDTO findBySongId(long id);
    List<SongDTO> findAll();
    SongDTO updateSong(long id, SongDTO updatedSongDTO);
    void deleteSong(Long id);
    
}
