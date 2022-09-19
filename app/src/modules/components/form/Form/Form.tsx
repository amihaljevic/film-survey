/** @jsxImportSource @emotion/react */

import React, { ReactNode } from "react";
import { Button } from "modules/components";

import * as styles from "./Form.styles";

interface Props {
  onSubmit: any;
  children?: ReactNode | ReactNode[];
}

export const Form: React.FC<Props> = ({ onSubmit, children }) => {
  return (
    <form css={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
