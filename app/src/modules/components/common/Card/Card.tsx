/** @jsxImportSource @emotion/react */

import React, { ReactNode } from "react";

import * as styles from "./Card.styles";

type Props = {
  title?: string;
  description?: string;
  children?: ReactNode | ReactNode[];
};

export const Card: React.FC<Props> = ({ title, description, children }) => {
  return (
    <article css={styles.card}>
      <header css={styles.header}>
        {title && <h1 css={styles.title}>{title}</h1>}
        {description && (
          <div
            css={styles.description}
            role="presentation"
            dangerouslySetInnerHTML={{
              __html: description as string,
            }}></div>
        )}
      </header>

      <section css={styles.body}>{children}</section>
    </article>
  );
};
