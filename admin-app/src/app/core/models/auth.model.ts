export interface LoginPayload {

    email: string;
  
    password: string;
  
  }
  
  export interface AdminUser {
  
    _id: string;
  
    name: string;
  
    email: string;
  
    role: string;
  
  }
  
  export interface LoginResponse {
  
    success: boolean;
  
    token: string;
  
    user: AdminUser;
  
  }