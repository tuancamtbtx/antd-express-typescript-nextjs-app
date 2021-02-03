import { observable, action } from "mobx";
// import authApi from "api/authApi";
import { saveToken } from "src/utils/auth";
import Store from "./Store";
import { IUserInfo } from "src/types/users";
interface ILoadingState {
  isFetchingMe?: boolean;
  isLoginLoading?: boolean;
}
interface IError {
  login?: string;
  me?: IUserInfo;
}
export default class AuthStore extends Store {
  @observable
  loadingState: ILoadingState = {
    isFetchingMe: true,
    isLoginLoading: false,
  };

  @observable isAuthenticated: boolean = false;
  @observable token: string = null;
  @observable me: IUserInfo = null;

  @observable
  errors: IError = {
    login: null,
    me: null,
  };

  /**
   * Save to local
   */
  @action
  saveToken(token: string): void {
    saveToken(token);
    this.token = token;
  }

  /**
   * Fetch user first login
   */
  @action
  async fetchMe(authToken: string): Promise<boolean> {
    this.loadingState.isFetchingMe = true;
    // const { data, error } = await authApi.me();
    // if (error) {
    //   this.errors.me = data.message;
    //   this.loadingState.isFetchingMe = false;
    return false;
    // } else {
    //   this.errors.me = null;
    //   this.me = data;
    //   this.token = authToken;
    //   this.isAuthenticated = true;
    //   this.loadingState.isFetchingMe = false;
    //   return true;
    // }
  }

  /**
   * Login for user data
   */
  @action
  async login({ email, password }): Promise<void> {
    //   this.loadingState.isLoginLoading = true;
    //   const { data, error } = await authApi.login({ email, password });
    //   if (error) {
    //     this.errors.login = data.message;
    //   } else {
    //     this.me = data.user;
    //     this.saveToken(data.access_token);
    //     this.errors.login = null;
    //     this.errors.me = null;
    //     this.isAuthenticated = true;
  }
  //   this.loadingState.isLoginLoading = false;
  //   return data.user;
  // }
  @action
  async logout(): Promise<void> {
    this.isAuthenticated = false;
  }
}
