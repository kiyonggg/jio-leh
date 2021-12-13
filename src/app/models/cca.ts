import { CcaMember } from './ccaMember';

export class Cca {
  id: string | undefined;
  name: string | undefined;
  img: string | undefined;
  members: CcaMember[];

  constructor(
    id?: string,
    name?: string,
    img?: string,
    members?: CcaMember[]
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.members = members;
  }
}
