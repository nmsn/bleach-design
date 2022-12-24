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
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "middle" | "large";
  stretch?: boolean;
  width?: number;
  height?: number;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: ClickEvent) => void;
};

const sizeMap = {
  small: {
    fontSize: 16,
    minWidth: 32,
    height: 32,
  },
  middle: {
    fontSize: 16,
  },
  large: {
    fontSize: 16,
  },
};

const baseStyles = ({ size = "middle" }: Pick<ButtonProps, "size">) => {
  return css({
    display: "flex",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: "8px 16px",
    transition: "0.1s",
    ...sizeMap[size],
  });
};

const disabledOpacity = 0.5;
const hoverOpacity = 0.7;

const disabledStyles = () => {
  return css({
    opacity: disabledOpacity,
    pointerEvents: "none",
  });
};

const activeColor = "rgba(220,220,220)";

const variantMap = {
  primary: {
    color: "white",
    backgroundColor: "black",
    border: "1px solid transparent",
    "&:hover": {
      opacity: hoverOpacity,
    },
    "&:active": {
      color: activeColor,
    },
  },
  secondary: {
    border: "1px solid black",
    backgroundColor: "transparent",
    "&:hover": {
      opacity: 0.7,
    },
    "&:active": {
      backgroundColor: activeColor,
    },
  },
  tertiary: {
    backgroundColor: "transparent",
    border: "1px solid transparent",
    "&:hover": {
      opacity: 0.7,
    },

    "&:active": {
      backgroundColor: activeColor,
    },
  },
};

const variantStyles = ({
  variant = "primary",
}: Pick<ButtonProps, "variant">) => {
  return css({
    ...variantMap[variant],
  });
};

const Button = ({
  children,
  onClick,
  loading,
  size = "middle",
  variant = "secondary",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      css={[
        baseStyles({ size }),
        variantStyles({ variant }),
        disabled || loading ? disabledStyles() : undefined,
      ]}
    >
      <Space>
        {/* TODO loading transition */}
        {loading && <Spin size="small" />}
        {children}
      </Space>
    </button>
  );
};

export default Button;
