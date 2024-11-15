package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.dto.UserDTO;
import com.example.demo.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller	// This means that this class is a Controller
@RequestMapping(path="/user")// This means URL's start with /user (after Application path)
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    private final UserRepository userRepository;
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping(path = "/add") // Map ONLY POST Requests
    public @ResponseBody String addNewUser(@RequestBody UserDTO userDTO) {
        User n = new User();
        n.setName(userDTO.getName());
        n.setEmail(userDTO.getEmail());
        n.setPassword(userDTO.getPassword());
        n.setPhone_number(userDTO.getPhone_number());
        n.setBank_routing("");
        n.setBank_account_number("");
        n.setAdmin(userDTO.getAdmin());
        userRepository.save(n);
        return "Saved";
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PutMapping(path = "/edit")
    public @ResponseBody String editUser(@RequestBody UserDTO userDTO, HttpSession session) {
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            return "User not found";
        }

        User user = userRepository.findByAccountId(userId).orElse(null);
        if (user == null) {
            return "User not found";
        }

        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPhone_number(userDTO.getPhone_number());
        user.setBank_routing(userDTO.getBank_routing());
        user.setBank_account_number(userDTO.getBank_account_number());
        userRepository.save(user);

        return "Edit Successful";
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }

    // Updated loginUser method with LoginResponse
    @PostMapping(path = "/login")
    public @ResponseBody String loginUser(@RequestBody UserDTO userDTO, HttpSession session) {
        // Search for the user by email
        User user = userRepository.findByEmail(userDTO.getEmail());

        // Check if user exists and if password matches
        if (user != null && user.getPassword().equals(userDTO.getPassword())) {
            session.setAttribute("userId", user.getAccountId());
            session.setAttribute("admin", user.isAdmin());
            return "Login Successful";
        } else {
            return "Invalid username or password";
        }
    }


    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping(path = "/logout")
    public @ResponseBody String logoutUser(HttpSession session) {
        session.invalidate();
        return "Logout Successful";
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/account")
    public @ResponseBody User getUserById(HttpSession session) {
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            return null;
        }

        return userRepository.findById(userId).orElse(null);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping(path = "/checkAdmin")
    public @ResponseBody boolean checkAdmin(HttpSession session) {
        return (Boolean) session.getAttribute("admin");
    }
}