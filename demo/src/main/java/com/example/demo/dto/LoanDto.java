package com.example.demo.dto;

import lombok.Data;

@Data
public class LoanDto {

    private String loan_origin_amount;
    private String interest_rate;
    private String loan_current_amount;
    private String user_email;

}
