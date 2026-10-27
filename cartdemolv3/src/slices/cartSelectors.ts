// slices/cartSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export const selectCartItems = (state: RootState) => state.cart?.items || [];
export const selectDiscountCode = (state: RootState) => state.cart?.discountCode || null;
export const selectTaxRate = (state: RootState) => state.cart?.taxRate ?? 0.1;
export const selectShippingCost = (state: RootState) => state.cart?.shippingCost ?? 10;

// Subtotal (tổng trước thuế)
export const selectSubtotal = createSelector(
    [selectCartItems],
    (items = []) => (Array.isArray(items) ? items : []).reduce(
        (total, item) => total + (Number(item?.price) || 0) * (Number(item?.quantity) || 1),
        0
    )
);

// Tính giảm giá
export const selectDiscount = createSelector(
    [selectSubtotal, selectDiscountCode],
    (subtotal, discountCode) => {
        const discountRates: Record<string, number> = {
            'SUMMER10': 0.1,
            'SPECIAL20': 0.2
        };
        const rate = discountRates[discountCode || ''] || 0;
        return (Number(subtotal) || 0) * rate;
    }
);

// Tính thuế
export const selectTax = createSelector(
    [selectSubtotal, selectTaxRate],
    (subtotal, taxRate) => (Number(subtotal) || 0) * (Number(taxRate) || 0)
);

// Tổng tiền cuối cùng
export const selectCartTotal = createSelector(
    [selectSubtotal, selectDiscount, selectTax, selectShippingCost],
    (subtotal, discount, tax, shippingCost) =>
        (Number(subtotal) || 0) - (Number(discount) || 0) + (Number(tax) || 0) + (Number(shippingCost) || 0)
);

// Chi tiết hóa đơn
export const selectCartSummary = createSelector(
    [selectSubtotal, selectDiscount, selectTax, selectShippingCost, selectCartTotal, selectCartItems],
    (subtotal, discount, tax, shipping, total, items = []) => ({
        subtotal: Number(subtotal) || 0,
        discount: Number(discount) || 0,
        tax: Number(tax) || 0,
        shipping: Number(shipping) || 0,
        total: Number(total) || 0,
        itemCount: (Array.isArray(items) ? items : []).reduce(
            (count, item) => count + (Number(item?.quantity) || 1),
            0
        )
    })
);