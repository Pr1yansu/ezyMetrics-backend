# EzyMetrics Backend

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D%2016.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/types-TypeScript-blue.svg)

EzyMetrics is a backend API built for managing leads and campaigns while generating reports in CSV and PDF formats. It’s designed using **Node.js**, **Express**, **TypeScript**, and **MongoDB**, with Redis caching for improved performance.

## Features

- 🌟 **Leads Management**: Create, cache, and retrieve leads.
- 📊 **Campaigns Management**: Generate and cache campaign data with status tracking.
- 📑 **Reporting**: Generate CSV and PDF reports for leads and campaigns.
- 📜 **Swagger API Documentation**: Full API documentation for easy interaction and testing.
- 🛡️ **Authentication**: Built-in authentication using **Passport.js**.

## Table of Contents

- [EzyMetrics Backend](#ezymetrics-backend)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (Mongoose)
- **Caching**: Redis
- **Authentication**: Passport.js
- **Documentation**: Swagger
- **Reporting**: json2csv, PDFKit

## Getting Started

To get started with the EzyMetrics backend, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (>= 16.x)
- **MongoDB**
- **Redis**

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/ezymetrics-backend.git
   cd ezymetrics-backend

    # Install dependencies
    npm install
    ```
2. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following environment variables:

   ```bash
    PORT=5000
    DB_URL=mongodb://localhost/ezyMetrics
    EMAIL_SERVICE=smtp-relay.brevo.com
    EMAIL_SECURE=false
    EMAIL_PORT=587
    SMTP_USER=787062005@smtp-brevo.com
    SMTP_PASS=Dx2X7wbs1NyU0YEB
    EMAIL=priyansuchowdhury57@gmail.com
    TO_EMAIL=chowdhurypriyansu@gmail.com
   ```
3. **Start the server**:

   ```bash
    npm run dev
    npm run watch

    # Server running at http://localhost:5000
    ```
4. **API Documentation**:
   
   Access the Swagger API documentation at `http://localhost:5000/api-docs`.

   