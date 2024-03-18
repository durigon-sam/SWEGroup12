package com.example.beatblendr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.beatblendr.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
}
