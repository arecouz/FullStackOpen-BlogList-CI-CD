import { useState, forwardRef, useImperativeHandle } from 'react';

const Toggleable = forwardRef(({ buttonLabel, children }, ref) => {
  const [toggle, setToggle] = useState(false);
  const switchToggle = () => {
    setToggle(!toggle);
  };
  useImperativeHandle(ref, () => {
    return {
      switchToggle,
    };
  });
  return (
    <div>
      <div style={{ display: !toggle ? '' : 'none' }}>
        <button onClick={switchToggle}>{buttonLabel}</button>
      </div>
      <div style={{ display: toggle ? '' : 'none' }}>
        {children}
        <button onClick={switchToggle}>Cancel</button>
      </div>
    </div>
  );
});

Toggleable.displayName = 'Toggleable';

export default Toggleable;
