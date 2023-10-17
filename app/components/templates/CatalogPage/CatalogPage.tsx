/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate'
import { $mode } from '@/app/context/mode'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ManufacturersBlock from '../../modules/CatalogPage/ManufacturersBlock'
import FilterSelect from '../../modules/CatalogPage/FilterSelect'
import { getGoodsPartsFx } from '@/app/api/goodsParts'
import {
  $filteredGoodsParts,
  $goodsManufacturers,
  $goodsParts,
  $partsManufacturers,
  setGoodsManufacturers,
  setGoodsParts,
  setPartsManufacturers,
  updateGoodsManufacturer,
  updatePartsManufacturer,
} from '@/app/context/goodsParts'
import { toast } from 'react-toastify'
import CatalogItem from '../../modules/CatalogPage/CatalogItem'
import { IQueryParams } from '@/app/types/catalog'
import { IGoodsParts } from '@/app/types/goodsparts'
import CatalogFilters from '../../modules/CatalogPage/CatalogFilters'
import styles from '@/app/styles/catalog/index.module.scss'
import skeletonStyles from '@/app/styles/skeleton/index.module.scss'
import { usePopup } from '@/app/hooks/usePopup'
import { checkQueryParams } from '@/app/utils/catalog'
import FilterSvg from '../../elements/FilterSvg/FilterSvg'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode)
  const goodsManufacturers = useStore($goodsManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const filteredGoodsParts = useStore($filteredGoodsParts)
  const goodsParts = useStore($goodsParts)
  const [spinner, setSpinner] = useState(false)
  const [priceRange, setPriceRange] = useState([1000, 9000])
  const [isFilterInQuery, setIsFilterInQuery] = useState(false)
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)
  const pagesCount = Math.ceil(goodsParts.count / 20)
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()
  const isAnyGoodsManufacturerChecked = goodsManufacturers.some(
    (item) => item.checked
  )
  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )
  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyGoodsManufacturerChecked ||
    isAnyPartsManufacturerChecked
  )
  const { toggleOpen, open, closePopup } = usePopup()

  useEffect(() => {
    loadGoodsParts()
  }, [filteredGoodsParts, isFilterInQuery])

  console.log(goodsParts.rows)

  const resetPagination = (data: IGoodsParts) => {
    setCurrentPage(0)
    setGoodsParts(data)
  }

  const loadGoodsParts = async () => {
    try {
      setSpinner(true)
      const data = await getGoodsPartsFx('/goods-parts?limit=20&offset=0')

      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1,
          },
        })

        resetPagination(data)
        return
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 20)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1,
              },
            },
            undefined,
            { shallow: true }
          )

          setCurrentPage(0)
          setGoodsParts(isFilterInQuery ? filteredGoodsParts : data)
          return
        }
        const offset = +query.offset - 1
        const result = await getGoodsPartsFx(
          `/goods-parts?limit=20&offset=${offset}`
        )

        setCurrentPage(offset)
        setGoodsParts(isFilterInQuery ? filteredGoodsParts : result)
        return
      }

      setCurrentPage(0)
      setGoodsParts(isFilterInQuery ? filteredGoodsParts : data)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true)
      const data = await getGoodsPartsFx('/goods-parts?limit=20&offset=0')

      if (selected > pagesCount) {
        resetPagination(data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(data)
        return
      }

      const { isValidGoodsQuery, isValidPartsQuery, isValidPriceQuery } =
        checkQueryParams(router)

      const result = await getGoodsPartsFx(
        `/goods-parts?limit=20&offset=${selected}${
          isFilterInQuery && isValidGoodsQuery
            ? `&goods=${router.query.goods}`
            : ''
        }${
          isFilterInQuery && isValidPartsQuery
            ? `&parts=${router.query.parts}`
            : ''
        }${
          isFilterInQuery && isValidPriceQuery
            ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
            : ''
        }`
      )

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(selected)
      setGoodsParts(result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetFilters = async () => {
    try {
      const data = await getGoodsPartsFx('/goods-parts?limit=20&offset=0')
      const params = router.query

      delete params.goods
      delete params.parts
      delete params.priceFrom
      delete params.priceTo
      params.first = 'cheap'

      router.push({ query: { ...params } }, undefined, { shallow: true })

      setGoodsManufacturers(
        goodsManufacturers.map((item) => ({ ...item, checked: false }))
      )

      setPartsManufacturers(
        partsManufacturers.map((item) => ({ ...item, checked: false }))
      )

      setGoodsParts(data)
      setPriceRange([1000, 9000])
      setIsPriceRangeChanged(false)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог товаров
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            {isAnyGoodsManufacturerChecked && (
              <ManufacturersBlock
                title="Производитель: "
                event={updateGoodsManufacturer}
                manufacturersList={goodsManufacturers}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isAnyPartsManufacturerChecked && (
              <ManufacturersBlock
                title="Производитель запчастей: "
                event={updatePartsManufacturer}
                manufacturersList={partsManufacturers}
              />
            )}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={resetFilterBtnDisabled}
              onClick={resetFilters}
            >
              Сбросить фильтр
            </button>
            <button
              className={styles.catalog__top__mobile_btn}
              onClick={toggleOpen}
            >
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>
                Фильтр
              </span>
            </button>
            <FilterSelect setSpinner={setSpinner} />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
              isPriceRangeChanged={isPriceRangeChanged}
              currentPage={currentPage}
              setIsFilterInQuery={setIsFilterInQuery}
              closePopup={closePopup}
              filtersMobileOpen={open}
            />
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {goodsParts.rows?.length ? (
                  goodsParts.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>Список товаров пуст</span>
                )}
              </ul>
            )}
          </div>
          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
