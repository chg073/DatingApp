import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { InviteCode} from './screens/InviteCode';
import './tailwind.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InviteCode />
  </StrictMode>
);
