export type eventTier = {
  tierName: string;
  tierPrice: number;
  tierLimit: number;
};
export interface event {
  _id: string;
  eventTitle: string;
  eventType: string;
  date: Date;
  description: string;
  url: string;
  eventLocation: string;
  time: string;
  eventTiers: eventTier[];
  companyName: string;
}

export enum eventCategory {
  ALL = 'ALL',
  SHOW = 'SHOW',
  SPORTS = 'SPORTS',
  CONCERT = 'CONCERT',
  MOVIE = 'MOVIE',
  TRAVEL = 'TRAVEL',
  OTHER = 'OTHER',
}
