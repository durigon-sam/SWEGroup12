package com.example.beatblendr.service;

import java.util.List;
import com.example.beatblendr.dto.ReviewDTO;

public interface ReviewService {
    ReviewDTO createReview(ReviewDTO reviewDTO);
    ReviewDTO findByReviewId(long id);
    List<ReviewDTO> findAll();
    ReviewDTO updateReview(long id, ReviewDTO updatedReviewDTO);
    void deleteReview(Long id);
    List<ReviewDTO> findBySpotifyId(String spotifyId);
    double getAverageRating(String spotifyId);
    ReviewDTO getReviewByUser(String spotifyId, long userId);
    
}
