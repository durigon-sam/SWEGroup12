package com.example.beatblendr.exception;

import java.util.Date;
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
 