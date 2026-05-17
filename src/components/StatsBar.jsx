import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import "./StatsBar.css";

function useCounter(target, inView, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return val;
}

const stats = [
  { value: 20,  suffix: "+",  label: "Projects Built" },
  { value: 3,   suffix: "+",  label: "Years Coding" },
  { value: 15,  suffix: "+",  label: "Tech & Tools" },
  { value: 100, suffix: "%",  label: "Open Source" },
];

function Stat({ value, suffix, label, inView }) {
  const count = useCounter(value, inView);
  return (
    <div className="statsbar__item">
      <span className="statsbar__num">{count}{suffix}</span>
      <span className="statsbar__label">{label}</span>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div className="statsbar" ref={ref}>
      <div className="statsbar__inner">
        {stats.map(s => <Stat key={s.label} {...s} inView={inView} />)}
      </div>
    </div>
  );
}
