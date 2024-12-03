package com.example.demo.controller;

import com.example.demo.domain.Loan;
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

    // POST Function to save loans using LoanDTO
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/loan")
    public ResponseEntity<?> save(@RequestBody LoanDto loanDto) {
        // Create loan variable using passed in LoanDTO and set created at variable to current time
        Loan loan = new ModelMapper().map(loanDto, Loan.class);
        loan.setCreated_at(new Timestamp(System.currentTimeMillis()));

        // Check if input for current amount was given and set current amount to origin amount if false
        if(loanDto.getLoan_current_amount() == null)
            loan.setLoan_current_amount(loan.getLoan_origin_amount());

        // Initialize userId variable
        int userId;

        // Check if an email was entered and if that email has an account associated with it
        // If either return false, then return an error saying User not found
        if(loanDto.getUser_email() != null)
            if(userRepository.findByEmail(loanDto.getUser_email()) != null)
                userId = userRepository.findByEmail(loanDto.getUser_email()).getAccountId();
            else
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);

        // Create the loan and return a created status
        return new ResponseEntity<>(loanService.create(loan, userId), HttpStatus.CREATED);

    }

    // GET Function to return all the loans associated to the user in the system using the page system
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/loans")
    public ResponseEntity<?> findAll(
            HttpSession session,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        // Get userId from session
        Integer userId = (Integer) session.getAttribute("userId");

        // Check if the userId is null and return an unauthorized error if true
        if(userId == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Return loans using findByUserId funciton in loanService and OK status message
        return new ResponseEntity<>(loanService.findByUserId(userId, page, size), HttpStatus.OK);
    }

    // GET Function that returns all loans in the system regardless of user using the page system
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/allLoans")
    public Page<Loan> getAllLoans(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        // Create a pageable object using the page and size variables passed in
        Pageable pageable = PageRequest.of(page, size);

        // Return the loans using the findAll method in loanRepository
        return loanRepository.findAll(pageable);
    }

    // GET Function that returns a specific loan
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/loan/{loanId}")
    public @ResponseBody Loan getLoanById(@PathVariable Integer loanId) {
        // Return a specific loan using passed in loanId variable or null if not found
        return loanRepository.findByLoanId(loanId).orElse(null);
    }

    // PUT Function that edits a loan's auto-pay
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PutMapping(path = "/loanEdit")
    public ResponseEntity<?> updateLoanAutoPay(
            @RequestParam Integer loanId,
            @RequestParam float autoPayAmount) {
        // Create a loan using findByLoanId in loanRepository or null
        Loan loan = loanRepository.findByLoanId(loanId).orElse(null);

        // If loan is null return error message
        if (loan == null) {
            return new ResponseEntity<>("Loan not found", HttpStatus.NOT_FOUND);
        }

        // Set the loan auto-pay to a stringified version of the passed in autoPayAmount
        loan.setLoan_auto_pay(String.valueOf(autoPayAmount));

        // Save loan to repository
        loanRepository.save(loan);

        // Return OK status and success message
        return new ResponseEntity<>("Loan updated successfully", HttpStatus.OK);
    }
}
