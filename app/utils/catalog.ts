import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender, idGenerator } from './common'
import { setFilteredGoodsParts } from '../context/goodsParts'
import { getGoodsPartsFx } from '../api/goodsParts'

const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
})

export const goodsManufacturers = [
  'LG',
  'Bosch',
  'Toshiba',
  'Samsung',
  'Xiaomi',
  'Panasonic',
  'Siemens',
  'Sony',
  'Supra',
  'Philips',
].map(createManufacturerCheckboxObj)

export const partsManufacturers = [
  'Hyundai',
  'LG',
  'Bosch',
  'Toshiba',
  'Samsung',
  'Xiaomi',
  'BBK',
  'Panasonic',
  'Siemens',
  'Sony',
  'Supra',
  'Philips',
].map(createManufacturerCheckboxObj)

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string
  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string
  const goodsQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('goods', router) as string)
  )
  const partsQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string)
  )

  const isValidGoodsQuery =
    Array.isArray(goodsQueryValue) && !!goodsQueryValue?.length
  const isValidPartsQuery =
    Array.isArray(partsQueryValue) && !!partsQueryValue?.length
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidGoodsQuery,
    isValidPartsQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    goodsQueryValue,
    partsQueryValue,
  }
}

export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string
) => {
  callback()

  const data = await getGoodsPartsFx(`/goods-parts?limit=20&offset=${path}`)

  setFilteredGoodsParts(data)
}

export async function updateParamsAndFilters<T>(
  updatedParams: T,
  path: string,
  router: NextRouter
) {
  const params = router.query

  delete params.goods
  delete params.parts
  delete params.priceFrom
  delete params.priceTo

  router.push(
    {
      query: {
        ...params,
        ...updatedParams,
      },
    },
    undefined,
    { shallow: true }
  )

  const data = await getGoodsPartsFx(`/goods-parts?limit=20&offset=${path}`)

  setFilteredGoodsParts(data)
}
