package com.example.beatblendr.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.example.beatblendr.dto.ReviewDTO;
import com.example.beatblendr.dto.UserDTO;
import com.example.beatblendr.entity.Review;
import com.example.beatblendr.entity.User;
import com.example.beatblendr.mapper.ReviewMapper;
import com.example.beatblendr.mapper.UserMapper;
import com.example.beatblendr.repository.ReviewRepository;
import com.example.beatblendr.repository.UserRepository;
import com.example.beatblendr.service.ReviewService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private ReviewRepository reviewRepository;
    private UserRepository userRepository;

    @Override
    public ReviewDTO createReview(ReviewDTO reviewDTO) {
        

        Review review = ReviewMapper.mapToReview(reviewDTO);
        Review savedReview = reviewRepository.save(review);
        User user = userRepository.findByUsername(reviewDTO.getUser().getUsername()).get(0);
        List<Review> updatedReviews = user.getReviews();
        updatedReviews.add(savedReview);
        user.setReviews(updatedReviews);
        userRepository.save(user);
        
        return ReviewMapper.mapToReviewDTO(savedReview);

    }

    @Override
    public List<ReviewDTO> findAll() {
        List<Review> reviews = reviewRepository.findAll();
        List<ReviewDTO> savedReviews = reviews.stream().map(
            (review) -> ReviewMapper.mapToReviewDTO(review))
            .collect(Collectors.toList()
        );
        return savedReviews;
    }

    @Override
    public ReviewDTO findByReviewId(long id) {
        Review review = reviewRepository.findByReviewId(id);
        ReviewDTO foundReview = ReviewMapper.mapToReviewDTO(review);
         
        return foundReview;
    
    }

    @Override
    public void deleteReview(Long id) {
        
        reviewRepository.deleteById(id);
        
    }

    @Override
    public ReviewDTO updateReview(long id, ReviewDTO updatedReviewDTO){
        Review review = reviewRepository.findByReviewId(id);

        review.setSpotifyId(updatedReviewDTO.getSpotifyId());
        review.setReviewId(updatedReviewDTO.getId());
        review.setRating(updatedReviewDTO.getId());
        review.setType(updatedReviewDTO.getType());
        review.setDescription(updatedReviewDTO.getDescription());
      

        Review updatedReview = reviewRepository.save(review);
        return ReviewMapper.mapToReviewDTO(updatedReview);
    }


    @Override
    public List<ReviewDTO> findBySpotifyId(String spotifyId) {

        List<Review> foundReviews = reviewRepository.findBySpotifyId(spotifyId);
        List<ReviewDTO> foundReviewDTOs = foundReviews.stream().map(
            (review) -> ReviewMapper.mapToReviewDTO(review))
            .collect(Collectors.toList()
        );
       
        return foundReviewDTOs;

        
    }

    @Override
    public double getAverageRating(String spotifyId) {

        List<Review> foundReviews = reviewRepository.findBySpotifyId(spotifyId);
        List<ReviewDTO> foundReviewDTOs = foundReviews.stream().map(
            (review) -> ReviewMapper.mapToReviewDTO(review))
            .collect(Collectors.toList()
        );
        double sum = 0;
        for(ReviewDTO r: foundReviewDTOs){
            sum +=r.getRating();

        }
        System.out.println(sum);
        System.out.println(foundReviewDTOs.size());
        return sum/foundReviewDTOs.size();

        
    }


}
