import { CartItems } from './cart';

export type Order = {
  id: string;
  userId: string;
  total: number;
  items: CartItems[];
  paymentStatus: 'success' | 'failure';
};
