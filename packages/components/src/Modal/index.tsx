// ./components/popup/index.tsx
import { forwardRef, useState, useEffect, useImperativeHandle, useRef } from 'react';
import ReactDom from 'react-dom';
import { css, keyframes, Keyframes } from '@emotion/react';
import {} from '@icon-park/react';
import useOverflowHidden from '../_util/hooks/useOverflowHidden';
import Close from './Close';

export interface IPopupRef {
  open: () => void;
}

interface ModalProps {
  children: React.ReactNode;
  width?: number;
  height: number;
  styles?: React.CSSProperties;
  title?: React.ReactNode;
  footer?: React.ReactNode;
}

// const TRANSITION_DURATION = 300;

const maskFadeIn = keyframes`
0% {  opacity: 0; }
  100% { opacity: .5 }
`;

const maskFadeOut = keyframes`
0% {  opacity: .5; }
  100% { opacity: 0 }
`;

const fadeIn = keyframes`
0% {  opacity: 0; }
  100% { opacity: 1 }
`;

const fadeOut = keyframes`
0% {  opacity: 1; }
  100% { opacity: 0 }
`;

const containerStyle = () => {
  return css`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
  `;
};

const maskStyle = () => {
  return css`
    width: inherit;
    height: inherit;
    position: fixed;
    background-color: #000;
    opacity: 0.5;
    top: 0;
    left: 0;
    z-index: 10;
  `;
};

const contentStyle = () => {
  return css`
    position: relative;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 12px;
    background-color: white;
    z-index: 10;
    width: 500px;
    min-height: 400px;
    color: black;
  `;
};

const headerStyle = ({ title }: { title?: React.ReactNode }) => {
  const baseStyle = css`
    padding-bottom: 12px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
  `;
  if (title) {
    return css`
      ${baseStyle};
      justify-content: space-between;
    `;
  }

  return css`
    ${baseStyle};
    justify-content: flex-end;
  `;
};

const Modal = forwardRef<IPopupRef, ModalProps>(({ children, title, footer }, ref) => {
  const [visible, setVisible] = useState(false);
  const [enter, setEnter] = useState(false);
  const [leave, setLeave] = useState(false);

  const timeout = useRef<number | null>(null);

  useOverflowHidden(() => document.body, { hidden: visible });

  useEffect(() => {
    if (visible) {
      setEnter(true);
      timeout.current = setTimeout((): void => {
        setEnter(false);
      }, 300);
    } else {
      setLeave(true);
      timeout.current = setTimeout((): void => {
        setLeave(false);
      }, 300);
    }
    return (): void => {
      timeout.current = null;
    };
  }, [visible]);

  const onOpen = () => {
    setEnter(true);
    setVisible(true);
    timeout.current = setTimeout((): void => {
      setEnter(false);
    }, 300);
  };

  const onClose = () => {
    setLeave(true);
    timeout.current = setTimeout((): void => {
      setLeave(false);
    }, 300);
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    open: onOpen,
  }));

  const fadeAnimation = (fadeIn: Keyframes, fadeOut: Keyframes) => {
    if (enter) {
      return `${fadeIn} 1s infinite linear`;
    }

    if (leave) {
      return `${fadeOut} 1s infinite linear`;
    }

    return undefined;
  };

  const renderDom = visible ? (
    <div
      css={{
        ...containerStyle(),
      }}
    >
      <div
        css={css({
          ...maskStyle(),
          animation: fadeAnimation(maskFadeIn, maskFadeOut),
        })}
      />
      <div css={css({ ...contentStyle(), animation: fadeAnimation(fadeIn, fadeOut) })}>
        <div css={css({ ...headerStyle({ title }) })}>
          {title && <div>{title}</div>}
          <Close onClick={onClose} />
        </div>
        <div>{children}</div>
        {footer && <div>{footer}</div>}
      </div>
    </div>
  ) : (
    <></>
  );

  return typeof document !== 'undefined'
    ? ReactDom.createPortal(renderDom, document.body)
    : renderDom;
});

export default Modal;
