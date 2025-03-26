
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "@/context/StoreContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import ProductsPage from "@/pages/ProductsPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import FavoritesPage from "@/pages/FavoritesPage";
import NotFound from "@/pages/NotFound";
import CategoryPage from "@/pages/CategoryPage";
import SearchPage from "@/pages/SearchPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import PolicyPage from "@/pages/PolicyPage";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminProducts from "@/pages/AdminProducts";
import AdminUsers from "@/pages/AdminUsers";
import AdminOrders from "@/pages/AdminOrders";
import AuthPage from "@/pages/AuthPage";
import AccountPage from "@/pages/AccountPage";
import CheckoutPage from "@/pages/CheckoutPage";
import FAQPage from "@/pages/FAQPage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/policy/:type" element={<PolicyPage />} />
            <Route path="/shipping-policy" element={<PolicyPage />} />
            <Route path="/return-policy" element={<PolicyPage />} />
            <Route path="/privacy-policy" element={<PolicyPage />} />
            <Route path="/terms-of-service" element={<PolicyPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
