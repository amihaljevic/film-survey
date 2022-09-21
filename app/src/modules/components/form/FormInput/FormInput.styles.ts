import { css } from "@emotion/react";

export const formInput = css`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export const label = css`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
`;

export const error = css`
  margin-block-start: 0;
  color: var(--color-error);
  font-weight: 700;
`;
