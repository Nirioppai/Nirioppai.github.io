import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';

import { App } from '~/components';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <App />
    </RecoilRoot>
  </StrictMode>
);
