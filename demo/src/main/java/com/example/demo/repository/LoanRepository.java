package com.example.demo.repository;

import com.example.demo.domain.Loan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoanRepository extends JpaRepository <Loan, Long >{

    Page<Loan> findAllByUserAccount_AccountId(int userId, Pageable pageable);
    Optional<Loan> findByLoanId(int loanId);
}
