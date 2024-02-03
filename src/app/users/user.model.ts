export enum UserRole {
  ADMIN = 'ADMIN',
  ORGANIZER = 'ORGANIZER',
  CUSTOMER = 'CUSTOMER',
}

export interface User {
  _id: string;
  name: string;
  email: string;
  lastName?: string;
  role: string;
  balance: number;
  myTickets: any[];
  __v: number;
  companyName?: string;
  approved?: boolean;
}
export class UserC {
  // !@!
  constructor(
    private _id: string,
    private email: string,
    private role: UserRole,
    private name: string,
    private companyName?: string,
    private lastName?: string
  ) {
    // unda iyos authresponsedatamodelis mixedvit
    this._id = _id;
    this.email = email;
    this.role = role;
    this.name = name;
    if (role === UserRole.ORGANIZER) {
      this.companyName = companyName;
    } else this.lastName = lastName;
  }
  public getEmail() {
    return this.email;
  }
  public getRole() {
    return this.role;
  }
  public getDisplayName() {
    return this.name;
  }
  public getCompanyName() {
    return this.companyName;
  }
  public getId() {
    return this._id;
  }
  public isAdmin() {
    return this.role === UserRole.ADMIN;
  }
  public isCompany() {
    return this.role === UserRole.ORGANIZER;
  }
}
