/** @jsxImportSource @emotion/react */

import React, { ReactNode } from "react";

import * as styles from "./Card.styles";

type Props = {
  children?: ReactNode | ReactNode[];
};

export const Card: React.FC<Props> = ({ children }) => {
  return <div css={styles.card}>{children}</div>;
};
