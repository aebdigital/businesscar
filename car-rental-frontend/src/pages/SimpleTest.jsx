import React from 'react';

const SimpleTest = () => {
  return (
    <div>
      <h1>Hello World - Test</h1>
      <p>If you can see this, the basic React setup is working.</p>
      <div style={{
        backgroundColor: 'red', 
        color: 'white', 
        padding: '20px',
        margin: '20px'
      }}>
        RED BOX - This should be visible
      </div>
    </div>
  );
};

export default SimpleTest;