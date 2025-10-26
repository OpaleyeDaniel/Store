# Checkout Process Bug Report

## Overview
This document tracks critical bugs in the checkout process that prevent accurate order processing and create data inconsistencies between cart and checkout steps.

---

## Bug #1: Cart Data Not Syncing to Checkout Order Summary

### Current Behavior
- User adds items to cart with specific quantities and applies promo codes
- When proceeding to checkout steps, the order summary shows completely different items, quantities, and totals
- Cart shows: Arrival 7" Shorts ($26.00 x1) + Everyday Seamless Racerback Sports Bra ($26.00 x2) = $78.00 subtotal
- Checkout shows: Everyday Seamless Leggings ($58.00 x1) + Racerback Sports Bra ($26.00 x1) = $84.00 subtotal

### Expected Behavior
- Order summary in checkout steps should exactly match the current cart contents
- All items, quantities, colors, sizes, and totals should be identical between cart and checkout
- Cart modifications should immediately reflect in checkout order summary

### Steps to Reproduce
1. Add multiple items to cart with varying quantities
2. Apply a promo code (e.g., WELCOME10)
3. Navigate to cart page (/cart) - verify contents and totals
4. Click "Proceed to Checkout" 
5. Navigate through checkout steps and observe order summary
6. Compare cart contents vs checkout order summary

### Root Cause
- Checkout components are not properly reading from CartContext
- Order summary may be using mock/static data instead of live cart state
- Cart state is not being passed correctly between checkout steps

### Fix Required
- Ensure all checkout steps (CheckoutStep1, CheckoutStep2, CheckoutStep3) use `useCart()` hook
- Update order summary components to display `state.items` from cart context
- Remove any hardcoded/mock data in checkout order summaries

---

## Bug #2: Promo Code Discount Lost in Checkout

### Current Behavior
- Promo code "WELCOME10" successfully applied in cart with -$7.80 discount
- Discount completely disappears in checkout steps
- Cart total: $76.44 (with discount) → Checkout total: $90.72 (no discount)

### Expected Behavior
- Applied promo codes should persist through entire checkout flow
- Discount amounts should be displayed in all checkout step order summaries
- Final total should include all applicable discounts

### Steps to Reproduce
1. Add items to cart
2. Apply promo code "WELCOME10" in cart
3. Verify discount is applied and total is reduced
4. Proceed to checkout
5. Check order summary in payment step - discount is missing

### Root Cause
- Promo code state not being read from cart context in checkout
- Order summary components not displaying discount line items
- Cart discount calculations not carried forward to checkout

### Fix Required
- Update checkout order summaries to display `state.discounts` or `state.promoCode`
- Ensure discount calculations are included in checkout totals
- Add discount line item to all checkout step order summaries

---

## Bug #3: Missing Product Images in Order Confirmation

### Current Behavior
- Order confirmation page shows generic box icons instead of actual product images
- Product titles and prices are correct, but visual representation is missing

### Expected Behavior
- Order confirmation should display actual product images from cart items
- Each confirmed item should show the same image that was visible in cart and product pages

### Steps to Reproduce
1. Complete checkout process with items in cart
2. Navigate to order confirmation page (/checkout/confirmation)
3. Observe that product images are generic boxes, not actual product photos

### Root Cause
- Order confirmation component not accessing product image URLs
- Cart items may not be storing image references properly
- Checkout confirmation not mapping cart item images to display

### Fix Required
- Ensure cart items store product image URLs when added
- Update CheckoutStep4 (confirmation) to display `item.image` from cart items
- Replace generic box icons with actual product images from cart data

---

## Bug #4: Tax and Shipping Calculation Inconsistencies

### Current Behavior
- Cart shows tax: $6.24, shipping: FREE
- Checkout shows tax: $6.72, shipping: Free
- Tax calculations differ between cart and checkout despite same subtotal

### Expected Behavior
- Tax and shipping calculations should be identical between cart and checkout
- Same tax rate should be applied consistently
- Shipping rules should be identical

### Steps to Reproduce
1. Add items to cart and verify tax calculation
2. Proceed to checkout and compare tax amounts
3. Notice discrepancy in tax calculations

### Root Cause
- Different tax calculation logic in cart vs checkout components
- Possible rounding differences or different tax rates being applied

### Fix Required
- Centralize tax calculation logic in cart context or utility function
- Ensure both cart and checkout use same tax calculation method
- Verify tax rates and rounding rules are consistent

---

## Priority Levels
- **Critical**: Bug #1 (Cart data sync) - Prevents accurate order processing
- **High**: Bug #2 (Promo code loss) - Financial impact on customers
- **Medium**: Bug #3 (Missing images) - Poor user experience
- **Low**: Bug #4 (Tax inconsistency) - Minor calculation differences

---

## Testing Checklist
After fixes are implemented, verify:
- [ ] Cart contents exactly match checkout order summary
- [ ] Promo codes persist through entire checkout flow
- [ ] Product images display correctly in order confirmation
- [ ] Tax and shipping calculations are consistent
- [ ] Order totals match between cart, checkout, and confirmation
- [ ] All cart modifications immediately reflect in checkout