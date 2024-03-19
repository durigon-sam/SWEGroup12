package com.entity;


import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
// import javax.persistence.*; // for Spring Boot 2
import jakarta.persistence.Table; // for Spring Boot 3
import lombok.Lombok;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Getter 
@Setter
@NoArgsConstructor
@AllArgsConstructor

@EnableAutoConfiguration
@Entity
@Table(name = "songs")

public class Song {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "spotify_id", nullable = false)
	private String spotifyId;

    @Column(name = "song_name", nullable = false)
	private String songName;
	
	@Column(name = "album_name", nullable = false)
	private String albumName;

	@Column(name = "artist_name", nullable = false)
    private String artistName;

    @Column(name = "rating")
    private Long rating;
	
}
