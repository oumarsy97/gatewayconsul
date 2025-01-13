import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'gateway2App.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'produit',
    data: { pageTitle: 'gateway2App.service1Produit.home.title' },
    loadChildren: () => import('./service1/produit/produit.routes'),
  },
  {
    path: 'commande',
    data: { pageTitle: 'gateway2App.commandesCommande.home.title' },
    loadChildren: () => import('./commandes/commande/commande.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
