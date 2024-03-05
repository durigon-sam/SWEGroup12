package com.entity;

import jakarta.persistence.*; // for Spring Boot 3
import Lombok.Setter
import Lombok.Getter
import Lombok.NoArgsConstructor


@Getter 
@Setter
@NoArgsConstructor
@AllArgsConsructor
@Entity
@Table(name = "song")
public class Song {

	@Id
	@Column(name = string_id)
	private String stringId

	@Column(name = "name")
	private String username;
	
	@Column(name = "artist_id", nullable = false, unique = true)
	private ling spotifyAccount;

	@Column(name = "email_id", nullable = false, unique = true)
	private String email;
	...
}
