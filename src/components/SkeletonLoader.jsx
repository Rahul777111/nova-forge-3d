import React from 'react';
import './SkeletonLoader.css';

export default function SkeletonLoader({ height = '200px', width = '100%', borderRadius = '12px' }) {
  return (
    <div
      className="skeleton-loader"
      style={{ height, width, borderRadius }}
      aria-hidden="true"
    />
  );
}
