package com.example.demo.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer accountId;

    private String name;

    private String email;

    private String phone_number;

    private String password;

    private String bank_routing;

    private String bank_account_number;

    private boolean admin;

    @OneToMany(mappedBy = "userAccount")
    @JsonIgnore
    private List<Loan> loans = new ArrayList<>();
}
