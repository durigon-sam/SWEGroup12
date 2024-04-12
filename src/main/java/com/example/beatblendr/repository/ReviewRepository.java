package com.example.beatblendr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.beatblendr.entity.Review;
import com.example.beatblendr.entity.User;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Review findByReviewId(long id);
    List<Review> findBySpotifyId(String spotifyId);
    

        
}
