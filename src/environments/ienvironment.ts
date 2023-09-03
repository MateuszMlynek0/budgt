export interface IEnvironment {
  production: boolean;
  apiUrl: string;
  supportedLang: string[];
  defaultLang: string;
  baseHref: string;
  config: {
    logo: {
      img: string;
      alt: string;
      class: string;
      nameHtml: string;
    },
    featuresEnabled: {

    }
  },
  googleAuthParams: {
    issuer: string;
    strictDiscoveryDocumentValidation: boolean;
    redirectUri: string;
    clientId: string;
    scope: string;
    showDebugInformation: boolean;
  },
  googleApiParams: {
    gmail: string;
    logoutUrl: string;
  }
}