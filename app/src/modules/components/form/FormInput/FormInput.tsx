/** @jsxImportSource @emotion/react */

import React, { ReactNode } from "react";

import * as styles from "./FormInput.styles";

interface Props {
  label: string;
  inputId: string;
  children?: ReactNode | ReactNode[];
  errors: string | undefined;
}

export const FormInput: React.FC<Props> = ({
  label,
  inputId,
  children,
  errors,
}) => {
  return (
    <div css={styles.formInput} role="presentation">
      <label htmlFor={inputId} css={styles.label}>
        {label}
      </label>
      {children}
      {errors && <p css={styles.error}>👆 {errors} 👆</p>}
    </div>
  );
};
