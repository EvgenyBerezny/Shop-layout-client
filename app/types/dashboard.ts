import { IGoodsPart } from './goodsparts'

export interface IDashboardSlider {
  items: IGoodsPart[]
  spinner: boolean
  goToPartPage?: boolean
}

export interface ICartAlertProps {
  count: number
  closeAlert: VoidFunction
}
