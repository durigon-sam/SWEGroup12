package com.example.beatblendr.exception;


import java.util.Date;

import org.apache.hc.core5.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter 
public class ApiException{

    private final Integer errorCode;
    private final String errorDescription;
    private Date date; 
    
   
    

}
 