import { UserRole } from '../users/user.model';

export interface AuthResponseData {
  // amjerad davabruneb displaynames da userroles.
  // making everything optional for now !@!
  _id: string;
  email: string;
  role: UserRole; // admin, user, customer
  name: string;
  lastName?: string;
  companyName?: string;
  token: string;
  data: any;
}
