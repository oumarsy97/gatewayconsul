import dayjs from 'dayjs/esm';

import { ICommande, NewCommande } from './commande.model';

export const sampleWithRequiredData: ICommande = {
  id: 3263,
  referentiel: 'population du Québec hors bien que',
  userId: 'sans que',
  dateCommande: dayjs('2025-01-09T13:34'),
};

export const sampleWithPartialData: ICommande = {
  id: 6427,
  referentiel: 'outre guide',
  userId: 'ronron conseil d’administration',
  dateCommande: dayjs('2025-01-09T02:02'),
};

export const sampleWithFullData: ICommande = {
  id: 32566,
  referentiel: 'plouf souhaiter',
  userId: 'à travers badaboum',
  dateCommande: dayjs('2025-01-09T07:03'),
};

export const sampleWithNewData: NewCommande = {
  referentiel: 'camarade tant que',
  userId: 'ha actionnaire vétuste',
  dateCommande: dayjs('2025-01-09T00:13'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
