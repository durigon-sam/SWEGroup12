package com.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dto.ReviewDTO;
import com.dto.UserDTO;
import com.service.ReviewService;
import com.service.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@RestController
@RequestMapping("api/Review")
public class ReviewController {

    private ReviewService ReviewService;

    @PostMapping
    public ResponseEntity<ReviewDTO> createUser(@RequestBody ReviewDTO reviewDTO){
        ReviewDTO savedReview = ReviewService.createReview(reviewDTO);

        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
        
    }

    //add more controller methods for the user.
    //Some of these can just go in the UserRepository because of how awesome JPA is

    //Get user by ID

    //Get all users

    //Edit user by ID

    //Delete user by ID
    
}
