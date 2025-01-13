import dayjs from 'dayjs/esm';

export interface ICommande {
  id: number;
  referentiel?: string | null;
  userId?: string | null;
  dateCommande?: dayjs.Dayjs | null;
}

export type NewCommande = Omit<ICommande, 'id'> & { id: null };
