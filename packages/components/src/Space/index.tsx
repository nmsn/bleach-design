import { Children } from "react";
import { css } from "@emotion/react";

type SpaceProps = {
  size?: "small" | "middle" | "large" | number;
  direction?: "vertical" | "horizontal";
  children: React.ReactNode;
};

const sizeMap = {
  small: 8,
  middle: 16,
  large: 24,
};

const getSize = (size: Required<Pick<SpaceProps, "size">>["size"]) => {
  if (typeof size === "number") {
    return size;
  }

  if (Object.keys(sizeMap).includes(size) && sizeMap[size]) {
    return sizeMap[size];
  }

  return 0;
};

const directionMap = {
  vertical: "column" as "column",
  horizontal: "row" as "row",
};

const baseStyles = ({
  direction,
  size,
}: Required<Pick<SpaceProps, "direction" | "size">>) => {
  return css({
    display: "flex",
    flexDirection: directionMap[direction],
    gap: getSize(size),
  });
};

const Space = ({
  size = "small",
  direction = "horizontal",
  children,
}: SpaceProps) => {
  const childrenList = Children.toArray(children);
  console.log(children, childrenList);
  return <div css={baseStyles({ direction, size })}>{childrenList}</div>;
};

export default Space;
