export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: number;
  date: string;

  createdAt: string;
  createdBy: string;

  updatedAt?: string;
  updatedBy?: string;

  isDeleted: boolean;
}
