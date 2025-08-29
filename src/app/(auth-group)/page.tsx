// "use client";
// import { Product } from "../../../generated/prisma";
// import AdminDashboard from "@/components/admin-dashboard";
// import { UserContext } from "@/components/contexts/user-context";
// import { useContext, useEffect, useState } from "react";
// import ProductDetCard from "@/components/ProductDetCard";
// import gqlClient from "@/lib/services/gql";
// import { GET_ALL_PRODUCTS } from "@/lib/gql/queries";
// import Link from "next/link";

// export const dynamic = "force-dynamic";

// export default function Home() {
//   const { user } = useContext(UserContext);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (user?.role !== "admin") {
//       setLoading(true);
//       async function fetchProducts() {
//         try {
//           const data: { getAllProducts: Product[] } = await gqlClient.request(
//             GET_ALL_PRODUCTS
//           );
//           setProducts(data.getAllProducts || []);
//         } catch (error) {
//           setProducts([]);
//           console.log("Error fetching products:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//       fetchProducts();
//     }
//   }, [user]);

//   return (
//     <div className="w-full px-2 md:px-8 py-4">
//       <main>
//         {user?.role === "admin" ? (
//           <AdminDashboard />
//         ) : (
//           <div className="w-full">
//             <h2 className="text-xl font-semibold mb-4">Products</h2>
//             {loading ? (
//               <div className="text-center py-8">Loading...</div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {products.map((product) => (
//                   <Link key={product.id} href={"/product/" + product.id}>
//                     <ProductDetCard product={product} />
//                   </Link>
//                 ))}
//                 {products.length === 0 && (
//                   <div className="col-span-full text-gray-500 text-center">
//                     No products found.
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
"use client";
import AdminDashboard from "@/components/admin-dashboard";
import { UserContext } from "@/components/contexts/user-context";
import { useContext, useEffect, useState } from "react";
import ProductDetCard from "@/components/ProductDetCard";
import gqlClient from "@/lib/services/gql";
import { GET_ALL_PRODUCTS } from "@/lib/gql/queries";

export const dynamic = "force-dynamic";

// Use the generated Product and ProductCategory types for consistency
import type { Product } from "../../../generated/prisma";

export default function Home() {
  const { user } = useContext(UserContext);
  const userLoading = false; // Set this to false or implement your own loading logic if needed
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userLoading && user?.role !== "admin") {
      setLoading(true);
      async function fetchProducts() {
        try {
          const data: { getAllProducts: Product[] } = await gqlClient.request(
            GET_ALL_PRODUCTS
          );
          setProducts(data.getAllProducts || []);
        } catch {
          setProducts([]);
        } finally {
          setLoading(false);
        }
      }
      fetchProducts();
    }
  }, [user, userLoading]);

  if (userLoading) {
    return (
      <div className="w-full px-2 md:px-8 py-4">
        <div className="text-center py-8">Loading user...</div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 md:px-8 py-4">
      <main>
        {user?.role === "admin" ? (
          <AdminDashboard />
        ) : (
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductDetCard key={product.id} product={product} />
                ))}
                {products.length === 0 && (
                  <div className="col-span-full text-gray-500 text-center">
                    No products found.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
