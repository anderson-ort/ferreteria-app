import { useState } from "react";
import usePagination from "../../hooks/usePagination";
import Navigator from "../../components/Navigator";
import { ProductCard } from "../../components/ProductCard/ProductsCard";
import lockLogo from "../../assets/images/lock.png"

import styles from './ProductStoreDisplay.module.css'

export default function ProductStoreDisplay({
    fetchHook,         // Hook de fetch: useFetchProducts o useFetchProductsAPIQuery
    withSearch = false, // Si queremos mostrar input de búsqueda
    itemsPerPage = 9,
}) {
    const [query, setQuery] = useState("");
    const { products, loading, error } = fetchHook(query);

    const {
        currentItems: currentProducts,
        currentPage,
        totalPages,
        handlePrev,
        handleNext,
    } = usePagination(products, itemsPerPage);

    const handleSearch = (e) => {
        e.preventDefault();
        clearSearch()
    };

    const clearSearch = () => {
        setQuery("");
    };

    return (
        <div className={styles.storeContainer}>
            <Navigator />

            <p className={styles.storeMessage}>
                En <strong>andru-hardstore</strong> creemos que cada arreglo empieza
                con una mano amiga.
            </p>

            {withSearch ?
                <p>Por eso incorporamos a nuestros beneficios a nuestra ferretera virtual < strong > SofIA</strong > <br />
                    Para que le puedas preguntar: Tenes el coso del cosito que va en el pendorcho que gira?</p>
                :

                <div className={styles.logoContainer}>
                    <img
                        src={lockLogo}
                        alt="Andru Hardstore Logo"
                        className={styles.logo}
                    />
                </div>
            }

            {withSearch && (
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchInputWrapper}>
                            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className={styles.clearButton}
                                    aria-label="Limpiar búsqueda"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <button type="submit" className={styles.searchButton}>
                            Buscar
                        </button>
                    </div>
                </form>
            )
            }

            {loading && <p className={styles.status}>Cargando productos...</p>}
            {error && <p className={styles.status}>Error: {error}</p>}

            <div className={styles.grid}>
                {currentProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            {
                totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ""
                                }`}
                        >
                            Anterior
                        </button>

                        <span className={styles.pageInfo}>
                            Página {currentPage} de {totalPages}
                        </span>

                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ""
                                }`}
                        >
                            Siguiente
                        </button>
                    </div>
                )
            }
        </div >
    );
}