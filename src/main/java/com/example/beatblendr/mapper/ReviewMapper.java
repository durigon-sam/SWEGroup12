package com.example.beatblendr.mapper;

import com.example.beatblendr.dto.ReviewDTO;
import com.example.beatblendr.entity.Review;

public class ReviewMapper {

    public static ReviewDTO mapToReviewDTO(Review review){
        return new ReviewDTO(
            review.getReviewId(),
            review.getSpotifyId(),
            review.getType(),
            review.getRating(),
            review.getDescription(),
            review.getUser()
        );
    }

    public static Review mapToReview(ReviewDTO reviewDTO){
        return new Review(
            reviewDTO.getId(),
            reviewDTO.getSpotifyId(),
            reviewDTO.getType(),
            reviewDTO.getRating(),
            reviewDTO.getDescription(),
            reviewDTO.getUser()
            
        );
    }

    
    
}
