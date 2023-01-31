import { useState } from 'react';
import { css } from '@emotion/react';

const containerStyles = (checked: boolean) => {
  return css({
    position: 'relative',
    height: 24,
    minWidth: 40,
    borderRadius: 12,
    backgroundColor: checked ? 'black' : 'grey',
    padding: 0,
    border: 0,
    cursor: 'pointer',
  });
};

const dotStyle = (checked: boolean) => {
  return css({
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: '50%',
    top: 4,
    left: checked ? 'calc(100% - 20px)' : 4,
    backgroundColor: '#fff',
    transition: 'all .2s cubic-bezier(.34,.69,.1,1)',
  });
};

const Switch = () => {
  const [checked, setChecked] = useState(false);

  return (
    <button css={containerStyles(checked)} onClick={() => setChecked((pre) => !pre)}>
      <div css={dotStyle(checked)} />
    </button>
  );
};

export default Switch;
