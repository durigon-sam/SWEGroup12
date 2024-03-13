package com.entity;

import jakarta.persistence.*; // for Spring Boot 3
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter 
@Setter
@NoArgsConstructor

@Entity
@Table(name = "song")
public class Song {

	@Id
	@Column(name = "string_id")
	private String stringId;

	@Column(name = "name")
	private String username;
	
	@Column(name = "artist_id", nullable = false, unique = true)
	private long spotifyAccount;

	@Column(name = "email_id", nullable = false, unique = true)
	private String email;
}
