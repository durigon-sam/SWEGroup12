package com.example.beatblendr.mapper;

import com.example.beatblendr.dto.SongDTO;
import com.example.beatblendr.entity.Song;

public class SongMapper {

    public static SongDTO mapToSongDTO(Song song){
        return new SongDTO(
            song.getId(),
            song.getSpotifyId(),
            song.getSongName(),
            song.getAlbumName(),
            song.getArtistName(),
            song.getRating()
        );
    }

    public static Song mapToSong(SongDTO songDTO){
        return new Song(
            songDTO.getId(),
            songDTO.getSpotifyId(),
            songDTO.getSongName(),
            songDTO.getAlbumName(),
            songDTO.getArtistName(),
            songDTO.getRating()
        );
    }

    
    
}
