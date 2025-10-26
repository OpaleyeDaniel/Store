import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '@/types';

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  image: string;
  priceCents: number;
  quantity: number;
  selectedVariant?: string;
  selectedSize?: string;
  slug: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalCents: number;
  subtotalCents: number;
  bundleDiscountCents: number;
  hasBundleDiscount: boolean;
}

type CartAction = 
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; itemId: string }
  | { type: 'UPDATE_QUANTITY'; itemId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalCents: 0,
  subtotalCents: 0,
  bundleDiscountCents: 0,
  hasBundleDiscount: false,
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalCents = items.reduce((sum, item) => sum + (item.priceCents * item.quantity), 0);
  
  // Apply bundle discount: 15% off when 2+ items
  const hasBundleDiscount = totalItems >= 2;
  const bundleDiscountCents = hasBundleDiscount ? Math.round(subtotalCents * 0.15) : 0;
  const totalCents = subtotalCents - bundleDiscountCents;
  
  return { 
    totalItems, 
    subtotalCents,
    bundleDiscountCents,
    totalCents,
    hasBundleDiscount
  };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newItems: CartItem[];
  
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        item => item.productId === action.item.productId && 
        item.selectedVariant === action.item.selectedVariant && 
        item.selectedSize === action.item.selectedSize
      );

      if (existingItemIndex > -1) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.item.quantity;
      } else {
        newItems = [...state.items, action.item];
      }
      
      const { totalItems: addTotalItems, totalCents: addTotalCents, subtotalCents: addSubtotalCents, bundleDiscountCents: addBundleDiscountCents, hasBundleDiscount: addHasBundleDiscount } = calculateTotals(newItems);
      return {
        items: newItems,
        totalItems: addTotalItems,
        totalCents: addTotalCents,
        subtotalCents: addSubtotalCents,
        bundleDiscountCents: addBundleDiscountCents,
        hasBundleDiscount: addHasBundleDiscount,
      };

    case 'REMOVE_ITEM':
      newItems = state.items.filter(item => item.id !== action.itemId);
      const { totalItems: removeTotalItems, totalCents: removeTotalCents, subtotalCents: removeSubtotalCents, bundleDiscountCents: removeBundleDiscountCents, hasBundleDiscount: removeHasBundleDiscount } = calculateTotals(newItems);
      return {
        items: newItems,
        totalItems: removeTotalItems,
        totalCents: removeTotalCents,
        subtotalCents: removeSubtotalCents,
        bundleDiscountCents: removeBundleDiscountCents,
        hasBundleDiscount: removeHasBundleDiscount,
      };

    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', itemId: action.itemId });
      }
      
      newItems = state.items.map(item =>
        item.id === action.itemId
          ? { ...item, quantity: action.quantity }
          : item
      );
      const { totalItems: updateTotalItems, totalCents: updateTotalCents, subtotalCents: updateSubtotalCents, bundleDiscountCents: updateBundleDiscountCents, hasBundleDiscount: updateHasBundleDiscount } = calculateTotals(newItems);
      return {
        items: newItems,
        totalItems: updateTotalItems,
        totalCents: updateTotalCents,
        subtotalCents: updateSubtotalCents,
        bundleDiscountCents: updateBundleDiscountCents,
        hasBundleDiscount: updateHasBundleDiscount,
      };

    case 'CLEAR_CART':
      return initialState;

    case 'LOAD_CART':
      const { totalItems: loadTotalItems, totalCents: loadTotalCents, subtotalCents: loadSubtotalCents, bundleDiscountCents: loadBundleDiscountCents, hasBundleDiscount: loadHasBundleDiscount } = calculateTotals(action.items);
      return {
        items: action.items,
        totalItems: loadTotalItems,
        totalCents: loadTotalCents,
        subtotalCents: loadSubtotalCents,
        bundleDiscountCents: loadBundleDiscountCents,
        hasBundleDiscount: loadHasBundleDiscount,
      };

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity: number, selectedVariant?: string, selectedSize?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: (productId: string, selectedVariant?: string, selectedSize?: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart-items');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', items });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart-items', JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.items]);

  const addItem = (product: Product, quantity: number, selectedVariant?: string, selectedSize?: string) => {
    const cartItem: CartItem = {
      id: `${product.id}-${selectedVariant || 'default'}-${selectedSize || 'default'}-${Date.now()}`,
      productId: product.id,
      title: product.title,
      image: product.variants[0]?.images[0]?.url || '/placeholder.svg',
      priceCents: selectedVariant ? 
        (product.variants?.find(v => v.colorName === selectedVariant)?.priceCents || product.priceCents) : 
        product.priceCents,
      quantity,
      selectedVariant,
      selectedSize,
      slug: product.slug,
    };

    dispatch({ type: 'ADD_ITEM', item: cartItem });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', itemId });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', itemId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemCount = (productId: string, selectedVariant?: string, selectedSize?: string) => {
    const item = state.items.find(
      item => item.productId === productId && 
      item.selectedVariant === selectedVariant && 
      item.selectedSize === selectedSize
    );
    return item?.quantity || 0;
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};