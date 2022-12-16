import { Prisma } from '@prisma/client'

export type IHome = Prisma.HomeCreateInput
export interface IFavoriteHomes {
  favoriteHomes: {
    id: string
  }[]
}
;[]
