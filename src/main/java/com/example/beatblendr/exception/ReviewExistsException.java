package com.example.beatblendr.exception;

public class ReviewExistsException extends RuntimeException {
    
    public ReviewExistsException(String msg){
        super(msg);
    }

}
