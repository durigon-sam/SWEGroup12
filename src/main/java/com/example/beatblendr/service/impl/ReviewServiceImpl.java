package com.example.beatblendr.service.impl;

import org.springframework.stereotype.Service;
import com.example.beatblendr.dto.ReviewDTO;
import com.example.beatblendr.entity.Review;
import com.example.beatblendr.mapper.ReviewMapper;
import com.example.beatblendr.repository.ReviewRepository;
import com.example.beatblendr.service.ReviewService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private ReviewRepository reviewRepository;

    @Override
    public ReviewDTO createReview(ReviewDTO reviewDTO) {
        

        Review review = ReviewMapper.mapToReview(reviewDTO);
        Review savedReview = reviewRepository.save(review);
        return ReviewMapper.mapToReviewDTO(savedReview);
    }

    @Override
    public ReviewDTO findById(Long id) {
    
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }


}
