import { useMediaQuery } from '@/app/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFilterProps } from '@/app/types/catalog'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import {
  $goodsManufacturers,
  $partsManufacturers,
  setGoodsManufacturersFromQuery,
  setPartsManufacturersFromQuery,
} from '@/app/context/goodsParts'
import { useRouter } from 'next/router'
import { getQueryParamOnFirstRender } from '@/app/utils/common'
import CatalogFiltersMobile from './CatalogFiltersMobile'
import {
  checkQueryParams,
  updateParamsAndFilters,
  updateParamsAndFiltersFromQuery,
} from '@/app/utils/catalog'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
  closePopup,
  filtersMobileOpen,
}: ICatalogFilterProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)
  const goodsManufacturers = useStore($goodsManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const router = useRouter()

  useEffect(() => {
    applyFiltersFromQuery()
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const {
        isValidGoodsQuery,
        isValidPartsQuery,
        isValidPriceQuery,
        priceFromQueryValue,
        priceToQueryValue,
        goodsQueryValue,
        partsQueryValue,
      } = checkQueryParams(router)

      const goodsQuery = `&goods=${getQueryParamOnFirstRender('goods', router)}`
      const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidGoodsQuery && isValidPartsQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setGoodsManufacturersFromQuery(goodsQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${goodsQuery}${partsQuery}`)
        return
      }
      if (isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
        }, `${currentPage}${priceQuery}`)
      }
      if (isValidGoodsQuery && isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setGoodsManufacturersFromQuery(goodsQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${goodsQuery}${partsQuery}`)
        return
      }
      if (isValidGoodsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setGoodsManufacturersFromQuery(goodsQueryValue)
        }, `${currentPage}${goodsQuery}`)
      }
      if (isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${partsQuery}`)
      }
      if (isValidPartsQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${partsQuery}`)
        return
      }
      if (isValidGoodsQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setGoodsManufacturersFromQuery(goodsQueryValue)
        }, `${currentPage}${priceQuery}${goodsQuery}`)
        return
      }
    } catch (error) {
      const err = error as Error
      if (err.message === 'URI malformed') {
        toast.warning('Неправильный URL')
        return
      }
      toast.error((error as Error).message)
    }
  }

  const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
    setIsFilterInQuery(true)
    setPriceRange([+priceFrom, +priceTo])
    setIsPriceRangeChanged(true)
  }

  const applyFilters = async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''
      const goods = goodsManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const parts = partsManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const endcodedGoodsQuery = encodeURIComponent(JSON.stringify(goods))
      const endcodedPartsQuery = encodeURIComponent(JSON.stringify(parts))
      const goodsQuery = `&goods=${endcodedGoodsQuery}`
      const partsQuery = `&parts=${endcodedPartsQuery}`
      const initialPage = currentPage > 0 ? 0 : currentPage

      if (goods.length && parts.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            goods: endcodedGoodsQuery,
            parts: endcodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${goodsQuery}${partsQuery}`,
          router
        )
        return
      }

      if (isPriceRangeChanged) {
        updateParamsAndFilters(
          { priceFrom, priceTo, offset: initialPage + 1 },
          `${initialPage}${priceQuery}`,
          router
        )
      }

      if (goods.length && parts.length) {
        updateParamsAndFilters(
          {
            goods: endcodedGoodsQuery,
            parts: endcodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${goodsQuery}${partsQuery}`,
          router
        )
        return
      }

      if (goods.length) {
        updateParamsAndFilters(
          {
            goods: endcodedGoodsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${goodsQuery}`,
          router
        )
      }

      if (parts.length) {
        updateParamsAndFilters(
          {
            parts: endcodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${partsQuery}`,
          router
        )
      }

      if (goods.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            goods: endcodedGoodsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${goodsQuery}`,
          router
        )
      }

      if (parts.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            parts: endcodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${partsQuery}`,
          router
        )
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <>
      {isMobile ? (
        <CatalogFiltersMobile
          closePopup={closePopup}
          spinner={spinner}
          applyFilters={applyFilters}
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          filtersMobileOpen={filtersMobileOpen}
        />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
