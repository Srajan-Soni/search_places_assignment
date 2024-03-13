import React from 'react';

const LimitSelector = ({ limit, onChange }) => {
  return (
    <div>
      <label>
        Limit:
        <input type="number" min="1" max="10" value={limit} onChange={onChange} />
      </label>
    </div>
  );
};

export default LimitSelector;
