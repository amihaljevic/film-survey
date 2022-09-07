import React, { useEffect, useState } from "react";
import "./App.css";
import { Card } from "../Card/Card";
import { useFetch } from "../../hooks/useFetch";

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
  const { data, error, loading } = useFetch<Survey>(
    "http://localhost:3001/api/v1/survey"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p dangerouslySetInnerHTML={{ __html: error.message }}></p>;

  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
