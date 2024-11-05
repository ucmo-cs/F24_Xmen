package com.example.demo.service;


import com.example.demo.domain.Account;
import com.example.demo.domain.Loan;
import com.example.demo.domain.User;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.LoanRepository;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@AllArgsConstructor
@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    @Transactional
    public Loan create(Loan loan, int userId){

        System.out.println("Service : Loan amount :" + loan.getLoan_origin_amount());
        System.out.println("Service : Interest rate :" + loan.getInterest_rate());

        userRepository.findByAccountId(userId).ifPresent(loan::setUser_account);
        return loanRepository.save(loan);
    }

    @Transactional(readOnly = true)
    public List<Loan> findAll(){
        return loanRepository.findAll();
    }



}
