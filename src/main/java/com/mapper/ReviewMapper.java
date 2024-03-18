package com.mapper;

import com.dto.SongDTO;
import com.dto.ReviewDTO;
import com.entity.Review;
import com.entity.Song;
import com.entity.User;

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
