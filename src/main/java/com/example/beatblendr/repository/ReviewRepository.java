package com.example.beatblendr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.beatblendr.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
}
