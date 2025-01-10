# Event Ticketing System

## Description

This project is an Event Ticketing System API built with Express.js and TypeScript. It provides endpoints for managing events and purchasing tickets, as well as generating reports on ticket sales.

## Features

- Create and manage events
- Purchase tickets for events
- Generate ticket sales reports
- Swagger documentation

## Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies
4. Create a `.env` file in the root directory and add the following variables:

MONGO_URI=your_database_connection_string
RABBITMQ_URI=rabbit_mq_uri

## Running the Application

1. To start the server in development mode:
```bash
npm run dev
```
2. To build and run in production mode:
```bash
npm run build
npm start
```
The server will start on the port specified

## API Docs
1. Swagger
```bash
http://localhost:3000/swagger
```

## API Endpoints

### Events

- `GET /events`: List all events
- `POST /events`: Create a new event
- `GET /events/{id}`: Get details of a specific event

### Tickets

- `POST /tickets/purchase`: Purchase tickets for an event
- `GET /tickets/report`: Get a report of ticket sales