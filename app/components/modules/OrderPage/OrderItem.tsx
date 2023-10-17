/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import Link from 'next/link'
import { IShoppingCartItem } from '@/app/types/shopping-cart'
import { usePrice } from '@/app/hooks/usePrice'
import { useMediaQuery } from '@/app/hooks/useMediaQuery'
import { $mode } from '@/app/context/mode'
import CartItemCounter from '@/app/components/elements/CartItemCounter/CartItemCounter'
import { formatPrice } from '@/app/utils/common'
import spinnerStyles from '@/app/styles/spinner/index.module.scss'
import styles from '@/app/styles/order/index.module.scss'

const OrderItem = ({ item }: { item: IShoppingCartItem }) => {
  const mode = useStore($mode)
  const isMedia1160 = useMediaQuery(1160)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
  const { price, spinner, decreasePrice, deleteCartItem, increasePrice } =
    usePrice(item.count, item.partId, item.price)

  return (
    <li className={styles.order__cart__list__item}>
      <div className={styles.order__cart__list__item__left}>
        <div className={styles.order__cart__list__item__left__inner}>
          <div className={styles.order__cart__list__item__img}>
            <img src={item.image} alt={item.name} />
          </div>
          <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
            <a
              className={`${styles.order__cart__list__item__text} ${darkModeClass}`}
            >
              <span>
                {item.name.replace('.', '')}, {item.goods_parts_manufacturer},{' '}
                {item.goods_manufacturer}
              </span>
            </a>
          </Link>
        </div>
        {isMedia1160 &&
          (item.in_stock === 0 ? (
            <span className={styles.order__cart__list__item__empty}>
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
          ))}
      </div>
      <div className={styles.order__cart__list__item__right}>
        {!isMedia1160 &&
          (item.in_stock === 0 ? (
            <span className={styles.order__cart__list__item__empty}>
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
          ))}
        <span
          className={`${styles.order__cart__list__item__price} ${darkModeClass}`}
        >
          {formatPrice(price)} P
        </span>
        <button
          className={styles.order__cart__list__item__delete}
          onClick={deleteCartItem}
        >
          {spinner ? (
            <span
              className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
              style={{ top: '-13px', left: '-30px', width: 25, height: 25 }}
            />
          ) : (
            'Удалить'
          )}
        </button>
      </div>
    </li>
  )
}

export default OrderItem
