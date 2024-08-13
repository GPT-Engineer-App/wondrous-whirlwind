import React from 'react';

const GradientHeading = ({ text }) => {
  return (
    <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
      {text}
    </h1>
  );
};

export default GradientHeading;