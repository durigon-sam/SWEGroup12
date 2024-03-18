package com.mapper;

import com.dto.SongDTO;
import com.dto.UserDTO;
import com.entity.Song;
import com.entity.User;

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
