import { createDomain } from 'effector-next'
import { IGoodsPart } from '../types/goodsparts'

const goodsPart = createDomain()

export const setGoodsPart = goodsPart.createEvent<IGoodsPart>()

export const $goodsPart = goodsPart
  .createStore<IGoodsPart>({} as IGoodsPart)
  .on(setGoodsPart, (_, part) => part)
