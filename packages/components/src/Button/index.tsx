import React from "react";


export type ClickEvent<T = Element> =
  | React.MouseEvent<T>
  | React.KeyboardEvent<T>;

// type ButtonProps = {
//   children?: React.ReactNode;
//   styles?: React.CSSProperties;
//   // type?: "primary" | "danger" | "warning" | "info" | "text";
//   variant: "primary" | "secondary" | "tertiary";
//   color: string;
//   size: "small" | "normal" | "large";
//   stretch: boolean;
//   width?: number;
//   height?: number;
//   disabled: boolean;
//   loading?: boolean;
//   onClick?: (event: ClickEvent) => void;
// };

const Button = () => {
  return <button>button</button>;
};

export default Button;
