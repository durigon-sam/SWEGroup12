package com.example.beatblendr.exception;

public class OversizedDescriptionException extends RuntimeException{

    public OversizedDescriptionException(String msg){
        super(msg);
    }
}
