import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../commande.test-samples';

import { CommandeFormService } from './commande-form.service';

describe('Commande Form Service', () => {
  let service: CommandeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandeFormService);
  });

  describe('Service methods', () => {
    describe('createCommandeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCommandeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            referentiel: expect.any(Object),
            userId: expect.any(Object),
            dateCommande: expect.any(Object),
          }),
        );
      });

      it('passing ICommande should create a new form with FormGroup', () => {
        const formGroup = service.createCommandeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            referentiel: expect.any(Object),
            userId: expect.any(Object),
            dateCommande: expect.any(Object),
          }),
        );
      });
    });

    describe('getCommande', () => {
      it('should return NewCommande for default Commande initial value', () => {
        const formGroup = service.createCommandeFormGroup(sampleWithNewData);

        const commande = service.getCommande(formGroup) as any;

        expect(commande).toMatchObject(sampleWithNewData);
      });

      it('should return NewCommande for empty Commande initial value', () => {
        const formGroup = service.createCommandeFormGroup();

        const commande = service.getCommande(formGroup) as any;

        expect(commande).toMatchObject({});
      });

      it('should return ICommande', () => {
        const formGroup = service.createCommandeFormGroup(sampleWithRequiredData);

        const commande = service.getCommande(formGroup) as any;

        expect(commande).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICommande should not enable id FormControl', () => {
        const formGroup = service.createCommandeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCommande should disable id FormControl', () => {
        const formGroup = service.createCommandeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
