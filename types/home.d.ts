import { Prisma } from '@prisma/client'

type DeepNonNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}
export type IHome = DeepNonNullable<Prisma.HomeMinAggregateOutputType>
export interface IFavoriteHomes {
  favoriteHomes: {
    id: string
  }[]
}
;[]
