package com.example.beatblendr.exception;

public class NoReviewForUserException extends RuntimeException {
    
    public NoReviewForUserException(String msg){
        super(msg);
    }
}
