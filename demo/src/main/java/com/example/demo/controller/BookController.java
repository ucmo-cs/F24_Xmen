package com.example.demo.controller;

import com.example.demo.domain.Book;
import com.example.demo.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class BookController {


    private final BookService bookService;

    @PostMapping("/books")
    public ResponseEntity<?> save(@RequestBody Book book){

        return new ResponseEntity<>(bookService.create(book), HttpStatus.CREATED);

    }

    @GetMapping("/books")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(
                bookService.findAll(), HttpStatus.OK);
    }




}
