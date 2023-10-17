import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { $mode } from '@/app/context/mode'
import { $goodsPart } from '@/app/context/goodsPart'
import PartImagesList from '../../modules/PartPage/PartImagesList'
import { formatPrice } from '@/app/utils/common'
import { $shoppingCart } from '@/app/context/shopping-cart'
import CartHoverCheckedSvg from '../../elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '../../elements/CartHoverSvg/CartHoverSvg'
import spinnerStyles from '@/app/styles/part/index.module.scss'
import { toggleCartItem } from '@/app/utils/shopping-cart'
import { $user } from '@/app/context/user'
import { useMediaQuery } from '@/app/hooks/useMediaQuery'
import PartTabs from '../../modules/PartPage/PartTabs'
import DashboardSlider from '../../modules/DashboardPage/DashboardSlider'
import { getGoodsPartsFx } from '@/app/api/goodsParts'
import {
  $goodsParts,
  setGoodsParts,
  setGoodsPartsByPopularity,
} from '@/app/context/goodsParts'
import PartAccordion from '../../modules/PartPage/PartAccordion'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import styles from '@/app/styles/part/index.module.scss'

const PartPage = () => {
  const mode = useStore($mode)
  const user = useStore($user)
  const isMobile = useMediaQuery(850)
  const goodsPart = useStore($goodsPart)
  const goodsParts = useStore($goodsParts)
  const cartItems = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isInCart = cartItems.some((item) => item.partId === goodsPart.id)
  const spinnerToggleCart = useStore(removeFromCartFx.pending)
  const spinnerSlider = useStore(getGoodsPartsFx.pending)

  useEffect(() => {
    loadGoodsPart()
  }, [])

  const loadGoodsPart = async () => {
    try {
      const data = await getGoodsPartsFx('/goods-parts?limit=20&offset=0')
      setGoodsParts(data)
      setGoodsPartsByPopularity()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const toggleToCart = () =>
    toggleCartItem(user.username, goodsPart.id, isInCart)

  return (
    <div className="container">
      <div className={`${styles.part__top} ${darkModeClass}`}>
        <h2 className={`${styles.part__title} ${darkModeClass}`}>
          {goodsPart.name}
        </h2>
        <div className={styles.part__inner}>
          <PartImagesList />
          <div className={`${styles.part__info} ${darkModeClass}`}>
            <span className={`${styles.part__info__price} ${darkModeClass}`}>
              {formatPrice(goodsPart.price || 0)} Руб.
            </span>
            <span className={styles.part__info__stock}>
              {goodsPart.in_stock > 0 ? (
                <span className={styles.part__info__stock__success}>
                  Есть на складе
                </span>
              ) : (
                <span className={styles.part__info__stock__not}>
                  Нет на складе
                </span>
              )}
            </span>
            <span className={styles.part__info__code}>
              Артикул: {goodsPart.vendor_code}
            </span>
            <button
              className={`${styles.part__info__btn} ${
                isInCart ? styles.in_cart : ''
              }`}
              onClick={toggleToCart}
            >
              {spinnerToggleCart ? (
                <span
                  className={spinnerStyles.spinner}
                  style={{ top: 10, left: '45%' }}
                />
              ) : (
                <>
                  <span className={styles.part__info__btn__icon}>
                    {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                  </span>
                  {isInCart ? (
                    <span>Добавлено в корзину</span>
                  ) : (
                    <span>Положить в корзину</span>
                  )}
                </>
              )}
            </button>
            {!isMobile && <PartTabs />}
          </div>
        </div>
      </div>
      {isMobile && (
        <div className={styles.part__accordion}>
          <div className={styles.part__accordion__inner}>
            <PartAccordion title="Описание">
              <div
                className={`${styles.part__accordion__content} ${darkModeClass}`}
              >
                <h3
                  className={`${styles.part__tabs__content__title} ${darkModeClass}`}
                >
                  {goodsPart.name}
                </h3>
                <p
                  className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                >
                  {goodsPart.description}
                </p>
              </div>
            </PartAccordion>
          </div>
          <PartAccordion title="Совместимость">
            <div
              className={`${styles.part__accordion__content} ${darkModeClass}`}
            >
              <p
                className={`${styles.part__tabs__content__text} ${darkModeClass}`}
              >
                {goodsPart.compatibility}
              </p>
            </div>
          </PartAccordion>
        </div>
      )}
      <div className={styles.part__bottom}>
        <h2 className={`${styles.part__title} ${darkModeClass}`}>
          Вам понравится
        </h2>
        <DashboardSlider
          goToPartPage
          spinner={spinnerSlider}
          items={goodsParts.rows || []}
        />
      </div>
    </div>
  )
}

export default PartPage
