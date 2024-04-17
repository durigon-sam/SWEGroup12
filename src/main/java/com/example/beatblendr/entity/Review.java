package com.example.beatblendr.entity;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table; // for Spring Boot 3
import jakarta.persistence.UniqueConstraint;
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
@Table(name = "reviews", schema = "beatblendr", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"spotifyId","id"})
})
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(name = "spotify_id",nullable = false)
	private String spotifyId;

    @Column(name = "type", nullable = false)
    private Long type;

    @Column(name = "rating", nullable = false)
    private Double rating;

    @Column(name = "description", length = 1000)
    private String description;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id")
    private User user;


}
