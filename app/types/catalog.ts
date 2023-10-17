import { Event } from 'effector-next'

export interface IManufacturersBlockProps {
  title: string
  event: Event<IFilterCheckboxItem>
  manufacturersList: IFilterCheckboxItem[]
}

export interface IManufacturersBlockItemProps {
  item: IFilterCheckboxItem
  event: Event<IFilterCheckboxItem>
}

export interface IQueryParams {
  offset: string
  first: string
  goods: string
  parts: string
  priceFrom: string
  priceTo: string
  partId: string
}

export interface IFilterCheckboxItem {
  title: string
  checked: boolean
  id?: string
  event: Event<IFilterCheckboxItem>
}

export interface IFilterManufacturerAccordionProps {
  manufacturersList: IFilterCheckboxItem[]
  title: string | false
  setManufacturer: Event<IFilterCheckboxItem[]>
  updateManufacturer: Event<IFilterCheckboxItem>
}

interface ICatalogBaseTypes {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
}

interface ICatalogFiltersBaseTypes extends ICatalogBaseTypes {
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
}

export interface ICatalogFilterProps extends ICatalogFiltersBaseTypes {
  isPriceRangeChanged: boolean
  currentPage: number
  setIsFilterInQuery: (arg0: boolean) => void
  closePopup: VoidFunction
  filtersMobileOpen: boolean
}

export type IPriceRangeProps = ICatalogBaseTypes

export interface ICatalogFilterDesktopProps extends ICatalogFiltersBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
}

export interface ICatalogFilterMobileProps extends ICatalogFiltersBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
  closePopup: VoidFunction
  filtersMobileOpen: boolean
}

export interface IFilterPopupTop {
  resetBtnText: string
  title: string
  resetFilters: VoidFunction
  resetFilterBtnDisabled: boolean
  closePopup: VoidFunction
}

export interface IFiltersPopupProps extends IFilterManufacturerAccordionProps {
  resetFilterBtnDisabled: boolean
  resetAllManufacturers: VoidFunction
  handleClosePopup: VoidFunction
  applyFilters: VoidFunction
  openPopup: boolean
}
