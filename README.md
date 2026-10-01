# ReactJS + Java Full-Stack Project

This repository contains a full-stack interview assignment combining:

- a Java Spring Boot backend
- a React + Redux frontend
- a Google Places autocomplete and map experience

## Project Structure

- `java/` - Spring Boot backend application
- `reactjs/` - React frontend application

## Backend

The backend is implemented in Java using Spring Boot and includes:

- REST APIs
- JPA / database persistence
- transaction support with `@Transactional`
- request/response logging
- pagination support
- third-party API integration

To run the backend:

```bash
cd java
./mvnw spring-boot:run
```

Default configuration uses an embedded H2 database for local testability. For a local SQL Server instance, use the `mssql` profile.

```bash
cd java
./mvnw spring-boot:run -Dspring-boot.run.profiles=mssql
```

## Frontend

The frontend is built with React and uses Redux Toolkit plus middleware for recent-search tracking and state management.

To run the frontend:

```bash
cd reactjs
npm install
npm run dev
```

The app uses Google Maps / Places integration and displays selected places on a map.

## Requirements Covered

- Google Places autocomplete search
- Redux state management
- Recent searches tracking
- Middleware usage (Redux Thunk)
- Map display for selected place
- Clean component structure
- Backend API integration and database support

## Notes

- The backend and frontend are designed to run independently.
- The Java app is ready for local testing and can be pointed to MSSQL when needed.
- Environment variables and external API keys may need to be configured depending on your local setup.

## Typical Development Flow

1. Start the backend
2. Start the frontend
3. Search for a location in the UI
4. Review recent searches and map updates
5. Test the backend APIs through Postman or browser requests
