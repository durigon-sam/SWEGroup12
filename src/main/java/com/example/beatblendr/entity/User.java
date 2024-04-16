package com.example.beatblendr.entity;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table; // for Spring Boot 3
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
@Table(name = "users", schema = "beatblendr")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "username", unique = true)
	private String username;
	

	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@Column(name = "access_token", nullable = false)
	private String accessToken;

	@Column(name = "refresh_token", nullable = false)
	private String refreshToken;

	@JsonIgnore
	@OneToMany(mappedBy ="user")
	private List<Review> reviews; 

	@JsonIgnore
	@OneToMany(mappedBy ="user")
	private List<Song> songs; 

	@JsonIgnore
	@OneToMany
	@JoinTable(name="friends", schema = "beatblendr")
	@JoinColumn(name="person_A_id", referencedColumnName="id")
	@JoinColumn(name="person_B_id", referencedColumnName="id")
	private List<User> friends;
}
