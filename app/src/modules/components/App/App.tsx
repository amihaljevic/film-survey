import React, { useEffect, useState } from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  review: number | null;
}

// const resolver: Resolver<FormValues> = async (values) => {
//   return {
//     values: values.film ? values : {},
//     errors: !values.film
//       ? {
//           film: {
//             type: "required",
//             message: "This is required.",
//           },
//         }
//       : {},
//   };
// };

function App() {
  const navigate = useNavigate();
  const {
    data: surveyData,
    error,
    loading,
  } = useFetch<Survey>("/api/v1/survey");

  const [review, setReview] = useState<number | null>(null);
  const [film, setFilm] = useState("");

  const schema = yup
    .object({
      film: yup.string().required("Please name the film"),
      review: yup
        .number()
        .defined("Please give at least 1 (one) star")
        .min(1, "Please give at least 1 (one) star")
        .required("Please rate the film"),
    })
    .required();

  const { register, handleSubmit, formState, reset, control } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
      reValidateMode: "onChange",
      defaultValues: {
        film: film,
        review: review,
      },
    });
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

    formState.isValid &&
      (await sendSurvey(
        `/api/v1/survey/${surveyData?.data.id}/answers`,
        payload
      ));

    navigate("/success");
  });

  useEffect(() => {
    console.log("formState", formState);
  }, [formState]);

  const handleReviewChange = (event: any, value: number | null) => {
    setReview(Number(value));
  };

  const handleFilmChange = (value: string) => {
    setFilm(value);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

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
                    label={question.label}
                    errors={formState.errors.review?.message}>
                    <TextInput
                      {...register(question.questionId as "review")}
                      id={question.questionId}
                      value={review as number}
                      required={question.required}
                      onChange={() => {}}
                      type="number"
                      hidden
                      readOnly
                    />
                    <Rating
                      {...field}
                      id={question.questionType}
                      // defaultValue={review as number}
                      // onChange={handleReviewChange}
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
                label={question.label}
                errors={formState.errors.film?.message}>
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
