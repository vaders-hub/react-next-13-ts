import { useContext } from 'react';
import { useStore } from 'zustand';

import { createContext } from 'react';

export const CommonContext = createContext<any>(null);

type CallbackType = null | (() => any);
