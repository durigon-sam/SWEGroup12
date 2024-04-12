package com.example.beatblendr.mapper;

import com.example.beatblendr.dto.SongDTO;
import com.example.beatblendr.entity.Song;

public class SongMapper {

    public static SongDTO mapToSongDTO(Song song){
        return new SongDTO(
            song.getSongId(),
            song.getSpotifyId(),
            song.getSongName(),
            song.getAlbumName(),
            song.getArtistName(),
            song.getImage(),
            song.getRating(),
            song.getUser()
        );
    }

    public static Song mapToSong(SongDTO songDTO){
        return new Song(
            songDTO.getId(),
            songDTO.getSpotifyId(),
            songDTO.getSongName(),
            songDTO.getAlbumName(),
            songDTO.getArtistName(),
            songDTO.getImage(),
            songDTO.getRating(),
            songDTO.getUser()
        );
    }

    
    
}
