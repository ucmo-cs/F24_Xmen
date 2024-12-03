package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.dto.UserDTO;
import com.example.demo.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    private final UserRepository userRepository;
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Post Function that adds a new user using passed in UserDTO variable
    @PostMapping(path = "/add")
    public @ResponseBody String addNewUser(@RequestBody UserDTO userDTO) {
        // Create a new user variable
        User n = new User();

        // Set each user attribute with UserDTO attributes
        n.setName(userDTO.getName());
        n.setEmail(userDTO.getEmail());
        n.setPassword(userDTO.getPassword());
        n.setPhone_number(userDTO.getPhone_number());
        n.setAdmin(userDTO.getAdmin());

        // Defaults bank info to empty since the user needs to set up on their end
        n.setBank_routing("");
        n.setBank_account_number("");

        // Save user and return message
        userRepository.save(n);
        return "Saved";
    }

    // PUT Function that edits a user
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PutMapping(path = "/edit")
    public @ResponseBody String editUser(@RequestBody UserDTO userDTO, HttpSession session) {
        // Get the userId using session
        Integer userId = (Integer) session.getAttribute("userId");

        // Check if userId is null and return an error if true
        if (userId == null) {
            return "User not found";
        }

        // Find the user using findByAccountId in userRepository and return an error if none is found
        User user = userRepository.findByAccountId(userId).orElse(null);
        if (user == null) {
            return "User not found";
        }

        // Set all the user's attributes using userDTO's attributes
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPhone_number(userDTO.getPhone_number());
        user.setBank_routing(userDTO.getBank_routing());
        user.setBank_account_number(userDTO.getBank_account_number());

        // Save user and return message
        userRepository.save(user);
        return "Edit Successful";
    }

    // POST Function that logs a user in using session
    @PostMapping(path = "/login")
    public @ResponseBody String loginUser(@RequestBody UserDTO userDTO, HttpSession session) {
        // Find user using findByEmail in userRepository and userDTO
        User user = userRepository.findByEmail(userDTO.getEmail());

        // Check if user exists and if password matches
        if (user != null && user.getPassword().equals(userDTO.getPassword())) {
            // Set session attributes for userId and admin and return a success message
            session.setAttribute("userId", user.getAccountId());
            session.setAttribute("admin", user.isAdmin());
            return "Login Successful";
        } else {
            return "Invalid username or password";
        }
    }

    // POST Function to log a user out
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping(path = "/logout")
    public @ResponseBody String logoutUser(HttpSession session) {
        // Invalidate the session and return a success message
        session.invalidate();
        return "Logout Successful";
    }

    // GET Function that returns a user by userId
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/account")
    public @ResponseBody User getUserById(HttpSession session) {
        // Get the userId using session
        Integer userId = (Integer) session.getAttribute("userId");

        // Check if userId is null and return null if true
        if (userId == null) {
            return null;
        }

        // Get user using findById in userRepository or null if not found
        return userRepository.findById(userId).orElse(null);
    }

    // GET Function that checks if the user is an admin
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/checkAdmin")
    public @ResponseBody boolean checkAdmin(HttpSession session) {
        // Return the admin attribute from session as a boolean value
        return (Boolean) session.getAttribute("admin");
    }
}