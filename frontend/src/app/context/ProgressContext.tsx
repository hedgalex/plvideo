import { createContext } from 'react';
import { EStatus } from '~shared/.consts';

export const ProgressContext = createContext<EStatus>(EStatus.NONE);
