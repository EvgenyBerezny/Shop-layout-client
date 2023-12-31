import { useStore } from 'effector-react'
import { $mode } from '@/app/context/mode'
import { useMediaQuery } from '@/app/hooks/useMediaQuery'
import { IFilterManufacturerAccordionProps } from '@/app/types/catalog'
import Accordion from '../../elements/Accordion/Accordion'
import FilterCheckboxItem from './FilterCheckboxItem'
import styles from '@/app/styles/catalog/index.module.scss'

const FilterManufacturerAccordion = ({
  manufacturersList,
  title,
  setManufacturer,
  updateManufacturer,
}: IFilterManufacturerAccordionProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isMobile = useMediaQuery(820)

  const chooseAllManufacturers = () =>
    setManufacturer(
      manufacturersList.map((item) => ({ ...item, checked: true }))
    )

  return (
    <Accordion
      title={title}
      titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      isMobileForFilters={isMobile}
      hideArrowClass={isMobile ? styles.hide_arrow : ''}
    >
      <div className={styles.filters__manufacturer__inner}>
        <button
          className={styles.filters__manufacturer__select_all}
          onClick={chooseAllManufacturers}
        >
          Выбрать все
        </button>
        <ul className={styles.filters__manufacturer__list}>
          {manufacturersList.map((item) => (
            <FilterCheckboxItem
              title={item.title}
              key={item.id}
              id={item.id}
              checked={item.checked}
              event={updateManufacturer}
            />
          ))}
        </ul>
        <div style={{ height: 24 }} />
      </div>
    </Accordion>
  )
}

export default FilterManufacturerAccordion
