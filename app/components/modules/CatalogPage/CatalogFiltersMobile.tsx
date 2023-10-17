import { $mode } from '@/app/context/mode'
import { useStore } from 'effector-react'
import { ICatalogFilterMobileProps } from '@/app/types/catalog'
import styles from '@/app/styles/catalog/index.module.scss'
import spinnerStyles from '@/app/styles/spinner/index.module.scss'
import FiltersPopupTop from './FiltersPopupTop'
import FiltersPopup from './FiltersPopup'
import {
  $goodsManufacturers,
  $partsManufacturers,
  setGoodsManufacturers,
  setPartsManufacturers,
  updateGoodsManufacturer,
  updatePartsManufacturer,
} from '@/app/context/goodsParts'
import { useState } from 'react'
import Accordion from '../../elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { useMediaQuery } from '@/app/hooks/useMediaQuery'

const CatalogFiltersMobile = ({
  spinner,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
  applyFilters,
  filtersMobileOpen,
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
}: ICatalogFilterMobileProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const goodsManufacturers = useStore($goodsManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const [openGoods, setOpenGoods] = useState(false)
  const [openParts, setOpenParts] = useState(false)
  const handleOpenGoods = () => setOpenGoods(true)
  const handleCloseGoods = () => setOpenGoods(false)
  const handleOpenParts = () => setOpenParts(true)
  const handleCloseParts = () => setOpenParts(false)
  const isAnyGoodsManufacturerChecked = goodsManufacturers.some(
    (item) => item.checked
  )
  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )
  const isMobile = useMediaQuery(820)

  const resetAllGoodsManufacturers = () =>
    setGoodsManufacturers(
      goodsManufacturers.map((item) => ({ ...item, checked: false }))
    )

  const resetAllPartsManufacturers = () =>
    setPartsManufacturers(
      partsManufacturers.map((item) => ({ ...item, checked: false }))
    )

  const applyFiltersAndClosePopup = () => {
    applyFilters()
    closePopup()
  }

  return (
    <div
      className={`${styles.catalog__bottom__filters} ${darkModeClass} ${
        filtersMobileOpen ? styles.open : ''
      }`}
    >
      <div className={styles.catalog__bottom__filters__inner}>
        <FiltersPopupTop
          resetBtnText="Сбросить всё"
          title="Фильтры"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />
        <div className={styles.filters__goods_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenGoods}
          >
            Производитель
          </button>
          <FiltersPopup
            title="Производитель"
            resetFilterBtnDisabled={!isAnyGoodsManufacturerChecked}
            updateManufacturer={updateGoodsManufacturer}
            setManufacturer={setGoodsManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={goodsManufacturers}
            resetAllManufacturers={resetAllGoodsManufacturers}
            handleClosePopup={handleCloseGoods}
            openPopup={openGoods}
          />
        </div>
        <div className={styles.filters__parts_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenParts}
          >
            Производитель
          </button>
          <FiltersPopup
            title="Производитель"
            resetFilterBtnDisabled={!isAnyPartsManufacturerChecked}
            updateManufacturer={updatePartsManufacturer}
            setManufacturer={setPartsManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={partsManufacturers}
            resetAllManufacturers={resetAllPartsManufacturers}
            handleClosePopup={handleCloseParts}
            openPopup={openParts}
          />
        </div>
        <div className={styles.filters__price}>
          <Accordion
            title={'Цена'}
            titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            hideArrowClass={styles.hide_arrow}
            isMobileForFilters={isMobile}
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
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled}
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
      </div>
    </div>
  )
}

export default CatalogFiltersMobile
