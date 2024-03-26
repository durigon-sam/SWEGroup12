package com.example.beatblendr.entity;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
	private String userId;

    @Column(name = "album_id", nullable = false)
	private String albumId;

    @Column(name = "rating")
    private Long rating;

    @Column(name = "description")
    private String description;
	
}
