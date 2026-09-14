import React, { useState } from 'react';

export default function HelpIcon({ text }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="help-ico" onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
      ?
      {open && <span className="help-pop" onClick={(e) => e.stopPropagation()}>{text}</span>}
    </span>
  );
}
