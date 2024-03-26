package com.example.beatblendr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.beatblendr.entity.Song;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    
}
