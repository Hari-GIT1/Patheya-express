import { Injectable }
from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY =
    'admin_token';

  // =========================
  // SET TOKEN
  // =========================

  setToken(
    token: string
  ): void {

    localStorage.setItem(

      this.TOKEN_KEY,

      token

    );

  }

  // =========================
  // GET TOKEN
  // =========================

  getToken():
  string | null {

    return localStorage.getItem(

      this.TOKEN_KEY

    );

  }

  // =========================
  // REMOVE TOKEN
  // =========================

  clearToken(): void {

    localStorage.removeItem(

      this.TOKEN_KEY

    );

  }

}