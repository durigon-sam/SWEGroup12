package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Review;
import com.entity.Song;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
}
