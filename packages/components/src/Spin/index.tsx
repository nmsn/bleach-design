import { keyframes, css } from '@emotion/react';

type SpinProps = {
  size?: 'small' | 'normal' | 'large';
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const sizeMap = {
  small: {
    width: 16,
    height: 16,
  },

  normal: {
    width: 32,
    height: 32,
  },

  large: {
    width: 48,
    height: 48,
  },
};

const baseStyles = (size: SpinProps['size'] = 'normal') =>
  css({
    display: 'block',
    borderRadius: '100%',
    border: '1px solid currentColor',
    borderTopColor: 'transparent',
    animation: `${spin} 1s infinite linear`,
    transformOrigin: '50% 50%',
    ...sizeMap[size],
  });

const Spin = ({ size = 'normal' }: SpinProps) => <span css={baseStyles(size)} />;

export default Spin;
