export const sendSurvey = async (
  url: string,
  payload: {
    questionId: string;
    answer: string | number;
  }[]
) => {
  const endpoint = `${process.env.REACT_APP_API_URL}${url}`;

  try {
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
      throw new Error(
        `<p>${response.status} (${response.statusText})</p>
            <p>Endpoint URL: ${response.url}</p>
            <p>Could not fetch the data 🤷‍♀️</p>`
      );
    }

    const data = await response.json();

    return { data };
  } catch (error) {
    return { error };
  }
};
