import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import type { CartItem, Product } from "@/types";

export function useCart() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const itemCount = useCartStore((s) => s.itemCount());
  const subtotal = useCartStore((s) => s.subtotal());

  const addProduct = (product: Product, quantity = 1) => {
    const item: CartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.images[0],
      quantity,
      stock: product.stock,
    };
    addItem(item);
    toast.success(`${product.name} added to cart`);
  };

  return {
    items,
    itemCount,
    subtotal,
    addItem,
    addProduct,
    updateQuantity,
    removeItem,
    clear,
  };
}
