import { Card } from "modules/components";
import { Answer } from "modules/components/App/App";
import { DefinitionList } from "modules/components/common/DefinitionList/DefinitionList";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const { data } = location.state;

  console.log("location", location);

  return (
    <div className="page__wrapper" role="presentation">
      <Card>
        <header>
          <h1>🎊 Success! 🎉</h1>
          <p>Thank you for participating in the survey! 🤲</p>
          <p>
            Below, you can find your answers to the survey questions. If you'd
            like to go again, feel free to go back to the{" "}
            <Link to="/">homepage</Link> and fill another one 👍
          </p>
        </header>

        <section>
          <DefinitionList data={data.attributes.answers} />
        </section>
      </Card>
    </div>
  );
};

export default SuccessPage;
