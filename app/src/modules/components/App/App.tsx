import React, { useState } from "react";
import "./App.css";

import { ReactComponent as IconStarEmpty } from "assets/icons/icon-star-empty.svg";
import { ReactComponent as IconStarFilled } from "assets/icons/icon-star-filled.svg";

import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { useFetch } from "hooks/useFetch";
import { Button, Card, TextInput } from "modules/components/common";
import { Form, FormInput } from "modules/components/form";
import { sendSurvey } from "modules/survey/api/sendSurvey";
import { useForm, SubmitHandler, Resolver, Controller } from "react-hook-form";

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

interface Answer {
  questionId: string;
  answer: string | number;
}

interface FormValues {
  film: string;
  review: number;
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.film ? values : {},
    errors: !values.film
      ? {
          film: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

function App() {
  const navigate = useNavigate();
  const {
    data: surveyData,
    error,
    loading,
  } = useFetch<Survey>("/api/v1/survey");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit(async (data) => {
    let payload = [
      {
        questionId: "film",
        answer: data.film,
      },
      {
        questionId: "review",
        answer: Number(data.review),
      },
    ];

    await sendSurvey(`/api/v1/survey/${surveyData?.data.id}/answers`, payload);

    navigate("/success");
  });

  const [review, setReview] = useState<number>(0);
  const [film, setFilm] = useState("");

  const handleReviewChange = (event: any) => {
    setReview(Number(event.target.value));
  };

  const handleFilmChange = (value: string) => {
    setFilm(value);
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

        <Form onSubmit={onSubmit}>
          {surveyData?.data.attributes.questions.map((question) => {
            return question.questionType === "rating" ? (
              <Controller
                key={question.questionId}
                name={question.questionId as "review"}
                control={control}
                render={({ field }) => (
                  <FormInput
                    inputId={question.questionId}
                    label={question.label}>
                    <Rating
                      {...field}
                      id={question.questionType}
                      value={review}
                      onChange={handleReviewChange}
                      emptyIcon={<IconStarEmpty />}
                      icon={<IconStarFilled />}
                      size="large"
                      max={question.attributes.max}
                    />
                  </FormInput>
                )}
              />
            ) : (
              <FormInput
                key={question.questionId}
                inputId={question.questionId}
                label={question.label}>
                <TextInput
                  {...register(question.questionId as "film")}
                  id={question.questionId}
                  value={film}
                  required={question.required}
                  onChange={handleFilmChange}
                />
              </FormInput>
            );
          })}
          <Button type="submit" label="Submit" />
        </Form>
      </Card>
    </div>
  );
}

export default App;
