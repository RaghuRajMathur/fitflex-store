
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useStore } from "@/context/StoreContext";
import QuantitySelector from "@/components/QuantitySelector";
import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      navigate("/checkout");
    }, 1000);
  };
  
  // Calculate subtotal and shipping
  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 8.95;
  const total = subtotal + shipping;
  
  return (
    <Layout>
      <div className="max-container py-12">
        <h1 className="text-3xl font-display font-bold mb-8">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border shadow-sm p-6">
                <div className="hidden sm:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
                
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-4 border-b last:border-0 items-center"
                    >
                      {/* Product */}
                      <div className="col-span-1 sm:col-span-6 flex items-center space-x-4">
                        <div className="relative w-16 h-16 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                          <LazyImage
                            src={item.product.image}
                            alt={item.product.name}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${item.product.id}`}
                            className="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-muted-foreground hover:text-destructive text-xs"
                            onClick={() => handleRemoveItem(item.product.id)}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-1 sm:col-span-2 text-left sm:text-center">
                        <div className="sm:hidden inline-block text-sm text-muted-foreground mr-2">Price:</div>
                        <div className="inline-block sm:block">${item.product.price.toFixed(2)}</div>
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-1 sm:col-span-2 text-left sm:text-center">
                        <div className="sm:hidden text-sm text-muted-foreground mb-2">Quantity:</div>
                        <div className="inline-block sm:flex sm:justify-center">
                          <QuantitySelector
                            quantity={item.quantity}
                            onChange={(quantity) =>
                              handleUpdateQuantity(item.product.id, quantity)
                            }
                            max={10}
                          />
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="col-span-1 sm:col-span-2 text-left sm:text-center font-medium">
                        <div className="sm:hidden inline-block text-sm text-muted-foreground mr-2">Total:</div>
                        <div className="inline-block sm:block">${(item.product.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <Button
                    variant="outline"
                    onClick={() => clearCart()}
                    className="text-sm"
                  >
                    Clear Cart
                  </Button>
                  
                  <Button asChild variant="outline" className="text-sm">
                    <Link to="/products">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-medium text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button
                  className="w-full mt-6"
                  onClick={handleCheckout}
                  disabled={cart.length === 0 || isCheckingOut}
                >
                  {isCheckingOut ? "Processing..." : "Checkout"}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                
                <div className="mt-4 text-center text-xs text-muted-foreground">
                  Taxes calculated at checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
