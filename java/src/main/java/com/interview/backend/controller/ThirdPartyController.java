package com.interview.backend.controller;

import com.interview.backend.service.ThirdPartyApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/external")
@RequiredArgsConstructor
public class ThirdPartyController {

    private final ThirdPartyApiService thirdPartyApiService;

    @GetMapping("/users")
    public ResponseEntity<Object> getExternalUsers() {
        Object response = thirdPartyApiService.fetchExternalData();
        return ResponseEntity.ok(response);
    }
}
