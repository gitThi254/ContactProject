package com.example.contactapi.rep;

import com.example.contactapi.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRep extends JpaRepository<Contact, String> {
}
