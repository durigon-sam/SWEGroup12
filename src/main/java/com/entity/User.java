package com.entity;


// import javax.persistence.*; // for Spring Boot 2
import jakarta.persistence.*; // for Spring Boot 3
import lombok.Lombok;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Getter 
@Setter
@NoArgsConstructor


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
