package com.example.beatblendr.entity;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
@Table(name = "songs", schema = "beatblendr")

public class Song {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long songId;

	@Column(name = "spotify_id", nullable = false)
	private String spotifyId;

    @Column(name = "song_name", nullable = false)
	private String songName;
	
	@Column(name = "album_name", nullable = false)
	private String albumName;

	@Column(name = "artist_name", nullable = false)
    private String artistName;

	@Column(name = "album_image")
	private String image;

    @Column(name = "rating")
    private Long rating;

	@ManyToOne
    @JoinColumn(name = "id")
    private User user;

}
