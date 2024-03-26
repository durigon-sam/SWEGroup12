package com.example.beatblendr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.beatblendr.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    List<User> findByEmail(String email);
    List<User> findAll();
     
}
