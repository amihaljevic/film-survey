
# 🎬 Film Survey 

This is a faux film festival survey. The user is prompted to enter the name od the film watched and its rating.

As a reward, the user gets a "thank you" note 🤲


## Table of Contents

- [Tech Stack](#tech-stack)
- [Run Server Locally](#run-server-locally)
- [API Reference](#api-reference)


## Tech Stack

**Server:** Node, Express


## Run Server Locally

Clone the project

```bash
  git clone https://github.com/amihaljevic/film-survey.git
```

Go to the project directory

```bash
  cd api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Server ready with the message

```bash
  ⚡[Server]: Server running at http://localhost:3001
```


## API Reference

#### Get survey form

```http
  GET /api/v1/survey
```

#### Create a survey answers record

```http
  POST /api/v1/survey/:id/answers
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Survey Id |


