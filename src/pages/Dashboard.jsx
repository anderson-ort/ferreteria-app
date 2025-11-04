import { useFetchProductsAPIQuery } from "../hooks/useFetchProductAPIQuery";
import ProductStoreDisplay from "./ProductDisplay/ProductStoreDisplay";

export default function Dashboard() {
  return <
    ProductStoreDisplay
    fetchHook={useFetchProductsAPIQuery}
    withSearch={true}
  />;
}
