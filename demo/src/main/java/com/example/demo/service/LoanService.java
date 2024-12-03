package com.example.demo.service;


import com.example.demo.domain.Loan;
import com.example.demo.repository.LoanRepository;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@AllArgsConstructor
@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final UserRepository userRepository;

    // Function that creates a loan
    @Transactional
    public Loan create(Loan loan, int userId){
        userRepository.findByAccountId(userId).ifPresent(loan::setUserAccount);
        return loanRepository.save(loan);
    }

    // Function that finds a loan by the userId
    @Transactional(readOnly = true)
    public Page<Loan> findByUserId(int userId, int page, int size) {
        Page<Loan> loans = loanRepository.findAllByUserAccount_AccountId(userId, PageRequest.of(page, size));
        return ResponseEntity.ok(loans).getBody();
    }

}
