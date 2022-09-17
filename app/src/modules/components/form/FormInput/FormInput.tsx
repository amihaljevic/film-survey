/** @jsxImportSource @emotion/react */

import React, { ReactNode } from "react";

import * as styles from "./FormInput.styles";

interface Props {
  label: string;
  inputId: string;
  children?: ReactNode | ReactNode[];
}

export const FormInput: React.FC<Props> = ({ label, inputId, children }) => {
  return (
    <div css={styles.formInput} role="presentation">
      <label htmlFor={inputId}>{label}</label>
      {children}
    </div>
  );
};
