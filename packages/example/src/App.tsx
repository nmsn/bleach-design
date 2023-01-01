import { useState, useRef } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Button, Spin, Modal } from '@bleach-design/components';

function App() {
  const [count, setCount] = useState(0);

  const ref = useRef(null);

  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);

    ref.current.open();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="App">
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <Button variant="primary" onClick={onClick} loading={loading}>
        确认
      </Button>
      <Button variant="secondary" onClick={onClick} loading={loading}>
        确认
      </Button>
      <Button variant="tertiary" onClick={onClick} loading={loading}>
        确认
      </Button>
      <Button variant="primary" onClick={onClick} loading={loading} disabled stretch>
        确认
      </Button>
      <Spin />

      <Modal ref={ref}>
        <div>123</div>
      </Modal>
    </div>
  );
}

export default App;
