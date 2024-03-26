package com.example.beatblendr.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.beatblendr.dto.ReviewDTO;
import com.example.beatblendr.dto.UserDTO;
import com.example.beatblendr.entity.Review;
import com.example.beatblendr.entity.User;
import com.example.beatblendr.mapper.ReviewMapper;
import com.example.beatblendr.mapper.UserMapper;
import com.example.beatblendr.service.ReviewService;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@RequestBody ReviewDTO reviewDTO){
        ReviewDTO savedReview = reviewService.createReview(reviewDTO);

        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
        
    }

    @GetMapping
    public ResponseEntity<ReviewDTO> getReview(@RequestBody ReviewDTO reviewDTO){
        ReviewDTO savedReview = (ReviewDTO) reviewService.findById(reviewDTO.getId());
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }
    //Get all users
    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getAllReviews(){
        List<Review> reviews = reviewService.findAll();
        List<ReviewDTO> foundReviews = reviews.stream().map(
            (Review) -> ReviewMapper.mapToReviewDTO(Review))
            .collect(Collectors.toList()
        );
        return ResponseEntity.ok(foundReviews);
    }


    //add more controller methods for the user.
    //Some of these can just go in the UserRepository because of how awesome JPA is
    
    //Get user by ID

    //Get all users

    //Edit user by ID

    //Delete user by ID
    
}
