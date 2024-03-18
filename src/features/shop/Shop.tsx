import { useEffect, useRef, useState } from "react";
import Pagination from "../../app/layout/Pagination";
import ProductList from "./ProductList";
import { Product } from "../../app/models/product";
import { useScrollContext } from "../../app/context/ScrollContext";
import agent from "../../app/api/agent";


const Shop = () => {
  // const { category, searchTerm } = useAppSelector((state) => state.filter);
  const [displayedProducts, setDisplayedProducts] = useState<
    Product[] | undefined
  >();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 8;
  
  
  const { scrollToShop } = useScrollContext();
  const shopRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {

    if (scrollToShop && shopRef.current) {
      shopRef.current.scrollIntoView({ behavior: "smooth" });
    }
    const fetchProducts = async () => {
      try {
        const response = await agent.requests.get(
          `/product?p=${currentPage - 1}&limit=${limit}`
        );
        console.log(response);
        setDisplayedProducts(response.products);
        setTotalProducts(response.totalProducts);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    const timer = setTimeout(() => fetchProducts(), 3000)
    
  }, [currentPage]);

  return (
    <div ref={shopRef} className="">
      <ProductList products={displayedProducts} />
      <Pagination
        metaData={{ currentPage, totalProducts, totalPages }}
        onSetCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Shop;
