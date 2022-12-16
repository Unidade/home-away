import { Prisma } from '@prisma/client'

// https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
const homeArgs = Prisma.validator<Prisma.HomeArgs>()
export type IHome = Prisma.HomeGetPayload<typeof homeArgs>
