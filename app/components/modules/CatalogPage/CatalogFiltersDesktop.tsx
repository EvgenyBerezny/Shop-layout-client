import { useStore } from 'effector-react'
import { $mode } from '@/app/context/mode'
import {
  $goodsManufacturers,
  $partsManufacturers,
  setGoodsManufacturers,
  setPartsManufacturers,
  updateGoodsManufacturer,
  updatePartsManufacturer,
} from '@/app/context/goodsParts'
import FilterManufacturerAccordion from './FilterManufacturerAccordion'
import Accordion from '../../elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { ICatalogFilterDesktopProps } from '@/app/types/catalog'
import spinnerStyles from '@/app/styles/spinner/index.module.scss'
import styles from '@/app/styles/catalog/index.module.scss'

const CatalogFiltersDesktop = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  spinner,
  resetFilters,
  applyFilters,
}: ICatalogFilterDesktopProps) => {
  const mode = useStore($mode)
  const goodsManufacturers = useStore($goodsManufacturers)
  const partsManufacturers = useStore($partsManufacturers)

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
      >
        Фильтры
      </h3>
      <div className={styles.filters__goods_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={goodsManufacturers}
          title="Производитель"
          updateManufacturer={updateGoodsManufacturer}
          setManufacturer={setGoodsManufacturers}
        />
      </div>
      <div className={styles.filters__price}>
        <Accordion
          title={'Цена'}
          titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
          arrowOpenClass={styles.open}
        >
          <div className={styles.filters__manufacturer__inner}>
            <PriceRange
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
            />
            <div style={{ height: 24 }} />
          </div>
        </Accordion>
      </div>
      <div className={styles.filters__goods_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={partsManufacturers}
          title="Производитель запчастей"
          updateManufacturer={updatePartsManufacturer}
          setManufacturer={setPartsManufacturers}
        />
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={spinner || resetFilterBtnDisabled}
          onClick={applyFilters}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            'Показать'
          )}
        </button>
        <button
          className={styles.filters__actions__reset}
          disabled={resetFilterBtnDisabled}
          onClick={resetFilters}
        >
          Сбросить
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
