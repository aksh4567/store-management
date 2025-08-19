import { CREATE_SALE } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import { useState } from "react";
import { Product } from "../../../generated/prisma";

export default function AddSaleButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  async function handleSave() {
    if (product.stock < quantity) {
      alert("sale quantity cannot be more than avl stock");
    }
    try {
      const data: { createSale: boolean } = await gqlClient.request(
        CREATE_SALE,
        {
          id: product.id,
          quantity,
        }
      );
      if (data?.createSale) {
        alert("success");
      }
    } catch {
      alert("failure");
    }
  }
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor={`quantity-input-${product.id}`}
        className="text-sm font-medium"
      >
        Quantity
      </label>
      <fieldset className="flex items-center gap-2">
        <input
          id={`quantity-input-${product.id}`}
          className="border rounded px-2 py-1 w-20 radix-text-field"
          value={quantity}
          min={1}
          max={product.stock}
          onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
          type="number"
          placeholder="Add Quantity"
        />
      </fieldset>
      <button
        className="radix-button bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
        onClick={handleSave}
        type="button"
      >
        Add to Sale
      </button>
    </div>
  );
}
