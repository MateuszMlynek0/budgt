import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, concatMap, Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: environment.googleAuthParams.issuer,

  // strict discovery document disallows urls which not start with issuers url
  strictDiscoveryDocumentValidation: environment.googleAuthParams.strictDiscoveryDocumentValidation,

  // URL of the SPA to redirect the user to after login
  redirectUri: environment.googleAuthParams.redirectUri,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: environment.googleAuthParams.clientId,

  // set the scope for the permissions the client should request
  scope: environment.googleAuthParams.scope,

  showDebugInformation: true,
};

export interface UserInfo {
  info: {
    sub: string
    email: string,
    name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  public gmail = environment.googleApiParams.gmail;
  public userProfileSubject = new Subject<UserInfo>()
  public userInfo: UserInfo;
  public token: any
  public userEmail: string;
  public useEmail$: BehaviorSubject<Node[]>;
  public userEmail$ = new Subject<any>();
  public userEmailAfterInit: string
  constructor(private readonly oAuthService: OAuthService, private readonly httpClient: HttpClient) {
    // confiure oauth2 service
    oAuthService.configure(authCodeFlowConfig);
    // manually configure a logout url, because googles discovery document does not provide it
    oAuthService.logoutUrl = environment.googleApiParams.logoutUrl;

    // loading the discovery document from google, which contains all relevant URL for
    // the OAuth flow, e.g. login url
    oAuthService.loadDiscoveryDocument().then( () => {
      // // This method just tries to parse the token(s) within the url when
      // // the auth-server redirects the user back to the web-app
      // // It doesn't send the user the the login page
      oAuthService.tryLoginImplicitFlow().then( () => {
        // when not logged in, redirecvt to google for login
        // else load user profile
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow()
        } else {
          oAuthService.loadUserProfile().then( (userProfile: any) => {
            this.userProfileSubject.next(userProfile as UserInfo)
            this.userEmail = userProfile.info.email
            if(userProfile.info.email != undefined) {
              this.userEmail$.next(userProfile.info.email);
            }
            this.getUserInfo()
          })
        }
        oAuthService.loadUserProfile().catch(() => this.signOut());
      })
    });
  }

  public emails(userId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages`, { headers: this.authHeader() })
  }

  public getMail(userId: string, mailId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages/${mailId}`, { headers: this.authHeader() })
  }

  public isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  public signOut() {
    this.oAuthService.logOut();
  }

  private authHeader() : HttpHeaders {
    return new HttpHeaders ({
      'Authorization': `Bearer ${this.oAuthService.getAccessToken()}`
    })
  }

  public getUserInfo(): Observable<UserInfo> {
    return this.userProfileSubject;
  }

  public getUserEmail() {
    // console.log("this.userEmail", this.userEmail);
    return this.userEmail
  }
  
  getCurrentResults():Subject<any> {
    // console.log("SDGFSDGHNSAIDGHSDF");
    return this.userEmail$;
}

  public getUserData() {
    return new Promise((resolve, reject) => { this.userEmail$
      this.userEmail$.pipe(
        concatMap((data) => {
          this.userEmailAfterInit = data;
          return data
        })
      ).subscribe(() => resolve(true));
    });
  }

}
