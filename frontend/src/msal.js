// import { createMsal } from 'msal-vue';
import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: '8a91365a-ed40-4ce7-bac8-0d0f96cce168',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'http://localhost:5173/',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

// export const msalPlugin = createMsal(msalInstance);
export { msalInstance };