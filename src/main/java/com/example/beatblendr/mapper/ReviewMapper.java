package com.example.beatblendr.mapper;

import com.example.beatblendr.dto.ReviewDTO;
import com.example.beatblendr.entity.Review;

public class ReviewMapper {

    public static ReviewDTO mapToReviewDTO(Review review){
        return new ReviewDTO(
            review.getId(),
            review.getUserId(),
            review.getAlbumId(),
            review.getRating(),
            review.getDescription()
        );
    }

    public static Review mapToReview(ReviewDTO reviewDTO){
        return new Review(
            reviewDTO.getId(),
            reviewDTO.getUserId(),
            reviewDTO.getAlbumId(),
            reviewDTO.getRating(),
            reviewDTO.getDescription()
        );
    }

    
    
}
