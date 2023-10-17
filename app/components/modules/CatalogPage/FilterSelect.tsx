/* eslint-disable prettier/prettier */
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { $mode } from '@/app/context/mode'
import { optionStyles } from '@/app/styles/searchInput'
import { IOption, SelectOptionType } from '@/app/types/common'
import { createSelectOption } from '@/app/utils/common'
import {
  controlStyles,
  menuStyles,
  selectStyles,
} from '@/app/styles/catalog/select'
import { categoriesOptions } from '@/app/utils/selectContents'
import {
  $goodsParts,
  setGoodsPartsByPopularity,
  setGoodsPartsCheapFirst,
  setGoodsPartsExpansiveFirst,
} from '@/app/context/goodsParts'
import { useRouter } from 'next/router'

const FilterSelect = ({ setSpinner }: {setSpinner: (arg0: boolean) => void}) => {
  const mode = useStore($mode)
  const goodsParts = useStore($goodsParts)
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
  const router = useRouter()

  useEffect(() => {
    if (goodsParts.rows) {
      switch (router.query.first) {
      case 'cheap':
        updateCategoryOption('Cначала дешевые')
        setGoodsPartsCheapFirst()
        break
      case 'expensive':
        updateCategoryOption('Cначала дорогие')
        setGoodsPartsExpansiveFirst()
        break
      case 'popular':
        updateCategoryOption('По популярности')
        setGoodsPartsByPopularity()
        break
      default:
        updateCategoryOption('Cначала дешевые')
        setGoodsPartsCheapFirst()
        break
      }
    }
  }, [goodsParts.rows, router.query.first])

  const updateCategoryOption = (value: string) => {
    setCategoryOption({ value, label: value })
  }

  const updateRoteParam = (first: string) => router.push({
    query: {
      ...router.query,
      first
    }
  }, undefined, { shallow: true })

  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setSpinner(true)
    setCategoryOption(selectedOption)
    switch ((selectedOption as IOption).value) {
    case 'Cначала дешевые':
      setGoodsPartsCheapFirst()
      updateRoteParam('cheap')
      break
    case 'Cначала дорогие':
      setGoodsPartsExpansiveFirst()
      updateRoteParam('expensive')
      break
    case 'По популярности':
      setGoodsPartsByPopularity()
      updateRoteParam('popular')
      break
    }

    setTimeout(() => setSpinner(false), 1000)
  }

  return (
    <Select
      placeholder="Я ищу ..."
      value={categoryOption || createSelectOption('Cначала дешевые')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isSearchable={false}
      options={categoriesOptions}
    />
  )
}

export default FilterSelect
