package com.example.demo.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanId;

    private String loan_origin_amount;
    private String interest_rate;
    private String loan_current_amount;
    private String loan_auto_pay;

    private Timestamp created_at;

    @ManyToOne
    @JoinColumn(name = "accountId")
    //@JsonIgnore
    private User userAccount;

}
