export interface IGoodsPart {
  id: number
  goods_manufacturer: string
  price: number
  goods_parts_manufacturer: string
  vendor_code: number
  name: string
  description: string
  images: string
  in_stock: number
  bestseller: boolean
  new: boolean
  popularity: number
  compatibility: string
}

export interface IGoodsParts {
  count: number
  rows: IGoodsPart[]
}
