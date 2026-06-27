import React from 'react';

// Tracks viewport width so inline-styled layouts can react to breakpoints.
// Shared by the responsive screens (ProductDetail, Footer, …).
export function useWidth() {
  const [w, setW] = React.useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));
  React.useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return w;
}
