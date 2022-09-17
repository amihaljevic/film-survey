import { Card } from "modules/components";
import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="page__wrapper" role="presentation">
      <Card>
        <h1>Uh oh!</h1>
        <h2>{error.status}</h2>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </Card>
    </div>
  );
};
