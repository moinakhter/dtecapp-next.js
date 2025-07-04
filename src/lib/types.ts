export interface RegisterBody {
  firstName: string;
  lastName: string;
  storeUrl: string;
  companyName: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}
