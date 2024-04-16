package com.example.beatblendr.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.PropertyValueException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import com.example.beatblendr.dto.ReviewDTO;
import com.example.beatblendr.dto.UserDTO;
import com.example.beatblendr.entity.Review;
import com.example.beatblendr.entity.User;
import com.example.beatblendr.exception.NoRatingException;
import com.example.beatblendr.exception.ReviewExistsException;
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
        
        User user = userRepository.findByUsername(reviewDTO.getUser().getUsername()).get(0);
        List<Review> updatedReviews = user.getReviews();

        if(reviewDTO.getRating()==null){
            throw new NoRatingException("Please enter a rating:");
        }

        for(Review r: updatedReviews){
            if(r.getSpotifyId() .equals(reviewDTO.getSpotifyId())){
                throw new ReviewExistsException("You have previously reviewed this entity.");
            }
        }
        
        Review review = ReviewMapper.mapToReview(reviewDTO);
        
        Review savedReview = reviewRepository.save(review);        
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
        return 2.0;
    }
	// @Override
	// public ReviewDTO getReviewByUser(String spotifyId, Long userId) {
		
    //     r
	//         double sum = 0;
    //     for(ReviewDTO r: foundReviewDTOs){
    //         sum +=r.getRating();

    //     }
    //     System.out.println(sum);
    //     System.out.println(foundReviewDTOs.size());
    //     return sum/foundReviewDTOs.size();

        
    // }

    @Override
    public ReviewDTO getReviewByUser(String spotifyId, Long userId){
        return null;
    }


}
