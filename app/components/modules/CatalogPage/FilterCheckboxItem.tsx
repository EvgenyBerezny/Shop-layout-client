import { $mode } from '@/app/context/mode'
import { IFilterCheckboxItem } from '@/app/types/catalog'
import { useStore } from 'effector-react'
import styles from '@/app/styles/catalog/index.module.scss'

const FilterCheckboxItem = ({
  title,
  checked,
  id,
  event,
}: IFilterCheckboxItem) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handleFilterChecked = () =>
    event({ checked: !checked, id } as IFilterCheckboxItem)

  return (
    <li
      className={`${styles.filters__manufacturer__list__item} ${darkModeClass}`}
    >
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleFilterChecked}
        />
        <span>{title}</span>
      </label>
    </li>
  )
}

export default FilterCheckboxItem
