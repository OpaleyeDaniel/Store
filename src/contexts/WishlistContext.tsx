import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '@/types';

interface WishlistItem {
  product: Product;
  dateAdded: Date;
}

interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      // Check if item already exists
      if (state.items.some(item => item.product.id === action.payload.id)) {
        return state;
      }
      const newItem: WishlistItem = {
        product: action.payload,
        dateAdded: new Date(),
      };
      const updatedItems = [...state.items, newItem];
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.length,
      };

    case 'REMOVE_FROM_WISHLIST':
      const filteredItems = state.items.filter(item => item.product.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        totalItems: filteredItems.length,
      };

    case 'CLEAR_WISHLIST':
      return {
        items: [],
        totalItems: 0,
      };

    case 'LOAD_WISHLIST':
      return {
        items: action.payload,
        totalItems: action.payload.length,
      };

    default:
      return state;
  }
};

interface WishlistContextType {
  state: WishlistState;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    totalItems: 0,
  });

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        const wishlistItems = parsedWishlist.map((item: any) => ({
          ...item,
          dateAdded: new Date(item.dateAdded),
        }));
        dispatch({ type: 'LOAD_WISHLIST', payload: wishlistItems });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.product.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        state,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};