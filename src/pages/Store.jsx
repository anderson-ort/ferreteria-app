import { useFetchProducts } from "../hooks/useFetchProducts";
import ProductStoreDisplay from "./ProductDisplay/ProductStoreDisplay";

export default function Store() {
  return <ProductStoreDisplay fetchHook={useFetchProducts} withSearch={false} />;
}
