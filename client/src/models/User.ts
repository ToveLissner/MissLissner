export type User = {
  userID: number;
  username: string;
  password: string;
  balance: number;
  isLoggedIn: boolean; // finns bara på frontend-sidan
};

export type UserAllInfo = {
  user: {
    userID: number;
    username: string;
    password: string;
    isLoggedIn?: boolean;
  };
  gameAccount: {
    accountID?: number;
    balance: number;
  };
  isLoggedIn: boolean; // finns bara på frontend-sidan
};
