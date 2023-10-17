import { createDomain } from 'effector-next'
import { IGoodsParts } from '../types/goodsparts'
import { IFilterCheckboxItem } from '../types/catalog'
import { goodsManufacturers, partsManufacturers } from '../utils/catalog'

const goodsParts = createDomain()

export const setGoodsParts = goodsParts.createEvent<IGoodsParts>()
export const setGoodsPartsCheapFirst = goodsParts.createEvent()
export const setGoodsPartsExpansiveFirst = goodsParts.createEvent()
export const setGoodsPartsByPopularity = goodsParts.createEvent()
export const setFilteredGoodsParts = goodsParts.createEvent<IGoodsParts>()

export const setGoodsManufacturers =
  goodsParts.createEvent<IFilterCheckboxItem[]>()
export const updateGoodsManufacturer =
  goodsParts.createEvent<IFilterCheckboxItem>()
export const setPartsManufacturers =
  goodsParts.createEvent<IFilterCheckboxItem[]>()
export const updatePartsManufacturer =
  goodsParts.createEvent<IFilterCheckboxItem>()
export const setGoodsManufacturersFromQuery = goodsParts.createEvent<string[]>()
export const setPartsManufacturersFromQuery = goodsParts.createEvent<string[]>()

const updateManufacturer = (
  manufacturers: IFilterCheckboxItem[],
  id: string,
  payload: Partial<IFilterCheckboxItem>
) =>
  manufacturers.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...payload,
      }
    }

    return item
  })

const updateManufacturerFromQuery = (
  manufacturers: IFilterCheckboxItem[],
  manufacturersFromQuery: string[]
) =>
  manufacturers.map((item) => {
    if (manufacturersFromQuery.find((title) => title === item.title)) {
      return {
        ...item,
        checked: true,
      }
    }

    return item
  })

export const $goodsParts = goodsParts
  .createStore<IGoodsParts>({} as IGoodsParts)
  .on(setGoodsParts, (_, parts) => parts)
  .on(setGoodsPartsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price),
  }))
  .on(setGoodsPartsExpansiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price),
  }))
  .on(setGoodsPartsByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.popularity - a.popularity),
  }))

export const $goodsManufacturers = goodsParts
  .createStore<IFilterCheckboxItem[]>(
    goodsManufacturers as IFilterCheckboxItem[]
  )
  .on(setGoodsManufacturers, (_, parts) => parts)
  .on(updateGoodsManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setGoodsManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

export const $partsManufacturers = goodsParts
  .createStore<IFilterCheckboxItem[]>(
    partsManufacturers as IFilterCheckboxItem[]
  )
  .on(setPartsManufacturers, (_, parts) => parts)
  .on(updatePartsManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setPartsManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

export const $filteredGoodsParts = goodsParts
  .createStore<IGoodsParts>({} as IGoodsParts)
  .on(setFilteredGoodsParts, (_, parts) => parts)
