/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import Link from 'next/link'
import { $mode } from '@/app/context/mode'
import DeleteSvg from '@/app/components/elements/DeleteSvg/DeleteSvg'
import { IShoppingCartItem } from '@/app/types/shopping-cart'
import { formatPrice } from '@/app/utils/common'
import CartItemCounter from '@/app/components/elements/CartItemCounter/CartItemCounter'
import { usePrice } from '@/app/hooks/usePrice'
import styles from '@/app/styles/cartPopup/index.module.scss'
import spinnerStyles from '@/app/styles/spinner/index.module.scss'

const CartPopupItem = ({ item }: { item: IShoppingCartItem }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
  const { price, spinner, decreasePrice, deleteCartItem, increasePrice } =
    usePrice(item.count, item.partId, item.price)

  return (
    <li className={styles.cart__popup__list__item}>
      <div className={styles.cart__popup__list__item__top}>
        <div className={styles.cart__popup__list__item__img}>
          <img src={item.image} alt={item.name} />
        </div>
        <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
          <a
            className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}
          >
            <span>
              {item.name.replace('.', '')}, {item.goods_parts_manufacturer},{' '}
              {item.goods_manufacturer}
            </span>
          </a>
        </Link>
        <button onClick={deleteCartItem}>
          <span>
            {spinner ? (
              <span
                className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
                style={{ top: 0, left: 0, width: 20, height: 20 }}
              />
            ) : (
              <DeleteSvg />
            )}
          </span>
        </button>
      </div>
      <div className={styles.cart__popup__list__item__bottom}>
        {item.in_stock === 0 ? (
          <span className={styles.cart__popup__list__item__empty}>
            Нет на складе
          </span>
        ) : (
          <CartItemCounter
            totalCount={item.in_stock}
            partId={item.partId}
            initialCount={item.count}
            increasePrice={increasePrice}
            decreasePrice={decreasePrice}
          />
        )}
        <span
          className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}
        >
          {formatPrice(price)} Pуб.
        </span>
      </div>
    </li>
  )
}

export default CartPopupItem
