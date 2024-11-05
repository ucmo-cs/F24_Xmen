package com.example.demo.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long account_id;

    private int user_type;
    private String userId;
    private String userName;
    private String password;
    private String email;
    private String phoneNumber;

    private Timestamp created_at;

    //@OneToMany(mappedBy = "user_account")
    //@JsonIgnore
    //private List<Loan>  loans = new ArrayList<>();


}
