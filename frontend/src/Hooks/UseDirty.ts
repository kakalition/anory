import { useState } from 'react';

export default function useDirty() {
  const [dirtyMark, setDirtyMark] = useState(0);
  const markDirty = () => setDirtyMark(Math.random() * Math.random());

  return [dirtyMark, markDirty] as [number, () => void];
}
