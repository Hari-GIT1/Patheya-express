export interface LoginRequest {

    email: string;
  
    password: string;
  
  }
  
  export interface RegisterRequest {
  
    name: string;
  
    email: string;
  
    phone: string;
  
    password: string;
  
  }
  
  export interface AuthUser {
  
    _id: string;
  
    name: string;
  
    email: string;
  
    phone: string;
  
    avatar?: string;
  
    role:
  
      | 'customer'
  
      | 'restaurant_owner'
  
      | 'delivery_partner'
  
      | 'admin';
  
  }
  
  export interface AuthResponse {
  
    success: boolean;
  
    message?: string;
  
    token: string;
  
    refreshToken?: string;
  
    user: AuthUser;
  
  }
  
  export interface JwtPayload {
  
    _id: string;
  
    role: string;
  
    exp: number;
  
    iat: number;
  
  }