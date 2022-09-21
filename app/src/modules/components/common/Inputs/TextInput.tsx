/** @jsxImportSource @emotion/react */

import React from "react";

import * as styles from "./Input.styles";

type Props = {
  id: string;
  name: string;
  placeholder?: string;
  value: string | number;
  required: boolean;
  onChange:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        value: string | number | null
      ) => void)
    | undefined;
  type?: string;
  hidden?: boolean;
  readOnly?: boolean;
  valueAsNumber?: boolean;
};

export const TextInput: React.FC<Props> = React.forwardRef<
  HTMLInputElement,
  Props
>(
  (
    {
      id,
      name,
      placeholder,
      value,
      required,
      type = "text",
      onChange,
      valueAsNumber,
      ...props
    },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;

      if (valueAsNumber) {
        onChange(event, Number(event.target.value) as number);
      } else {
        onChange(event, event.target.value as string);
      }

      console.log("value", value);
    };

    return (
      <input
        ref={ref}
        css={styles.input}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
