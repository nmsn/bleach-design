import React from "react";
import Spin from "../Spin";
import Space from "../Space";
import { css } from "@emotion/react";

export type ClickEvent<T = Element> =
  | React.MouseEvent<T>
  | React.KeyboardEvent<T>;

type ButtonProps = {
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  variant: "primary" | "secondary" | "tertiary";
  size: "small" | "normal" | "large";
  stretch: boolean;
  width?: number;
  height?: number;
  disabled: boolean;
  loading?: boolean;
  onClick?: (event: ClickEvent) => void;
};

const sizeMap = {
  small: {
    fontSize: 16,
    minWidth: 32,
    height: 32,
  },
  normal: {
    fontSize: 16,
  },
  large: {
    fontSize: 16,
  },
};

const baseStyles = ({ size = "normal" }: Pick<ButtonProps, "size">) => {
  return css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: "8px 16px",
    ...sizeMap[size],
  });
};

const variantMap = {
  primary: {
    border: "none",
  },
  secondary: {},
  tertiary: {},
};

const variantStyles = ({
  variant = "primary",
}: Pick<ButtonProps, "variant">) => {
  return css({
    ...variantMap[variant],
  });
};

const Button = ({ children, onClick, size, variant }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      css={[baseStyles({ size }), variantStyles({ variant })]}
    >
      <Space>
        {children}
        <Spin size="small" />
      </Space>
    </button>
  );
};

export default Button;
