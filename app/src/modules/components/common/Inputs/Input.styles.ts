import { css } from "@emotion/react";

export const input = css`
  --input-border-color: var(--color-border);

  background-color: #fefefe;
  border: 2px solid var(--input-border-color);
  border-radius: 2px;
  box-shadow: 4px 4px 0px var(--input-border-color);
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;

  &:invalid {
    --input-border-color: var(--color-error);
  }
`;
