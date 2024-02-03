import { eventTier } from '../events/events.model';

export interface Post {
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
export interface PostResponse {
  events: Post[];
  total: number;
  numOfPages: number;
  currentPage: number;
}
