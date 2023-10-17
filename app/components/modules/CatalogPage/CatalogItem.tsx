/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useStore } from 'effector-react'
import { IGoodsPart } from '@/app/types/goodsparts'
import { $mode } from '@/app/context/mode'
import { formatPrice } from '@/app/utils/common'
import { $shoppingCart } from '@/app/context/shopping-cart'
import CartHoverSvg from '../../elements/CartHoverSvg/CartHoverSvg'
import CartHoverCheckedSvg from '../../elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import { toggleCartItem } from '@/app/utils/shopping-cart'
import { $user } from '@/app/context/user'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import styles from '@/app/styles/catalog/index.module.scss'
import spinnerStyles from '@/app/styles/spinner/index.module.scss'

const CatalogItem = ({ item }: { item: IGoodsPart }) => {
  const mode = useStore($mode)
  const user = useStore($user)
  const shoppingCart = useStore($shoppingCart)
  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id)
  const spinner = useStore(removeFromCartFx.pending)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <img src={JSON.parse(item.images)[0]} alt={item.name} />
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__code}>
          Артикул: {item.vendor_code}
        </span>
        <span className={styles.catalog__list__item__price}>
          {formatPrice(item.price)} Руб.
        </span>
      </div>
      <button
        className={`${styles.catalog__list__item__cart} ${
          isInCart ? styles.added : ''
        }`}
        disabled={spinner}
        onClick={toggleToCart}
      >
        {spinner ? (
          <div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
        ) : (
          <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
        )}
      </button>
    </li>
  )
}

export default CatalogItem
