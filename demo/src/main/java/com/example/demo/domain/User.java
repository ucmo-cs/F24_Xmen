package com.example.demo.domain;


import jakarta.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String name;

    private String email;

    private String phone_number;

    private String password;

    private String bank_routing;

    private String bank_account_number;



    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone_number() { return phone_number; }

    public void setPhone_number(String phone_number) { this.phone_number = phone_number; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getBank_routing() {
        return bank_routing;
    }

    public void setBank_routing(String bank_routing) {
        this.bank_routing = bank_routing;
    }

    public String getBank_account_number() {
        return bank_account_number;
    }

    public void setBank_account_number(String bank_account_number) {
        this.bank_account_number = bank_account_number;
    }

}
