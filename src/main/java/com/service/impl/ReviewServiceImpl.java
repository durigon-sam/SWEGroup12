package com.service.impl;

import org.springframework.stereotype.Service;

import com.dto.ReviewDTO;
import com.dto.UserDTO;
import com.entity.Review;
import com.entity.User;
import com.mapper.ReviewMapper;
import com.mapper.UserMapper;
import com.repository.ReviewRepository;
import com.repository.UserRepository;
import com.service.ReviewService;
import com.service.UserService;

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


}
