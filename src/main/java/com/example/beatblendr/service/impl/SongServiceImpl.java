package com.example.beatblendr.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.beatblendr.dto.ReviewDTO;
import com.example.beatblendr.dto.SongDTO;
import com.example.beatblendr.entity.Review;
import com.example.beatblendr.entity.Song;
import com.example.beatblendr.mapper.ReviewMapper;
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


    @Override
    public SongDTO findById(long id) {
        Song song = songRepository.findById(id);
        SongDTO foundSong = SongMapper.mapToSongDTO(song);
         
        return foundSong;
    }

    @Override
    public List<SongDTO> findAll() {
        List<Song> songs = songRepository.findAll();
        List<SongDTO> savedSongs = songs.stream().map(
            (song) -> SongMapper.mapToSongDTO(song))
            .collect(Collectors.toList()
        );
        return savedSongs;
    }

    @Override
    public SongDTO updateSong(long id, SongDTO updatedSongDTO) {
        Song song = songRepository.findById(id);

       song.setId(updatedSongDTO.getId());
       song.setSpotifyId(updatedSongDTO.getSpotifyId());
       song.setSongName(updatedSongDTO.getSongName());
       song.setAlbumName(updatedSongDTO.getAlbumName());
       song.setRating(updatedSongDTO.getRating());
       song.setArtistName(updatedSongDTO.getArtistName());
      

        Song updatedSong = songRepository.save(song);
        return SongMapper.mapToSongDTO(updatedSong);
    }

    @Override
    public void deleteSong(Long id) {

        songRepository.deleteById(id);
    }


   

}
