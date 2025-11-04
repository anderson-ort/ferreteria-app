import { useState, useMemo } from "react";
import styles from "./ProductCard.module.css";
import lockLogo from "../../assets/images/lock.png"
import { ShoppingCart, Heart, Star, Eye, Info } from "lucide-react";

const ICONS = [ShoppingCart, Heart, Star, Eye, Info];

export function ProductCard({ product }) {

  const [expanded, setExpanded] = useState(false);

  const randomIcons = useMemo(() => {
    const shuffled = ICONS.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, []);

  return (
    <div
      className={`${styles.card} ${expanded ? styles.expanded : ""}`}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className={styles.header}>
        {/* Imagen */}
        <div className={styles.imageContainer}>
          <img
            src={product.image || lockLogo}
            alt={product.nombre}
            className={styles.image}
          />
        </div>

        {/* Info básica */}
        <div className={styles.info}>
          <h3 className={styles.name}>{product.nombre}</h3>
          <p className={styles.price}>${product.precio}</p>
        </div>

        {/* Íconos */}
        <div className={styles.icons}>
          {randomIcons.map((Icon, idx) => (
            <Icon key={idx} size={20} className={styles.icon} />
          ))}
        </div>
      </div>

      {/* Descripción */}
      <div
        className={`${styles.description} ${expanded ? styles.descriptionVisible : ""
          }`}
      >
        <p>{product.descripcion}</p>
      </div>
    </div>
  );
}
