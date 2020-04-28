import React, { useState, useMemo, memo } from 'react';
function Child({ onButtonClick, data }) {
  console.log('Child render');
  return <button onClick={onButtonClick}>{data.number}</button>;
}
Child = memo(Child);
function App() {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState('zhufeng');
  const addClick = useCallback(() => setNumber(number + 1), [number]);
  const data = useMemo(() => ({ number }), [number]);
  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <Child onButtonClick={addClick} data={data} />
    </div>
  );
}
export default App;
