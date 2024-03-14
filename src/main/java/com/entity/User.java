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
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "username")
	private String username;
	
	@Column(name = "spotify_account", nullable = false, unique = true)
	private String spotifyAccount;

	@Column(name = "email_id", nullable = false, unique = true)
	private String email;
}
