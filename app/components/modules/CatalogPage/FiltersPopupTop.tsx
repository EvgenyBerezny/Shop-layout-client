import { $mode } from '@/app/context/mode'
import { useStore } from 'effector-react'
import { IFilterPopupTop } from '@/app/types/catalog'
import styles from '@/app/styles/catalog/index.module.scss'

const FiltersPopupTop = ({
  title,
  resetBtnText,
  resetFilters,
  resetFilterBtnDisabled,
  closePopup,
}: IFilterPopupTop) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={`${styles.catalog__bottom__filters__top} ${darkModeClass}`}>
      <button
        onClick={closePopup}
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
      >
        {title}
      </button>
      <button
        onClick={resetFilters}
        disabled={resetFilterBtnDisabled}
        className={styles.catalog__bottom__filters__reset}
      >
        {resetBtnText}
      </button>
    </div>
  )
}

export default FiltersPopupTop
