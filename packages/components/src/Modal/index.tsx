// ./components/popup/index.tsx
import { forwardRef, useState, useEffect, useImperativeHandle, useRef } from 'react';
import ReactDom from 'react-dom';
import { css, keyframes, Keyframes } from '@emotion/react';
import useOverflowHidden from '../_util/hooks/useOverflowHidden';

export interface IPopupRef {
  open: () => void;
}

interface IProps {
  children: JSX.Element;
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
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--popup-content-background-color);
    z-index: 20;
    min-width: 25rem;
    min-height: 25rem;
  `;
};

// let timeout = null;

const Modal = forwardRef<IPopupRef, IProps>(({ children }, ref) => {
  const [visible, setVisible] = useState(false);
  const [enter, setEnter] = useState(false);
  const [leave, setLeave] = useState(false);

  const timeout = useRef<number | null>(null);

  useOverflowHidden(() => document.body, { hidden: visible });

  useEffect(() => {
    // document.body.className = visible ? 'forbidScroll' : '';
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
      // className={cName({
      //   [styles.popup]: true,
      //   [styles.enter]: enter,
      //   [styles.leave]: leave,
      // })}
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
        <div onClick={onClose}>关闭按钮</div>
        {children}
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
