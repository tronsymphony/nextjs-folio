import { useState,useContext} from 'react';

import ThemeContext from '../components/themecontext';


function Counter() {
  const [count, setCount] = useState(0);
  const theme = useContext(ThemeContext); // Accessing the context value

  return (
    <div>
      <h1 style={{ backgroundColor: theme === 'dark' ? 'black' : 'white', color: theme === 'dark' ? 'white' : 'black' }}>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
