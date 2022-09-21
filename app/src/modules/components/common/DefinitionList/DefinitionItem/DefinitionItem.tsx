/** @jsxImportSource @emotion/react */

import { Answer } from "modules/components/App/App";
import React from "react";

import * as styles from "./DefinitionItem.styles";

interface Props {
  answer: Answer;
}

export const DefinitionItem: React.FC<Props> = ({
  answer: { questionId, answer },
}) => {
  return (
    <div css={styles.wrapper} role="presentation">
      <dt css={styles.term}>{questionId}: </dt>
      <dd css={styles.definition}>{answer}</dd>
    </div>
  );
};
