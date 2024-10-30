package com.example.demo.service;

import com.example.demo.domain.Book;
import com.example.demo.repository.BookRespository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@AllArgsConstructor
@Service
public class BookService {

    private final BookRespository bookRepository;

    @Transactional
    public Book create(Book book){

        return bookRepository.save(book);

    }


    @Transactional
    public List<Book> findAll(){
        return bookRepository.findAll();
    }



}
