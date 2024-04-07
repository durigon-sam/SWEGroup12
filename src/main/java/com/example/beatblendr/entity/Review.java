package com.example.beatblendr.entity;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name = "reviews", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"spotifyId","id"})
})
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(name = "spotify_id")
	private String spotifyId;

    @Column(name = "type")
    private Long type;

    @Column(name = "rating")
    private Long rating;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "id")
    private User user;


}
