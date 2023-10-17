import { useEffect, useState } from 'react'
import { IGoodsParts } from '@/app/types/goodsparts'
import { getBestsellersOrNewPartsFx } from '@/app/api/goodsParts'
import { toast } from 'react-toastify'
import { $mode } from '@/app/context/mode'
import { useStore } from 'effector-react'
import DashboardSlider from '../../modules/DashboardPage/DashboardSlider'
import { $shoppingCart } from '@/app/context/shopping-cart'
import { AnimatePresence, motion } from 'framer-motion'
import CartAlert from '../../modules/DashboardPage/CartAlert'
import BrandsSlider from '../../modules/DashboardPage/BrandsSlider'
import styles from '@/app/styles/dashboard/index.module.scss'

const DashboardPage = () => {
  const [newParts, setNewParts] = useState<IGoodsParts>({} as IGoodsParts)
  const [bestsellers, setBestsellers] = useState<IGoodsParts>({} as IGoodsParts)
  const [spinner, setSpinner] = useState(false)
  const shoppingCart = useStore($shoppingCart)
  const [showAlert, setShowAlert] = useState(!!shoppingCart.length)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadGoodSParts()
  }, [])

  useEffect(() => {
    if (shoppingCart.length) {
      setShowAlert(true)
      return
    }

    setShowAlert(false)
  }, [shoppingCart.length])

  const loadGoodSParts = async () => {
    try {
      setSpinner(true)
      const bestsellers = await getBestsellersOrNewPartsFx(
        '/goods-parts/bestsellers'
      )

      const newParts = await getBestsellersOrNewPartsFx('/goods-parts/new')

      setBestsellers(bestsellers)
      setNewParts(newParts)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const closeAlert = () => {
    setShowAlert(false)
  }

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}
            >
              <CartAlert count={shoppingCart.length} closeAlert={closeAlert} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Детали
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Хиты продаж
          </h3>
          <DashboardSlider
            items={bestsellers.rows || []}
            spinner={spinner}
            goToPartPage={true}
          />
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Новинки
          </h3>
          <DashboardSlider
            items={newParts.rows || []}
            spinner={spinner}
            goToPartPage={true}
          />
        </div>
        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            О компании
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            это не просто магазин, но и центр обслуживания, место, куда вы
            можете прийти, чтобы посоветоваться, выбрать подходящее устройство,
            где вас научат пользоваться им, дадут советы по эксплуатации и
            покажут возможности того, что вы приобрели.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
