import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const PORT = process.env.PORT;

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hola World");
});

app.get("/api/v1/survey", (req: Request, res: Response) => {
  if (res.statusCode === 200) {
    res.status(200).json({
      data: {
        type: "surveys",
        id: "2660dd24-e2db-42c1-8093-284b1df2664c",
        attributes: {
          title: "Film feedback form",
          description:
            "<p>Thank you for participating in the film festival!</p><p>Please fill out this short survey so we can record your feedback.</p>",
          questions: [
            {
              questionId: "film",
              questionType: "text",
              label: "What film did you watch?",
              required: true,
              attributes: null,
            },
            {
              questionId: "review",
              questionType: "rating",
              label:
                "How would you rate the film? (1 - Very bad, 5 - Verygood)",
              required: true,
              attributes: {
                min: 1,
                max: 5,
              },
            },
          ],
        },
      },
    });
  }
});

app.post("/api/v1/survey/:id/answers", (req: Request, res: Response) => {
  const { id } = req.params;
  const { attributes } = req.body.data;
  const surveyAnswersId = uuidv4();

  if (res.statusCode === 200) {
    res.status(201).json({
      data: {
        type: "surveyAnswers",
        id: surveyAnswersId,
        attributes: {
          answers: attributes.answers,
        },
        relationships: {
          survey: {
            data: {
              type: "surveys",
              id: id,
            },
          },
        },
      },
    });
  }
});

app.listen(PORT, () =>
  console.log(`⚡[Server]: Server running at http://localhost:${PORT}`)
);
