import { css } from "@emotion/react";

export const button = css`
  --color-btn-border: var(--color-border);

  background-color: var(--color-primary);
  border: 2px solid var(--color-btn-border);
  border-radius: 2px;
  box-shadow: 4px 4px 0px var(--color-btn-border);
  padding: 12px;
  font-weight: 700;
`;
