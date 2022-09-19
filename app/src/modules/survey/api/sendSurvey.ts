export const sendSurvey = async (
  url: string,
  payload: {
    questionId: string;
    answer: string | number;
  }[]
) => {
  const endpoint = `${process.env.REACT_APP_API_URL}${url}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        type: "surveyAnswers",
        attributes: {
          answers: payload,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Sorry, couldn't do the fetch");
  }

  const data = await response.json();

  console.log("data", data);

  return { data };
};
