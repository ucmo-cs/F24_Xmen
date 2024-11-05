package com.example.demo.repository;

import com.example.demo.domain.Account;
import com.example.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByEmail(String email);
    Optional<User> findByAccountId(int userId);
}
