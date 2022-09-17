import React, { useState } from "react";
import "./App.css";

import { ReactComponent as IconStarEmpty } from "assets/icons/icon-star-empty.svg";
import { ReactComponent as IconStarFilled } from "assets/icons/icon-star-filled.svg";

import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { useFetch } from "hooks/useFetch";
import { Card, TextInput } from "modules/components/common";
import { Form, FormInput } from "modules/components/form";

interface Survey {
  data: {
    type: string;
    id: string;
    attributes: {
      title: string;
      description: string;
      questions: Question[];
    };
  };
}

interface Question {
  attributes: any | null;
  label: string;
  questionId: string;
  questionType: string;
  required: boolean;
}

function App() {
  const navigate = useNavigate();
  const {
    data: surveyData,
    error,
    loading,
  } = useFetch<Survey>("http://localhost:3001/api/v1/survey");

  const [review, setReview] = useState<number | null>(null);
  const [film, setFilm] = useState("");

  const handleReviewChange = (event: any) => {
    setReview(event.target.value);
  };

  const handleFilmChange = (value: string) => {
    setFilm(value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:3001/api/v1/survey/${surveyData?.data.id}/answers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            type: "surveyAnswers",
            attributes: {
              answers: [
                {
                  questionId: "film",
                  answer: film,
                },
                {
                  questionId: "review",
                  answer: review,
                },
              ],
            },
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Sorry, couldn't do the fetch");
    }

    const data = await response.json();

    console.log("data", data);

    navigate("/success");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p dangerouslySetInnerHTML={{ __html: error.message }}></p>;

  return (
    <div className="page__wrapper" role="presentation">
      <Card>
        <header>
          <h1>{surveyData?.data.attributes?.title}</h1>
          <div
            role="presentation"
            dangerouslySetInnerHTML={{
              __html: surveyData?.data.attributes.description as string,
            }}></div>
        </header>

        <Form onSubmit={handleSubmit}>
          {surveyData?.data.attributes.questions.map((question) => {
            return question.questionType === "rating" ? (
              <FormInput
                inputId={question.questionId}
                label={question.label}
                key={question.questionId}>
                <Rating
                  name={question.questionType}
                  onChange={handleReviewChange}
                  value={Number(review)}
                  id={question.questionType}
                  emptyIcon={<IconStarEmpty />}
                  icon={<IconStarFilled />}
                  size="large"
                  max={question.attributes.max}
                />
              </FormInput>
            ) : (
              <FormInput
                inputId={question.questionId}
                label={question.label}
                key={question.questionId}>
                <TextInput
                  id={question.questionId}
                  name={question.questionId}
                  value={film}
                  required={question.required}
                  onChange={handleFilmChange}
                />
              </FormInput>
            );
          })}
        </Form>
      </Card>
    </div>
  );
}

export default App;
