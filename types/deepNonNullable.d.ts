// This type is responsible for recursively removing null and undefined from a interface/type optional parameter.
// see the tread: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35847

export type DeepNonNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}
