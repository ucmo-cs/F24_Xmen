package com.example.demo.controller;

import com.example.demo.domain.Account;
import com.example.demo.domain.Loan;
import com.example.demo.dto.AccountDto;
import com.example.demo.dto.LoanDto;
import com.example.demo.service.AccountService;
import com.example.demo.service.LoanService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@AllArgsConstructor
@RestController
public class LoanController {

    private final LoanService loanService;

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/loan")
    public ResponseEntity<?> save(@RequestBody LoanDto loanDto) {

        System.out.println("Loan amount :" + loanDto.getLoan_origin_amount());
        System.out.println("Interest rate :" + loanDto.getInterest_rate());

        Loan loan = new ModelMapper().map(loanDto, Loan.class);
        loan.setCreated_at(new Timestamp(System.currentTimeMillis()));

        int userId = 2;
        //accountId
        //userId
        //String email = "test@email.com";
        return new ResponseEntity<>(loanService.create(loan, userId), HttpStatus.CREATED);

    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/loans")
    public ResponseEntity<?> findAll(HttpSession session){
        System.out.println(session.getAttribute("userId"));
        Integer userId = (Integer) session.getAttribute("userId");

        if(userId == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(loanService.findByUserId(userId), HttpStatus.OK);
    }




}
