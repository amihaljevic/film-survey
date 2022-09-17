/** @jsxImportSource @emotion/react */

import React from "react";

import * as styles from "./Button.styles";

interface Props {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
}

export const Button: React.FC<Props> = ({ type, label }) => {
  return (
    <button css={styles.button} type={type}>
      {label}
    </button>
  );
};
