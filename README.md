# Facility Explorer

The website is hosted via Azure and can be accessed here: <b><a href="https://facilityexplorer.azurewebsites.net/" target="_blank">Facility Explorer</a>
</b>.

## Overview

Facility Explorer simplifies the research and requirements for mental health professionals seeking resources for patients. The website serves as a centralized repository for mental health facilities, curated and maintained by professionals. The information is publicly accessible without the need for sign-ups or logins. Users can explore and add facilities to their "Selected Facilities" list, which can be downloaded as a PDF or printed.

Mental health professionals have the option to log in with an admin account, granting them full CRUD (Create, Read, Update, Delete) access to the application. The primary goal is to provide accessible, up-to-date information as a public resource, actively managed by mental health professionals for their daily use.

_Note: Facility Explorer is tailored for Washington state, initially conceived by a Social Worker working in the Greater Seattle Area. The website currently includes seeded data to showcase its features. This data is intended to demonstrate the functionality of Facility Explorer and its potential as a valuable tool for mental health professionals._

## Key Features

- **Centralized Facility Repository:**

  - Curated and maintained by mental health professionals.

- **Public Accessibility:**

  - Information available to everyone without sign-ups or logins.

- **User-Friendly Interface:**

  - Interactive Data Table with:
    - Full sorting capability
    - Pagination for seamless navigation
    - Powerful search function for quick access

- **Personalized Lists:**

  - Users can add facilities to their "Selected Facilities" list.
  - Download the list as a PDF or print it for offline use.

- **Admin Access for Professionals:**

  - Mental health professionals can log in for full CRUD access.

- **Specialized Categories:**
  - Sub-Tables for specific facility categories, including:
    - Skilled Nursing Facilities (SNF)
    - Long Term Care (LTC)
    - Mental Health (MH)

## Developer Tools

### Backend

- **.NET 8.0 Web API**
- **Entity Framework Core**
- **Relational Database (SQLite)**
- **Unit Testing**

  - Xunit and NSubstitute for robust unit testing.

- **Authentication and Authorization**

  - Identity User/Role system with JWT authentication.
  - Custom roles (User and Admin) for granular access control.
  - Custom GET endpoint to retrieve a logged-in user's role(s).
  - Protected endpoints for role-based authorization.

- **API Documentation:**

  - Swagger/OpenAPI integration for clear API documentation.
  - Additional configuration for token testing.

- **Exception Handling:**

  - Custom global exception handling middleware for improved error management.

- **Hosting/Configuration:**

  - Hosted on Azure App Service (Free Tier) for reliable deployment.
  - Environment variables managed via Azure for secure and flexible configuration.

### Frontend

- **React**
- **TypeScript**
- **Material UI**
- **Vite**
