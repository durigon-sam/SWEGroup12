package com.example.beatblendr.exception;


import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
public class ApiExceptionHandler {
    
    @ExceptionHandler(value = ReviewExistsException.class)
    public ResponseEntity<ApiException> handleReviewExistsException(){
    
    ApiException exception = new ApiException(400, "Review Already exists for this entity by this user", new Date());

    return new ResponseEntity<>(exception, HttpStatus.BAD_REQUEST);
    }  
    @ExceptionHandler(value = NoRatingException.class)
    public ResponseEntity<ApiException> handleNoRatingException(){
    
    ApiException exception = new ApiException(400, "Please Enter a Rating for this entity", new Date());

    return new ResponseEntity<>(exception, HttpStatus.BAD_REQUEST);
    } 
    @ExceptionHandler(value = NoReviewForUserException.class)
    public ResponseEntity<ApiException> handleNoReviewForUserException(){
    
    ApiException exception = new ApiException(400, "No Review Exists for this user", new Date());

    return new ResponseEntity<>(exception, HttpStatus.BAD_REQUEST);
}
@ExceptionHandler(value = UserNotFoundException.class)
public ResponseEntity<ApiException> handleUserNotFoundException(){

ApiException exception = new ApiException(400, "No User Exists with this SpotifyId", new Date());

return new ResponseEntity<>(exception, HttpStatus.BAD_REQUEST);
}
}



    

