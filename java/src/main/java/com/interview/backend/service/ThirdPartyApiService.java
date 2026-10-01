package com.interview.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ThirdPartyApiService {

    private final RestTemplate restTemplate;

    public ThirdPartyApiService() {
        this.restTemplate = new RestTemplate();
    }

    public Object fetchExternalData() {
        String url = "https://jsonplaceholder.typicode.com/users";
        return restTemplate.getForObject(url, Object[].class);
    }
}
