import { useEffect, useRef, useState } from "react";
import Pagination from "../../app/layout/Pagination";
import ProductList from "./ProductList";
import { Product } from "../../app/models/product";
import { useScrollContext } from "../../app/context/ScrollContext";
import agent from "../../app/api/agent";

import { useErrorBoundary } from "react-error-boundary";
import { useAuthContext } from "../../app/context/AuthContext";

const Shop = () => {
  // const { category, searchTerm } = useAppSelector((state) => state.filter);
  const [displayedProducts, setDisplayedProducts] = useState<
    Product[] | undefined
  >();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 8;

  const { showBoundary } = useErrorBoundary();
  const { scrollToShop } = useScrollContext();
  const { searchTerm } = useAuthContext();
  console.log("from shop", searchTerm);
  const shopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToShop && shopRef.current) {
      setTimeout(() => {
        shopRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100); 
    }
    const fetchProducts = async () => {
      try {
        const response = await agent.requests.get(
          `/product?p=${currentPage - 1}&limit=${limit}&searchTerm=${
            searchTerm ?? ""
          }`
        );
        console.log(response);
        setDisplayedProducts(response.products);
        setTotalProducts(response.totalProducts);
        setTotalPages(response.totalPages);
      } catch (error: any) {
        console.log(error);
        showBoundary(error);
      }
    };
    fetchProducts();
  }, [currentPage, searchTerm]);

  return (
    <div ref={shopRef} className="">
      <ProductList products={displayedProducts} />
      {totalProducts === 0 && (
        <div className="text-white flex justify-center items-center text-[36px]">
          No resuts for "{searchTerm}"
        </div>
      )}
      <Pagination
        metaData={{ currentPage, totalProducts, totalPages }}
        onSetCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Shop;
