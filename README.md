
# 🎬 Film Survey 

This is a faux film festival survey. The user is prompted to enter the name od the film watched and its rating.

As a reward, the user gets a "thank you" note 🤲


## Table of Contents

- [Tech Stack](#tech-stack)
- [Run React App Locally](#run-react-app-locally)
- [Run Server Locally](#run-server-locally)
- [API Reference](#api-reference)
## Tech Stack

**Client:** React, react-hook-forms, TypeScript, MUI, Emotion

**Server:** Node, Express


## Run React App Locally

Clone the project

```bash
  git clone https://github.com/amihaljevic/film-survey.git
```

Go to the project directory

```bash
  cd app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

App ready with the message

```bash
  You can now view film-surveys in the browser.

    Local:            http://localhost:3000
    On Your Network:  http://192.168.1.2:3000
```


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


