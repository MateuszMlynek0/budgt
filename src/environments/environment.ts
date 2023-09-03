import { IEnvironment } from "./ienvironment";

export const environment: IEnvironment = {
  production: true,
  apiUrl: 'http://127.0.0.1:8000/api',
  supportedLang: ['en', 'pl'],
  defaultLang: "pl",
  baseHref: "",
  config: {
    logo: {
      img: "budgetboost-logo.svg",
      alt: "BudgetBoost logo",
      class: "bb-logo",
      nameHtml: "Budget",
    },
    featuresEnabled: {
    }
  },
  googleAuthParams: {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: window.location.origin,
    clientId: '655453111875-ucg14i9fmr7drmm7iokkossd4nes7v5r.apps.googleusercontent.com',
    scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',
    showDebugInformation: true,
  },
  googleApiParams: {
    gmail: 'https://gmail.googleapis.com',
    logoutUrl: "https://www.google.com/accounts/Logout"
  }

};

