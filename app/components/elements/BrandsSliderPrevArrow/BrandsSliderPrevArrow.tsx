/* eslint-disable max-len */
import { IBrandsSliderArrow } from '@/app/types/elements'
import BrandSliderArrowSvg from '../BrandsSliderArrow/BrandsSliderArrow'
import styles from '@/app/styles/dashboard/index.module.scss'

const BrandsSliderNextArrow = (props: IBrandsSliderArrow) => (
  <button
    className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_prev} ${props.modeClass}`}
    onClick={props.onClick}
  >
    <span>
      <BrandSliderArrowSvg />
    </span>
  </button>
)

export default BrandsSliderNextArrow
