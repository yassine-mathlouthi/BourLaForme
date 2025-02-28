import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface StatusPriority {
  [key: string]: number;
}

export interface Order {
  idCommande: number;
  panier: {
    idPanier: number;
    sessionId: string;
    dateCreation: string;
    items: OrderItem[];
  };
  dateCommande: string;
  prixTotalCommande: number;
  adresseLivraison: string;
  ville: string;
  codePostal: string;
  pays: string;
  numeroTelephone: string;
  email: string;
  nomVisiteur: string;
  prenomVisiteur: string;
}

export interface OrderItem {
  idPanierItem: number;
  produit: {
    idProduit: number;
    nomProduit: string;
    descriptionProduit: string;
    prix: number;
    quantiteEnStock: number;
    imageProduit: string;
    boutique: {
      idBoutique: number;
      nomBoutique: string;
    };
  };
  quantite: number;
}

@Injectable({
  providedIn: 'root'
})
export class subscriptionService {
  private orders: Order[] = [
    {
      idCommande: 1,
      panier: {
        idPanier: 101,
        sessionId: 'abc123',
        dateCreation: '2025-02-28T12:00:00Z',
        items: [
          {
            idPanierItem: 201,
            produit: {
              idProduit: 301,
              nomProduit: 'Laptop',
              descriptionProduit: 'A powerful laptop',
              prix: 1200,
              quantiteEnStock: 10,
              imageProduit: 'laptop.jpg',
              boutique: {
                idBoutique: 401,
                nomBoutique: 'Tech Store'
              }
            },
            quantite: 1
          }
        ]
      },
      dateCommande: '2025-02-28T12:00:00Z',
      prixTotalCommande: 1200,
      adresseLivraison: '123 Main St',
      ville: 'Tunis',
      codePostal: '1000',
      pays: 'Tunisia',
      numeroTelephone: '+21612345678',
      email: 'customer@example.com',
      nomVisiteur: 'Mohamed',
      prenomVisiteur: 'Yassine'
    }
  ];

  constructor() { }

  getAllOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  getOrderById(orderId: number): Observable<Order | undefined> {
    const order = this.orders.find(o => o.idCommande === orderId);
    return of(order);
  }

  getOrderStatus(orderId: number): Observable<string> {
    return of('PENDING');
  }
}
