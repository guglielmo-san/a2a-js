export interface User {
  getName(): string;
  isAuthenticated(): boolean;
}

export class AuthenticatedUser implements User {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public isAuthenticated(): boolean {
    return true;
  }
}

export class unAuthenticatedUser implements User {
  public getName(): string {
    return 'unAuthenticatedUser';
  }

  public isAuthenticated(): boolean {
    return false;
  }
}
