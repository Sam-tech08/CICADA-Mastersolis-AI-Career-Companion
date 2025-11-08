import React from 'react';

// GradientBarsBackground removed — this file now exports a no-op passthrough component
// to preserve imports in the codebase without rendering any gradient background.

interface ComponentProps {
  children?: React.ReactNode;
}

export default function GradientBarsBackground({ children }: ComponentProps) {
  return <>{children}</>;
}

// Note: if you want this file removed completely, I can delete it — currently it's
// a passthrough to avoid breaking imports until callers are cleaned up.
