// components/SelectClientWrapper.tsx
'use client';

import Select from 'react-select';
import type { Props } from 'react-select';

export default function SelectClient<T>(props: Props<T, false>) {
  return <Select {...props} />;
}