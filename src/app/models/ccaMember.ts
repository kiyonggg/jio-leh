export class CcaMember {
  id: string | undefined;
  userId: string | undefined;
  ccaId: string | undefined;
  isLeader: boolean | undefined;
  isOfficial: boolean | undefined;

  constructor(
    id?: string,
    userId?: string,
    ccaId?: string,
    isLeader?: boolean,
    isOfficial?: boolean,
  ) {
    this.id = id;
    this.userId = userId;
    this.ccaId = ccaId;
    this.isLeader = isLeader;
    this.isOfficial = isOfficial;
  }
}