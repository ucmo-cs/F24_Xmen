package com.example.demo.controller;

import com.example.demo.domain.Loan;
import com.example.demo.domain.User;
import com.example.demo.dto.LoanDto;
import com.example.demo.repository.LoanRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.LoanService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

        return new ResponseEntity<>(loanService.create(loan, userId), HttpStatus.CREATED);

    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/loans")
    public ResponseEntity<?> findAll(
            HttpSession session,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        System.out.println(session.getAttribute("userId"));
        Integer userId = (Integer) session.getAttribute("userId");

        if(userId == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(loanService.findByUserId(userId, page, size), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/allLoans")
    public Page<Loan> getAllLoans(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return loanRepository.findAll(pageable);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/loan/{loanId}")
    public @ResponseBody Loan getLoanById(@PathVariable Integer loanId) {
        // This returns a JSON or XML with the users
        return loanRepository.findByLoanId(loanId).orElse(null);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PutMapping(path = "/loanEdit")
    public ResponseEntity<?> updateLoanAutoPay(
            @RequestParam Integer loanId,
            @RequestParam float autoPayAmount) {
        Loan loan = loanRepository.findByLoanId(loanId).orElse(null);
        if (loan == null) {
            return new ResponseEntity<>("Loan not found", HttpStatus.NOT_FOUND);
        }
        loan.setLoan_auto_pay(String.valueOf(autoPayAmount));
        loanRepository.save(loan);
        return new ResponseEntity<>("Loan updated successfully", HttpStatus.OK);
    }
}
