export const getSurvey = async () => {
  const response = await fetch("http://localhost:3000/api/v1/survey");
  const data = await response.json();

  console.log("response", response);
  console.log("data", data.data);

  return data;
};
