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
import { SignInParams, SignUpParams, User } from '../../models/user';
import { Router } from '@angular/router';
import { Order } from '../../models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItems[];
  user: User | undefined;

  loading: boolean;
  selectedProductId: string | undefined;
};

export const EcommerceStore = signalStore(
  { providedIn: 'root' },
  withState({
    products: [
      {
        id: '1',
        name: 'Wireless Headphones',
        description: 'High-quality wireless sound with noise cancellation.',
        price: 59.99,
        imageUrl:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
        rating: 4.5,
        reviewCount: 120,
        inStock: true,
        category: 'Electronics',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userName: 'John Carter',
            userImageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
            rating: 5,
            title: 'Amazing Sound',
            comment: 'Noise cancellation works perfectly and battery life is great.',
            reviewDate: new Date('2026-01-12'),
          },
          {
            id: 'r2',
            productId: '1',
            userName: 'Emily Stone',
            userImageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
            rating: 4,
            title: 'Very Comfortable',
            comment: 'Comfortable for long listening sessions.',
            reviewDate: new Date('2026-02-03'),
          },
        ],
      },
      {
        id: '2',
        name: 'Smart Watch',
        description: 'Track fitness and notifications on the go.',
        price: 89.99,
        imageUrl:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
        rating: 4.2,
        reviewCount: 95,
        inStock: true,
        category: 'Electronics',
        reviews: [
          {
            id: 'r3',
            productId: '2',
            userName: 'Michael Lee',
            userImageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
            rating: 4,
            title: 'Great Fitness Tracking',
            comment: 'Tracks steps and heart rate accurately.',
            reviewDate: new Date('2026-01-20'),
          },
          {
            id: 'r4',
            productId: '2',
            userName: 'Sophia Adams',
            userImageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
            rating: 5,
            title: 'Excellent Watch',
            comment: 'Stylish design and smooth notifications.',
            reviewDate: new Date('2026-02-14'),
          },
        ],
      },
      {
        id: '3',
        name: 'Gaming Mouse',
        description: 'Precision mouse with RGB lighting.',
        price: 29.99,
        imageUrl:
          'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=800&auto=format&fit=crop',
        rating: 4.6,
        reviewCount: 210,
        inStock: true,
        category: 'Accessories',
        reviews: [
          {
            id: 'r5',
            productId: '3',
            userName: 'Daniel Brown',
            userImageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
            rating: 5,
            title: 'Perfect for Gaming',
            comment: 'Very responsive and comfortable grip.',
            reviewDate: new Date('2026-03-02'),
          },
          {
            id: 'r6',
            productId: '3',
            userName: 'Olivia Wilson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
            rating: 4,
            title: 'Nice RGB Effects',
            comment: 'Looks awesome on my setup.',
            reviewDate: new Date('2026-03-10'),
          },
        ],
      },
      {
        id: '4',
        name: 'Mechanical Keyboard',
        description: 'Tactile keys with customizable lighting.',
        price: 79.99,
        imageUrl:
          'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop',
        rating: 4.7,
        reviewCount: 180,
        inStock: true,
        category: 'Accessories',
        reviews: [
          {
            id: 'r7',
            productId: '4',
            userName: 'Chris Evans',
            userImageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
            rating: 5,
            title: 'Best Keyboard',
            comment: 'Typing feels satisfying and fast.',
            reviewDate: new Date('2026-02-18'),
          },
          {
            id: 'r8',
            productId: '4',
            userName: 'Natalie Green',
            userImageUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
            rating: 4,
            title: 'Solid Build',
            comment: 'Excellent quality and customizable lights.',
            reviewDate: new Date('2026-03-01'),
          },
        ],
      },
      {
        id: '5',
        name: 'Bluetooth Speaker',
        description: 'Portable speaker with deep bass.',
        price: 45.0,
        imageUrl:
          'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=800&auto=format&fit=crop',
        rating: 4.3,
        reviewCount: 140,
        inStock: true,
        category: 'Electronics',
        reviews: [
          {
            id: 'r9',
            productId: '5',
            userName: 'Kevin Smith',
            userImageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
            rating: 4,
            title: 'Good Bass',
            comment: 'Portable and loud enough for outdoor use.',
            reviewDate: new Date('2026-01-30'),
          },
          {
            id: 'r10',
            productId: '5',
            userName: 'Emma White',
            userImageUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
            rating: 5,
            title: 'Worth the Price',
            comment: 'Battery lasts long and sound is clean.',
            reviewDate: new Date('2026-02-21'),
          },
        ],
      },
      {
        id: '6',
        name: 'Laptop Stand',
        description: 'Ergonomic stand for better posture.',
        price: 25.99,
        imageUrl:
          'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
        rating: 4.4,
        reviewCount: 60,
        inStock: true,
        category: 'Office',
        reviews: [
          {
            id: 'r11',
            productId: '6',
            userName: 'Ryan Walker',
            userImageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
            rating: 4,
            title: 'Helpful for Posture',
            comment: 'Reduced neck pain during work.',
            reviewDate: new Date('2026-01-11'),
          },
          {
            id: 'r12',
            productId: '6',
            userName: 'Grace Hall',
            userImageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
            rating: 5,
            title: 'Very Stable',
            comment: 'Strong material and lightweight.',
            reviewDate: new Date('2026-02-08'),
          },
        ],
      },
      {
        id: '7',
        name: 'USB-C Hub',
        description: 'Expand your laptop connectivity.',
        price: 34.99,
        imageUrl:
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop',
        rating: 4.1,
        reviewCount: 75,
        inStock: true,
        category: 'Accessories',
        reviews: [
          {
            id: 'r13',
            productId: '7',
            userName: 'Liam Turner',
            userImageUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
            rating: 4,
            title: 'Useful Hub',
            comment: 'Works perfectly with my laptop.',
            reviewDate: new Date('2026-02-10'),
          },
          {
            id: 'r14',
            productId: '8',
            userName: 'Ava Mitchell',
            userImageUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
            rating: 5,
            title: 'Super Fast',
            comment: 'File transfers are incredibly quick.',
            reviewDate: new Date('2026-02-12'),
          },
          {
            id: 'r15',
            productId: '9',
            userName: 'Noah Harris',
            userImageUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
            rating: 4,
            title: 'Bright Lamp',
            comment: 'Brightness adjustment works well.',
            reviewDate: new Date('2026-02-14'),
          },
        ],
      },
      {
        id: '8',
        name: 'External SSD',
        description: 'Fast and portable storage solution.',
        price: 99.99,
        imageUrl:
          'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop',
        rating: 4.8,
        reviewCount: 220,
        inStock: true,
        category: 'Storage',
        reviews: [
          {
            id: 'r16',
            productId: '10',
            userName: 'Mia Young',
            userImageUrl: 'https://randomuser.me/api/portraits/women/16.jpg',
            rating: 5,
            title: 'Comfortable Chair',
            comment: 'Very supportive during long work hours.',
            reviewDate: new Date('2026-02-16'),
          },
          {
            id: 'r17',
            productId: '11',
            userName: 'James King',
            userImageUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
            rating: 4,
            title: 'Lightweight Shoes',
            comment: 'Great for jogging and daily use.',
            reviewDate: new Date('2026-02-18'),
          },
          {
            id: 'r18',
            productId: '12',
            userName: 'Charlotte Scott',
            userImageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
            rating: 5,
            title: 'Spacious Backpack',
            comment: 'Fits my laptop and books easily.',
            reviewDate: new Date('2026-02-20'),
          },
        ],
      },
      {
        id: '9',
        name: 'Desk Lamp',
        description: 'LED lamp with adjustable brightness.',
        price: 19.99,
        imageUrl:
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop',
        rating: 4.2,
        reviewCount: 50,
        inStock: true,
        category: 'Home',
      },
      {
        id: '10',
        name: 'Office Chair',
        description: 'Comfortable ergonomic chair.',
        price: 149.99,
        imageUrl:
          'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=800&auto=format&fit=crop',
        rating: 4.6,
        reviewCount: 310,
        inStock: false,
        category: 'Furniture',
        reviews: [
          {
            id: 'r19',
            productId: '13',
            userName: 'Benjamin Baker',
            userImageUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
            rating: 4,
            title: 'Stylish Shades',
            comment: 'Looks great and blocks sunlight well.',
            reviewDate: new Date('2026-02-22'),
          },
          {
            id: 'r20',
            productId: '14',
            userName: 'Amelia Rivera',
            userImageUrl: 'https://randomuser.me/api/portraits/women/20.jpg',
            rating: 5,
            title: 'Keeps Water Cold',
            comment: 'Excellent insulation throughout the day.',
            reviewDate: new Date('2026-02-24'),
          },
          {
            id: 'r21',
            productId: '15',
            userName: 'Lucas Cooper',
            userImageUrl: 'https://randomuser.me/api/portraits/men/21.jpg',
            rating: 4,
            title: 'Comfortable Mat',
            comment: 'Good grip and cushioning.',
            reviewDate: new Date('2026-02-26'),
          },
        ],
      },
      {
        id: '11',
        name: 'Running Shoes',
        description: 'Lightweight and breathable.',
        price: 69.99,
        imageUrl:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
        rating: 4.3,
        reviewCount: 170,
        inStock: true,
        category: 'Fashion',
        reviews: [
          {
            id: 'r22',
            productId: '16',
            userName: 'Harper Bennett',
            userImageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
            rating: 5,
            title: 'Solid Weights',
            comment: 'Perfect for home workouts.',
            reviewDate: new Date('2026-02-28'),
          },
          {
            id: 'r23',
            productId: '17',
            userName: 'Henry Flores',
            userImageUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
            rating: 5,
            title: 'Makes Great Coffee',
            comment: 'Brews quickly and tastes amazing.',
            reviewDate: new Date('2026-03-01'),
          },
          {
            id: 'r24',
            productId: '18',
            userName: 'Evelyn Morris',
            userImageUrl: 'https://randomuser.me/api/portraits/women/24.jpg',
            rating: 4,
            title: 'Powerful Blender',
            comment: 'Smoothies come out perfectly blended.',
            reviewDate: new Date('2026-03-03'),
          },
        ],
      },
      {
        id: '12',
        name: 'Backpack',
        description: 'Durable and spacious backpack.',
        price: 39.99,
        imageUrl:
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop',
        rating: 4.5,
        reviewCount: 88,
        inStock: true,
        category: 'Fashion',
        reviews: [
          {
            id: 'r25',
            productId: '19',
            userName: 'Alexander Reed',
            userImageUrl: 'https://randomuser.me/api/portraits/men/25.jpg',
            rating: 5,
            title: 'Excellent Air Fryer',
            comment: 'Food turns crispy with little oil.',
            reviewDate: new Date('2026-03-05'),
          },
          {
            id: 'r26',
            productId: '20',
            userName: 'Ella Cook',
            userImageUrl: 'https://randomuser.me/api/portraits/women/26.jpg',
            rating: 4,
            title: 'Fast Heating',
            comment: 'Boils water within minutes.',
            reviewDate: new Date('2026-03-07'),
          },
        ],
      },
      {
        id: '13',
        name: 'Sunglasses',
        description: 'UV protection stylish shades.',
        price: 24.99,
        imageUrl:
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop',
        rating: 4.1,
        reviewCount: 65,
        inStock: true,
        category: 'Fashion',
        reviews: [],
      },
      {
        id: '14',
        name: 'Water Bottle',
        description: 'Insulated stainless steel bottle.',
        price: 18.99,
        imageUrl:
          'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop',
        rating: 4.4,
        reviewCount: 102,
        inStock: true,
        category: 'Lifestyle',
        reviews: [
          {
            id: 'r27',
            productId: '21',
            userName: 'Daniel Morgan',
            userImageUrl: 'https://randomuser.me/api/portraits/men/27.jpg',
            rating: 4,
            title: 'Nice Notebook',
            comment: 'Paper quality feels premium.',
            reviewDate: new Date('2026-03-09'),
          },
        ],
      },
      {
        id: '15',
        name: 'Yoga Mat',
        description: 'Non-slip comfortable mat.',
        price: 22.99,
        imageUrl:
          'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
        rating: 4.3,
        reviewCount: 77,
        inStock: true,
        category: 'Fitness',
        reviews: [],
      },
      {
        id: '16',
        name: 'Dumbbell Set',
        description: 'Adjustable weights for home workout.',
        price: 59.99,
        imageUrl:
          'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
        rating: 4.6,
        reviewCount: 134,
        inStock: true,
        category: 'Fitness',
        reviews: [
          {
            id: 'r28',
            productId: '22',
            userName: 'Scarlett Bell',
            userImageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
            rating: 5,
            title: 'Smooth Pens',
            comment: 'Ink flow is very consistent.',
            reviewDate: new Date('2026-03-11'),
          },
          {
            id: 'r29',
            productId: '23',
            userName: 'Matthew Ward',
            userImageUrl: 'https://randomuser.me/api/portraits/men/29.jpg',
            rating: 4,
            title: 'Looks Modern',
            comment: 'Matches perfectly with my room decor.',
            reviewDate: new Date('2026-03-13'),
          },
        ],
      },
      {
        id: '17',
        name: 'Coffee Maker',
        description: 'Brew perfect coffee every morning.',
        price: 79.99,
        imageUrl:
          'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=800&auto=format&fit=crop',
        rating: 4.5,
        reviewCount: 156,
        inStock: true,
        category: 'Kitchen',
        reviews: [
          {
            id: 'r30',
            productId: '24',
            userName: 'Victoria Cox',
            userImageUrl: 'https://randomuser.me/api/portraits/women/30.jpg',
            rating: 5,
            title: 'Beautiful Pot',
            comment: 'Looks elegant with indoor plants.',
            reviewDate: new Date('2026-03-15'),
          },
          {
            id: 'r31',
            productId: '25',
            userName: 'Joseph Diaz',
            userImageUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
            rating: 4,
            title: 'Cools Quickly',
            comment: 'Compact but powerful fan.',
            reviewDate: new Date('2026-03-17'),
          },
        ],
      },
      {
        id: '18',
        name: 'Blender',
        description: 'Powerful blender for smoothies.',
        price: 49.99,
        imageUrl:
          'https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=800&auto=format&fit=crop',
        rating: 4.2,
        reviewCount: 93,
        inStock: true,
        category: 'Kitchen',
        reviews: [],
      },
      {
        id: '19',
        name: 'Air Fryer',
        description: 'Healthy cooking with less oil.',
        price: 119.99,
        imageUrl:
          'https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=800&auto=format&fit=crop',
        rating: 4.7,
        reviewCount: 240,
        inStock: true,
        category: 'Kitchen',
        reviews: [
          {
            id: 'r32',
            productId: '1',
            userName: 'Hannah Foster',
            userImageUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
            rating: 5,
            title: 'Excellent Audio',
            comment: 'Crystal clear sound quality.',
            reviewDate: new Date('2026-03-19'),
          },
          {
            id: 'r33',
            productId: '2',
            userName: 'David Price',
            userImageUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
            rating: 4,
            title: 'Very Handy',
            comment: 'Useful features and good battery life.',
            reviewDate: new Date('2026-03-21'),
          },
        ],
      },
      {
        id: '20',
        name: 'Electric Kettle',
        description: 'Fast boiling kettle.',
        price: 29.99,
        imageUrl:
          'https://images.unsplash.com/photo-1570829460005-c840387bb1ca?q=80&w=800&auto=format&fit=crop',
        rating: 4.4,
        reviewCount: 110,
        inStock: true,
        category: 'Kitchen',
        reviews: [
          {
            id: 'r34',
            productId: '3',
            userName: 'Lily Hughes',
            userImageUrl: 'https://randomuser.me/api/portraits/women/34.jpg',
            rating: 5,
            title: 'Responsive Mouse',
            comment: 'Perfect sensitivity for gaming.',
            reviewDate: new Date('2026-03-23'),
          },
          {
            id: 'r35',
            productId: '4',
            userName: 'Andrew Perry',
            userImageUrl: 'https://randomuser.me/api/portraits/men/35.jpg',
            rating: 5,
            title: 'Great Typing Feel',
            comment: 'Keys feel smooth and responsive.',
            reviewDate: new Date('2026-03-25'),
          },
        ],
      },
      {
        id: '21',
        name: 'Notebook',
        description: 'Premium quality paper notebook.',
        price: 9.99,
        imageUrl:
          'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop',
        rating: 4.1,
        reviewCount: 45,
        inStock: true,
        category: 'Office',
        reviews: [],
      },
      {
        id: '22',
        name: 'Pen Set',
        description: 'Smooth writing gel pens.',
        price: 12.99,
        imageUrl:
          'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop',
        rating: 4.3,
        reviewCount: 52,
        inStock: true,
        category: 'Office',
        reviews: [
          {
            id: 'r36',
            productId: '5',
            userName: 'Zoey Richardson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/36.jpg',
            rating: 4,
            title: 'Portable Speaker',
            comment: 'Easy to carry and sounds great.',
            reviewDate: new Date('2026-03-27'),
          },
          {
            id: 'r37',
            productId: '6',
            userName: 'Gabriel Watson',
            userImageUrl: 'https://randomuser.me/api/portraits/men/37.jpg',
            rating: 5,
            title: 'Very Practical',
            comment: 'Improved my desk setup significantly.',
            reviewDate: new Date('2026-03-29'),
          },
        ],
      },
      {
        id: '23',
        name: 'Wall Clock',
        description: 'Modern minimal wall clock.',
        price: 27.99,
        imageUrl:
          'https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=800&auto=format&fit=crop',
        rating: 4.2,
        reviewCount: 67,
        inStock: true,
        category: 'Home',
        reviews: [],
      },
      {
        id: '24',
        name: 'Plant Pot',
        description: 'Decorative indoor plant pot.',
        price: 15.99,
        imageUrl:
          'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop',
        rating: 4.5,
        reviewCount: 39,
        inStock: true,
        category: 'Home',
        reviews: [],
      },
      {
        id: '25',
        name: 'Table Fan',
        description: 'Compact and powerful cooling.',
        price: 35.99,
        imageUrl:
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
        rating: 4.3,
        reviewCount: 81,
        inStock: true,
        category: 'Appliances',
        reviews: [
          {
            id: 'r38',
            productId: '6',
            userName: 'Gabriel Watson',
            userImageUrl: 'https://randomuser.me/api/portraits/men/37.jpg',
            rating: 5,
            title: 'Very Practical',
            comment: 'Improved my desk setup significantly.',
            reviewDate: new Date('2026-03-29'),
          },
        ],
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
  } as EcommerceState),

  withStorageSync({
    key: 'modern-store',
    select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
  }),

  withComputed(({ category, products, wishlistItems, cartItems, selectedProductId }) => ({
    filteredProducts: computed(() => {
      if (category() === 'All') {
        return products();
      }
      return products().filter((p) => p.category.toLowerCase() === category().toLowerCase());
    }),

    wishlistCount: computed(() => wishlistItems().length),

    cartCount: computed(() => cartItems().reduce((total, item) => total + item.quantity, 0)),

    selectedProduct: computed(() => products().find((p) => p.id === selectedProductId())),
  })),

  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),

      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectedProductId: productId });
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

      addToCart: (product: Product, quantity: number) => {
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

      setItemQuantity(params: { productId: string; quantity: number }) {
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
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }
        router.navigate(['/checkout']);
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

      signOut: () => {
        patchState(store, { user: undefined });
      },

      signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
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

      placeOrder: async () => {
        patchState(store, { loading: true });

        const user = store.user();

        if (!user) {
          toaster.error('Please Login before placing the order');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id || '',
          total: store
            .cartItems()
            .reduce((acc, item) => acc + item.quantity * item.product.price, 0),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });

        router.navigate(['order-success']);
      },
    }),
  ),
);
