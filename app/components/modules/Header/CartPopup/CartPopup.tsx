import { forwardRef, useEffect } from 'react'
import { useStore } from 'effector-react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { AnimatePresence, motion } from 'framer-motion'
import { IWrappedComponentProps } from '@/app/types/common'
import { $mode } from '@/app/context/mode'
import { withClickOutside } from '@/app/utils/withClockOutside'
import ShoppingCartSvg from '@/app/components/elements/ShoppingCartSvg/ShoppingCartSvg'
import {
  $disableCart,
  $shoppingCart,
  $totalPrice,
  setShoppingCart,
  setTotalPrice,
} from '@/app/context/shopping-cart'
import CartPopupItem from './CartPopupItem'
import { getCartItemsFx } from '@/app/api/shopping-cart'
import { $user } from '@/app/context/user'
import styles from '@/app/styles/cartPopup/index.module.scss'
import { formatPrice } from '@/app/utils/common'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const mode = useStore($mode)
    const user = useStore($user)
    const totalPrice = useStore($totalPrice)
    const disableCart = useStore($disableCart)
    const shoppingCart = useStore($shoppingCart)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const toggleCartDropdown = () => {
      setOpen(!open)
    }

    useEffect(() => {
      loadCartItems()
    }, [])

    useEffect(() => {
      setTotalPrice(
        shoppingCart.reduce(
          (defaultCount, item) => defaultCount + item.total_price,
          0
        )
      )
    }, [shoppingCart])

    const loadCartItems = async () => {
      try {
        const cartItems = await getCartItemsFx(`/shopping-cart/${user.userId}`)

        setShoppingCart(cartItems)
      } catch (error) {
        toast.error((error as Error).message)
      }
    }

    return (
      <div className={styles.cart} ref={ref}>
        {disableCart ? (
          <button
            className={`${styles.cart__btn} ${darkModeClass}`}
            style={{ cursor: 'auto' }}
          >
            <span className={styles.cart__svg}>
              <ShoppingCartSvg />
            </span>
            <span className={styles.cart__text}>Корзина</span>
          </button>
        ) : (
          <button
            className={`${styles.cart__btn} ${darkModeClass}`}
            onClick={toggleCartDropdown}
          >
            {!!shoppingCart.length && (
              <span className={styles.cart__btn__count}>
                {shoppingCart.length}
              </span>
            )}
            <span className={styles.cart__svg}>
              <ShoppingCartSvg />
            </span>
            <span className={styles.cart__text}>Корзина</span>
          </button>
        )}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styles.cart__popup} ${darkModeClass}`}
              style={{ transformOrigin: 'right top' }}
            >
              <h1 className={styles.cart__popup__title}>Корзина</h1>
              <ul className={styles.cart__popup__list}>
                {shoppingCart.length ? (
                  shoppingCart.map((item) => (
                    <CartPopupItem item={item} key={item.id} />
                  ))
                ) : (
                  <li className={styles.cart__popup__empty}>
                    <span
                      className={`${styles.cart__popup__empty} ${darkModeClass}`}
                    >
                      Корзина пуста
                    </span>
                  </li>
                )}
              </ul>
              <div className={styles.cart__popup__footer}>
                <div className={styles.cart__popup__footer__total}>
                  <span
                    className={`${styles.cart__popup__footer__text} ${darkModeClass}`}
                  >
                    Общая сумма заказа:
                  </span>
                  <span className={styles.cart__popup__footer__price}>
                    {formatPrice(totalPrice)} Руб.
                  </span>
                </div>
                <Link href="/order" passHref legacyBehavior>
                  <button
                    className={styles.cart__popup__footer__btn}
                    disabled={!shoppingCart.length}
                  >
                    Оформить заказ
                  </button>
                </Link>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)
