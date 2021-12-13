import { Cca } from './cca';

export class User {
  uid: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  // ccas: Cca[] | undefined;

  constructor(
    uid?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    // ccas?: Cca[]
  ) {
    this.uid = uid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    // this.ccas = ccas;
  }
}