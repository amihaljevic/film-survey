import { css } from "@emotion/react";

export const card = css`
  border: 2px solid #000;
  padding: 24px;
  width: min(80%, 500px);
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;

export const header = css`
  &:empty {
    display: none;
  }
`;

export const title = css``;

export const description = css`
  p {
    margin: unset;
  }

  p + p {
    margin-block-start: 0.55rem;
  }
`;

export const body = css`
  &:empty {
    display: none;
  }
`;
