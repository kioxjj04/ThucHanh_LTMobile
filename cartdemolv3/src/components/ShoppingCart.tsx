// components/ShoppingCart.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';
import {
    loadCart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    applyDiscount,
    setShippingCost
} from '../slices/cartSlice';
import { selectCartSummary } from '../slices/cartSelectors';
import { RootState } from '../store/store';

const formatPrice = (val: any): string => {
    const num = Number(val);
    return isNaN(num) ? '0.00' : num.toFixed(2);
};

function ShoppingCart() {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products?.items || []);
    const productsStatus = useSelector((state: RootState) => state.products?.status || 'idle');
    const productsError = useSelector((state: RootState) => state.products?.error);
    const cartItems = useSelector((state: RootState) => state.cart?.items || []);
    const summary = useSelector(selectCartSummary);

    const [renderError, setRenderError] = useState<string | null>(null);

    useEffect(() => {
        if (productsStatus === 'idle') {
            dispatch(fetchProducts() as any);
        }
    }, [dispatch, productsStatus]);

    useEffect(() => {
        try {
            dispatch(loadCart());
        } catch (e: any) {
            console.error('Error loading cart:', e);
        }
    }, [dispatch]);

    const handleApplyDiscount = (code: string) => {
        dispatch(applyDiscount(code));
    };

    const handleShippingChange = (cost: number) => {
        dispatch(setShippingCost(cost));
    };

    const handleResetAll = () => {
        dispatch(clearCart());
        dispatch(fetchProducts() as any);
        setRenderError(null);
    };

    if (renderError) {
        return (
            <div className="shopping-cart">
                <h2>⚠️ Đã xảy ra lỗi hiển thị</h2>
                <p>{renderError}</p>
                <button onClick={handleResetAll} style={{ padding: '8px 16px', marginTop: 10, cursor: 'pointer' }}>
                    Khôi phục lại
                </button>
            </div>
        );
    }

    if (productsStatus === 'loading') {
        return (
            <div className="shopping-cart">
                <p className="status-message">⏳ Đang tải sản phẩm...</p>
            </div>
        );
    }

    if (productsStatus === 'failed') {
        return (
            <div className="shopping-cart">
                <p className="status-message">❌ Lỗi tải dữ liệu: {productsError || 'Không thể kết nối máy chủ'}</p>
                <button onClick={() => dispatch(fetchProducts() as any)} style={{ padding: '6px 12px', marginTop: 10, cursor: 'pointer' }}>
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="shopping-cart">
            <style>{`
                html, body {
                    overflow-y: auto !important;
                    height: auto !important;
                }
                .shopping-cart {
                    max-width: 650px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-family: sans-serif;
                    box-sizing: border-box;
                }
                .shopping-cart h1 {
                    text-align: center;
                }
                .products-grid {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                }
                .product-card {
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    padding: 12px;
                    text-align: center;
                    width: 140px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .product-card button {
                    cursor: pointer;
                    margin-top: 8px;
                    padding: 6px;
                }
                .cart-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                    border-bottom: 1px solid #eee;
                }
                .cart-item button {
                    cursor: pointer;
                    padding: 2px 8px;
                    margin: 0 4px;
                }
                .summary {
                    border-top: 2px solid #333;
                    margin-top: 20px;
                    padding-top: 10px;
                }
                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 4px 0;
                }
                .summary-row.total {
                    font-weight: bold;
                    border-top: 1px solid #ddd;
                    margin-top: 8px;
                    padding-top: 8px;
                }
                .checkout-btn {
                    width: 100%;
                    padding: 10px;
                    margin-top: 15px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                }
            `}</style>

            <h1>🛍️ Cửa Hàng Trực Tuyến</h1>

            {/* Danh sách sản phẩm */}
            <section className="products">
                <h2>Sản Phẩm Có Sẵn</h2>
                <div className="products-grid">
                    {(products || []).map(product => (
                        <div key={product.id} className="product-card">
                            <h3>{product.name}</h3>
                            <p>${formatPrice(product.price)}</p>
                            <button onClick={() => dispatch(addToCart(product))}>
                                Thêm Vào Giỏ
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Giỏ hàng */}
            <section className="cart">
                <h2>Giỏ Hàng ({summary?.itemCount ?? 0} sản phẩm)</h2>

                {(!cartItems || cartItems.length === 0) ? (
                    <p className="empty-cart">Giỏ hàng đang trống</p>
                ) : (
                    <>
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <span>{item.name}</span>
                                <span>${formatPrice(item.price)}</span>

                                <div>
                                    <button onClick={() => dispatch(decreaseQuantity(item.id))}>
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => dispatch(increaseQuantity(item.id))}>
                                        +
                                    </button>
                                </div>

                                <span>${formatPrice((Number(item.price) || 0) * (Number(item.quantity) || 1))}</span>
                                <button onClick={() => dispatch(removeFromCart(item.id))}>
                                    Xóa
                                </button>
                            </div>
                        ))}
                    </>
                )}
            </section>

            {/* Áp dụng mã giảm giá */}
            <section className="discount">
                <h3>Mã Giảm Giá</h3>
                <button onClick={() => handleApplyDiscount('SUMMER10')} style={{ cursor: 'pointer', marginRight: 8 }}>
                    SUMMER10 (-10%)
                </button>
                <button onClick={() => handleApplyDiscount('SPECIAL20')} style={{ cursor: 'pointer' }}>
                    SPECIAL20 (-20%)
                </button>
            </section>

            {/* Lựa chọn vận chuyển */}
            <section className="shipping">
                <h3>Phí Vận Chuyển</h3>
                <label style={{ marginRight: 12 }}>
                    <input
                        type="radio"
                        name="shipping"
                        onChange={() => handleShippingChange(0)}
                    />
                    Miễn phí
                </label>
                <label style={{ marginRight: 12 }}>
                    <input
                        type="radio"
                        name="shipping"
                        onChange={() => handleShippingChange(10)}
                        defaultChecked
                    />
                    Tiêu chuẩn ($10)
                </label>
                <label>
                    <input
                        type="radio"
                        name="shipping"
                        onChange={() => handleShippingChange(25)}
                    />
                    Nhanh ($25)
                </label>
            </section>

            {/* Tóm tắt hóa đơn */}
            <section className="summary">
                <h2>Tóm Tắt Đơn Hàng</h2>
                <div className="summary-row">
                    <span>Tổng cộng:</span>
                    <span>${formatPrice(summary?.subtotal)}</span>
                </div>
                {Boolean(summary?.discount && summary.discount > 0) && (
                    <div className="summary-row discount">
                        <span>Giảm giá:</span>
                        <span>-${formatPrice(summary.discount)}</span>
                    </div>
                )}
                <div className="summary-row">
                    <span>Thuế (10%):</span>
                    <span>${formatPrice(summary?.tax)}</span>
                </div>
                <div className="summary-row">
                    <span>Vận chuyển:</span>
                    <span>${formatPrice(summary?.shipping)}</span>
                </div>
                <div className="summary-row total">
                    <span>Thành Tiền:</span>
                    <span>${formatPrice(summary?.total)}</span>
                </div>

                <button className="checkout-btn">Thanh Toán</button>
            </section>
        </div>
    );
}

export default ShoppingCart;
