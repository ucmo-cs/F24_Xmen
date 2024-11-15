package com.example.demo.controller;

import com.example.demo.domain.Loan;
import com.example.demo.dto.LoanDto;
import com.example.demo.repository.LoanRepository;
import com.example.demo.repository.UserRepository;
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
    private final LoanRepository loanRepository;
    private final UserRepository userRepository;

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/loan")
    public ResponseEntity<?> save(@RequestBody LoanDto loanDto) {

        System.out.println("Loan amount :" + loanDto.getLoan_origin_amount());
        System.out.println("Interest rate :" + loanDto.getInterest_rate());

        Loan loan = new ModelMapper().map(loanDto, Loan.class);
        loan.setCreated_at(new Timestamp(System.currentTimeMillis()));

        if(loanDto.getLoan_current_amount() == null)
            loan.setLoan_current_amount(loan.getLoan_origin_amount());

        int userId;

        if(loanDto.getUser_email() != null)
            if(userRepository.findByEmail(loanDto.getUser_email()) != null)
                userId = userRepository.findByEmail(loanDto.getUser_email()).getAccountId();
            else
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
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


    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/allLoans")
    public @ResponseBody Iterable<Loan> getAllLoans() {
        // This returns a JSON or XML with the users
        return loanRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/loan/{loanId}")
    public @ResponseBody Loan getLoanById(@PathVariable Integer loanId) {
        // This returns a JSON or XML with the users
        return loanRepository.findByLoanId(loanId).orElse(null);
    }

}
