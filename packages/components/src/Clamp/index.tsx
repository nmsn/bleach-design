import { useRef, useState, useEffect } from 'react';

type ClampProps = {
  lines: number;
  ellipsis: string;
  children: string;
};

const Clamp = ({ lines = 3, ellipsis = '...', children }: ClampProps) => {
  const [origin, setOrigin] = useState('');
  const [displayText, setDisplayText] = useState('');
  const elementRef = useRef<HTMLElement>(null);

  const [lineHeight, setLineHeight] = useState(0);

  const [start, setStart] = useState(0);
  const [mid, setMid] = useState(0);
  const [end, setEnd] = useState(0);

  useEffect(() => {
    setOrigin(children);
  }, [children]);

  useEffect(() => {
    const height = elementRef.current?.clientHeight || 0 + 1;
    setLineHeight(height);
    clampLines();
  }, []);

  const clampLines = () => {
    if (!elementRef.current) {
      return;
    }

    let maxHeight = lineHeight * lines + 1;

    setStart(0);
    setMid(0);
    setEnd(origin.length || 0);

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      elementRef.current.innerText = origin.slice(0, mid);

      if (mid === origin.length) {
        setDisplayText(origin);
        return;
      }

      moveMarkers(maxHeight);
    }
    const result = origin.slice(0, mid - 5) + ellipsis;
    elementRef.current.innerText = result;
    setDisplayText(result);
  };

  const moveMarkers = (maxHeight: number) => {
    if (elementRef.current && elementRef.current.clientHeight <= maxHeight) {
      setStart(mid + 1);
    } else {
      setEnd(mid - 1);
    }
  };

  const content = <span ref={elementRef}>{displayText}</span>;

  return content;
};

export default Clamp;
