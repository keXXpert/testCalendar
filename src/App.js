import React from 'react';
import myCSS from './App.module.css'
import Calendar from './components/Calendar/Calendar';

function App() {
  return (
    <div className={myCSS.App}>
      <main>
        <Calendar />
      </main>
    </div>
  );
}

export default App;
