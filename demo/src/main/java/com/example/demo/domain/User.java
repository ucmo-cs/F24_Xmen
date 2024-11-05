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
@Entity // This tells Hibernate to make a table out of this class
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

    @OneToMany(mappedBy = "user_account")
    @JsonIgnore
    private List<Loan> loans = new ArrayList<>();
}
