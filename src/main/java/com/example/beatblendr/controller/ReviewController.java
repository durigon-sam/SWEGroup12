package com.example.beatblendr.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
@CrossOrigin(origins = "https://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@RequestBody ReviewDTO reviewDTO){
        ReviewDTO savedReview = reviewService.createReview(reviewDTO);

        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
        
    }

    @GetMapping("{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable("id") long id){
        ReviewDTO savedReview = reviewService.findByReviewId(id);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }
    //Get all users
    @GetMapping("")
    public ResponseEntity<List<ReviewDTO>> getAllReviews(){
        List<ReviewDTO> reviews = reviewService.findAll();
        return ResponseEntity.ok(reviews);
    }
    //Edit user by ID
    @PutMapping("{id}")
    public ResponseEntity<ReviewDTO> updateReview(@PathVariable("id") long id,
                                              @RequestBody ReviewDTO updatedReviewDTO){
        ReviewDTO reviewDTO = reviewService.updateReview(id, updatedReviewDTO);
        return ResponseEntity.ok(reviewDTO);
    }
    //Delete user by ID
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteReview(@PathVariable("id") Long id){
        
        reviewService.deleteReview(id);
        return ResponseEntity.ok("Review Deleted Succesfully");
    }

    //Delete Review by ID
    @GetMapping("/spotifyId/{spotifyId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsBySpotifyId(@PathVariable("spotifyId") String spotifyId){
        
        List<ReviewDTO> foundReviews = reviewService.findBySpotifyId(spotifyId);
        return ResponseEntity.ok(foundReviews);
    }

    @GetMapping("/averageRating/{spotifyId}")
    public ResponseEntity<Double> getAverageRating(@PathVariable("spotifyId") String spotifyId){
        

        return ResponseEntity.ok(reviewService.getAverageRating(spotifyId));
    }
}
