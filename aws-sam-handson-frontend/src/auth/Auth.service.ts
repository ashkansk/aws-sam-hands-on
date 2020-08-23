import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';


const POOL_DATA = {
  UserPoolId: 'us-east-2_dTSovMmXx',
  ClientId: '211jet5f6nmpem6vh4pphv0ag4'
};
const USER_POOL = new CognitoUserPool(POOL_DATA);

export class AuthService {
  confirmUser(username: string, code: string) {
    // this.authIsLoading.next(true);
    const userData = {
      Username: username,
      Pool: USER_POOL
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        // this.authDidFail.next(true);
        // this.authIsLoading.next(false);
        return;
      }
      // this.authDidFail.next(false);
      // this.authIsLoading.next(false);
      // this.router.navigate(['/']);
    });
  }

  signIn(username: string, password: string): void {
    // this.authIsLoading.next(true);
    const authData = {
      Username: username,
      Password: password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: username,
      Pool: USER_POOL
    };
    const cognitoUser = new CognitoUser(userData);
    const that = this;
    cognitoUser.authenticateUser(authDetails, {
      onSuccess(result: CognitoUserSession) {
        // that.authStatusChanged.next(true);
        // that.authDidFail.next(false);
        // that.authIsLoading.next(false);
        console.log(result);
      },
      onFailure(err) {
        // that.authDidFail.next(true);
        // that.authIsLoading.next(false);
        console.log(err);
      }
    });
    // this.authStatusChanged.next(true);
    return;
  }

  getAuthenticatedUser(): CognitoUser | null {
    return USER_POOL.getCurrentUser();
  }

  logout(): void {
    let authenticatedUser = this.getAuthenticatedUser();
    if (authenticatedUser) {
      authenticatedUser.signOut();
      // this.authStatusChanged.next(false);
    }
  }

  isAuthenticated(): Promise<boolean> {
    const user = this.getAuthenticatedUser();
    const obs = new Promise<boolean> ((resolve, reject) => {
      if (!user) {
        resolve(false);
      } else {
        user.getSession((err: any, session: any) => {
          if (err) {
            resolve(false);
          } else {
            if (session.isValid()) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        });
      }
    });
    return obs;
  }

/*  initAuth() {
    this.isAuthenticated().then(
      (auth) => this.authStatusChanged.next(auth)
    );
  }*/
}
