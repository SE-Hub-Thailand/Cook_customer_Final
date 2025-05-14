import { terSpacing } from './../../../node_modules/@mui/system/index.d';
// src/api/strapi/types.ts

import { N } from "vitest/dist/chunks/reporters.C_zwCd4j.js";

export interface Image {
    id: number;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
    alternativeText?: string;
    caption?: string;
  }

  export interface Bank {
    id: number;
    name: string;
  }

  export interface Redeem {
    customer: User;
    totalPoints: number;
    status: string;
    qrCode: string;
    productJsonArray: JSON;
    shop: Shop;
    date: string;
    time: string;
  }
export interface User {
    id: number;
    username: string;
    lineId: string;
    email: string;
    fullName: string;
    gender: string;
    address: string;
    // cardID: string;
    photoImage: File;
    telNumber: string;
    point: number;
}

export interface Shop {
    id: number;
    name: string;
    location: string;
    latitude: string;
    longitude: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    bookBankNumber: string | null;
    // image: number;  // Assuming this is the ID of the uploaded image
    bookBankImage: Image;  // Assuming this is the ID of the uploaded image
    bankName: Bank;  // Bank relationship
    user: User;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    approved: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    shop: Shop;
}

export interface RecycleMachine {
    id: number;
    location: string;
    latitude: string;
    longitude: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface OilMachine {
    id: number;
    location: string;
    latitude: string;
    longitude: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}
