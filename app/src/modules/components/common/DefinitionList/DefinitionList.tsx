/** @jsxImportSource @emotion/react */

import { Answer } from "modules/components/App/App";
import React from "react";
import { DefinitionItem } from "./DefinitionItem/DefinitionItem";

import * as styles from "./DefinitionList.styles";

interface Props {
  data: Answer[];
}

export const DefinitionList: React.FC<Props> = ({ data }) => {
  return (
    <dl css={styles.list}>
      {data.map((answer: Answer) => {
        return <DefinitionItem answer={answer} key={answer.questionId} />;
      })}
    </dl>
  );
};
