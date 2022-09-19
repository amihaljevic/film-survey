/** @jsxImportSource @emotion/react */

import React from "react";

import * as styles from "./Input.styles";

type Props = {
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  required: boolean;
  onChange: (param: string) => void;
};

export const TextInput: React.FC<Props> = React.forwardRef<
  HTMLInputElement,
  Props
>(({ id, name, placeholder, value, required, onChange, ...props }, ref) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    console.log("value", value);
  };

  return (
    <input
      ref={ref}
      css={styles.input}
      type="text"
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      required={required}
      onChange={handleChange}
      {...props}
    />
  );
});
