import { computed, inject } from '@angular/core';
import { Product } from '../../models/products';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from '../services/toaster';
import { CartItems } from '../../models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../components/sign-in-dialog/sign-in-dialog';
import { SignInParams, User } from '../../models/user';
import { Router } from '@angular/router';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItems[];
  user: User | undefined;
};

export const EcommerceStore = signalStore(
  { providedIn: 'root' },
  withState({
    products: [
      {
        id: 1,
        name: 'Wireless Headphones',
        description: 'High-quality wireless sound with noise cancellation.',
        price: 59.99,
        imageUrl: 'https://picsum.photos/seed/p1/400/300',
        rating: '4.5',
        reviewCount: 120,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: 2,
        name: 'Smart Watch',
        description: 'Track fitness and notifications on the go.',
        price: 89.99,
        imageUrl: 'https://picsum.photos/seed/p2/400/300',
        rating: '4.2',
        reviewCount: 95,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: 3,
        name: 'Gaming Mouse',
        description: 'Precision mouse with RGB lighting.',
        price: 29.99,
        imageUrl: 'https://picsum.photos/seed/p3/400/300',
        rating: '4.6',
        reviewCount: 210,
        inStock: true,
        category: 'Accessories',
      },
      {
        id: 4,
        name: 'Mechanical Keyboard',
        description: 'Tactile keys with customizable lighting.',
        price: 79.99,
        imageUrl: 'https://picsum.photos/seed/p4/400/300',
        rating: '4.7',
        reviewCount: 180,
        inStock: true,
        category: 'Accessories',
      },
      {
        id: 5,
        name: 'Bluetooth Speaker',
        description: 'Portable speaker with deep bass.',
        price: 45.0,
        imageUrl: 'https://picsum.photos/seed/p5/400/300',
        rating: '4.3',
        reviewCount: 140,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: 6,
        name: 'Laptop Stand',
        description: 'Ergonomic stand for better posture.',
        price: 25.99,
        imageUrl: 'https://picsum.photos/seed/p6/400/300',
        rating: '4.4',
        reviewCount: 60,
        inStock: true,
        category: 'Office',
      },
      {
        id: 7,
        name: 'USB-C Hub',
        description: 'Expand your laptop connectivity.',
        price: 34.99,
        imageUrl: 'https://picsum.photos/seed/p7/400/300',
        rating: '4.1',
        reviewCount: 75,
        inStock: true,
        category: 'Accessories',
      },
      {
        id: 8,
        name: 'External SSD',
        description: 'Fast and portable storage solution.',
        price: 99.99,
        imageUrl: 'https://picsum.photos/seed/p8/400/300',
        rating: '4.8',
        reviewCount: 220,
        inStock: true,
        category: 'Storage',
      },
      {
        id: 9,
        name: 'Desk Lamp',
        description: 'LED lamp with adjustable brightness.',
        price: 19.99,
        imageUrl: 'https://picsum.photos/seed/p9/400/300',
        rating: '4.2',
        reviewCount: 50,
        inStock: true,
        category: 'Home',
      },
      {
        id: 10,
        name: 'Office Chair',
        description: 'Comfortable ergonomic chair.',
        price: 149.99,
        imageUrl: 'https://picsum.photos/seed/p10/400/300',
        rating: '4.6',
        reviewCount: 310,
        inStock: false,
        category: 'Furniture',
      },
      {
        id: 11,
        name: 'Running Shoes',
        description: 'Lightweight and breathable.',
        price: 69.99,
        imageUrl: 'https://picsum.photos/seed/p11/400/300',
        rating: '4.3',
        reviewCount: 170,
        inStock: true,
        category: 'Fashion',
      },
      {
        id: 12,
        name: 'Backpack',
        description: 'Durable and spacious backpack.',
        price: 39.99,
        imageUrl: 'https://picsum.photos/seed/p12/400/300',
        rating: '4.5',
        reviewCount: 88,
        inStock: true,
        category: 'Fashion',
      },
      {
        id: 13,
        name: 'Sunglasses',
        description: 'UV protection stylish shades.',
        price: 24.99,
        imageUrl: 'https://picsum.photos/seed/p13/400/300',
        rating: '4.1',
        reviewCount: 65,
        inStock: true,
        category: 'Fashion',
      },
      {
        id: 14,
        name: 'Water Bottle',
        description: 'Insulated stainless steel bottle.',
        price: 18.99,
        imageUrl: 'https://picsum.photos/seed/p14/400/300',
        rating: '4.4',
        reviewCount: 102,
        inStock: true,
        category: 'Lifestyle',
      },
      {
        id: 15,
        name: 'Yoga Mat',
        description: 'Non-slip comfortable mat.',
        price: 22.99,
        imageUrl: 'https://picsum.photos/seed/p15/400/300',
        rating: '4.3',
        reviewCount: 77,
        inStock: true,
        category: 'Fitness',
      },
      {
        id: 16,
        name: 'Dumbbell Set',
        description: 'Adjustable weights for home workout.',
        price: 59.99,
        imageUrl: 'https://picsum.photos/seed/p16/400/300',
        rating: '4.6',
        reviewCount: 134,
        inStock: true,
        category: 'Fitness',
      },
      {
        id: 17,
        name: 'Coffee Maker',
        description: 'Brew perfect coffee every morning.',
        price: 79.99,
        imageUrl: 'https://picsum.photos/seed/p17/400/300',
        rating: '4.5',
        reviewCount: 156,
        inStock: true,
        category: 'Kitchen',
      },
      {
        id: 18,
        name: 'Blender',
        description: 'Powerful blender for smoothies.',
        price: 49.99,
        imageUrl: 'https://picsum.photos/seed/p18/400/300',
        rating: '4.2',
        reviewCount: 93,
        inStock: true,
        category: 'Kitchen',
      },
      {
        id: 19,
        name: 'Air Fryer',
        description: 'Healthy cooking with less oil.',
        price: 119.99,
        imageUrl: 'https://picsum.photos/seed/p19/400/300',
        rating: '4.7',
        reviewCount: 240,
        inStock: true,
        category: 'Kitchen',
      },
      {
        id: 20,
        name: 'Electric Kettle',
        description: 'Fast boiling kettle.',
        price: 29.99,
        imageUrl: 'https://picsum.photos/seed/p20/400/300',
        rating: '4.4',
        reviewCount: 110,
        inStock: true,
        category: 'Kitchen',
      },
      {
        id: 21,
        name: 'Notebook',
        description: 'Premium quality paper notebook.',
        price: 9.99,
        imageUrl: 'https://picsum.photos/seed/p21/400/300',
        rating: '4.1',
        reviewCount: 45,
        inStock: true,
        category: 'Office',
      },
      {
        id: 22,
        name: 'Pen Set',
        description: 'Smooth writing gel pens.',
        price: 12.99,
        imageUrl: 'https://picsum.photos/seed/p22/400/300',
        rating: '4.3',
        reviewCount: 52,
        inStock: true,
        category: 'Office',
      },
      {
        id: 23,
        name: 'Wall Clock',
        description: 'Modern minimal wall clock.',
        price: 27.99,
        imageUrl: 'https://picsum.photos/seed/p23/400/300',
        rating: '4.2',
        reviewCount: 67,
        inStock: true,
        category: 'Home',
      },
      {
        id: 24,
        name: 'Plant Pot',
        description: 'Decorative indoor plant pot.',
        price: 15.99,
        imageUrl: 'https://picsum.photos/seed/p24/400/300',
        rating: '4.5',
        reviewCount: 39,
        inStock: true,
        category: 'Home',
      },
      {
        id: 25,
        name: 'Table Fan',
        description: 'Compact and powerful cooling.',
        price: 35.99,
        imageUrl: 'https://picsum.photos/seed/p25/400/300',
        rating: '4.3',
        reviewCount: 81,
        inStock: true,
        category: 'Appliances',
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
  } as EcommerceState),

  withComputed(({ category, products, wishlistItems, cartItems }) => ({
    filteredProducts: computed(() => {
      if (category() === 'All') {
        return products();
      }
      return products().filter((p) => p.category.toLowerCase() === category().toLowerCase());
    }),

    wishlistCount: computed(() => wishlistItems().length),

    cartCount: computed(() => cartItems().reduce((total, item) => total + item.quantity, 0)),
  })),
  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),

      addToWishlist: (products: Product) => {
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === products.id)) {
            draft.push(products);
          }
        });
        patchState(store, { wishlistItems: updatedWishlistItems });
        toaster.success(`${products.name} added to wishlist!`);
      },

      removeFromWishlist: (products: Product) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== products.id),
        });
        toaster.success(`${products.name} removed from wishlist!`);
      },

      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
        toaster.success('Wishlist cleared!');
      },

      addToCart: (product: Product, quantity: 1) => {
        const existingItemIndex = store
          .cartItems()
          .findIndex((item) => item.product.id === product.id);

        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }
          draft.push({ product, quantity });
        });
        patchState(store, { cartItems: updatedCartItems });
        toaster.success(
          existingItemIndex !== -1
            ? `${product.name} quantity updated in cart!`
            : `${product.name} added to cart!`,
        );
      },

      setItemQuantity(params: { productId: number; quantity: number }) {
        const index = store.cartItems().findIndex((item) => item.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });
        patchState(store, { cartItems: updated });
      },

      addAllWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((item) => {
            if (!draft.find((c) => c.product.id === item.id)) {
              draft.push({ product: item, quantity: 1 });
            }
          });
        });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
      },

      moveToWishlist: (product: Product) => {
        const updatedCartItems = store.cartItems().filter((p) => p.product.id !== product.id);

        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });

        patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
      },

      removeFromCart: (product: Product) => {
        patchState(store, {
          cartItems: store.cartItems().filter((c) => c.product.id !== product.id),
        });
      },

      proceedToCheckout: () => {
        matDialog.open(SignInDialog, {
          disableClose: true,
          data: {
            checkout: true,
          },
        });
      },

      signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: '001',
            email,
            name: 'Yukthi Isuranga',
            imageUrl: 'https://i.pravatar.cc/300',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },
    }),
  ),
);
