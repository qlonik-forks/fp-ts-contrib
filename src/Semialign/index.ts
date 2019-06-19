/**
 * @file The `Semialign` type class represents functors supporting a zip operation that takes the
 * union of non-uniform shapes.
 *
 * `Semialign` instances are required to satisfy the following laws:
 *
 * 1. `F.align(fa, fa) = F.map(fa, (a) => both(a, a))`
 * 2. `F.align(F.map(fa, f), F.map(fb, g)) = F.map(F.align(fa, fb), (t) => These.bimap(t, f, g))`
 * 3. `F.alignWith(fa, fb, f) = F.map(F.align(fa, fb), f)`
 * 4. `F.align(fa, F.align(fb, fc)) = F.map(F.align(F.align(fa, fb), fc), These.assoc)`
 *
 * Where `These.assoc` implements the associativity law of `These` and has the following type signature:
 * `function assoc<A, B, C>(fa: These<A, These<B, C>>): These<These<A, B>, C>`
 *
 * Adapted from http://hackage.haskell.org/package/these-0.8/docs/Data-Align.html
 */
import { Functor, Functor1, Functor2, Functor2C, Functor3 } from 'fp-ts/lib/Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { These } from 'fp-ts/lib/These'

/**
 * @since 0.3.0
 */
export interface Semialign<F> extends Functor<F> {
  readonly align: <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, These<A, B>>
  readonly alignWith: <A, B, C>(fa: HKT<F, A>, fb: HKT<F, B>, f: (x: These<A, B>) => C) => HKT<F, C>
}

/**
 * @since 0.3.0
 */
export interface Semialign1<F extends URIS> extends Functor1<F> {
  readonly align: <A, B>(fa: Kind<F, A>, fb: Kind<F, B>) => Kind<F, These<A, B>>
  readonly alignWith: <A, B, C>(fa: Kind<F, A>, fb: Kind<F, B>, f: (x: These<A, B>) => C) => Kind<F, C>
}

/**
 * @since 0.3.0
 */
export interface Semialign2<F extends URIS2> extends Functor2<F> {
  readonly align: <L, A, B>(fa: Kind2<F, L, A>, fb: Kind2<F, L, B>) => Kind2<F, L, These<A, B>>
  readonly alignWith: <L, A, B, C>(fa: Kind2<F, L, A>, fb: Kind2<F, L, B>, f: (x: These<A, B>) => C) => Kind2<F, L, C>
}

/**
 * @since 0.3.0
 */
export interface Semialign2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly align: <A, B>(fa: Kind2<F, L, A>, fb: Kind2<F, L, B>) => Kind2<F, L, These<A, B>>
  readonly alignWith: <A, B, C>(fa: Kind2<F, L, A>, fb: Kind2<F, L, B>, f: (x: These<A, B>) => C) => Kind2<F, L, C>
}

/**
 * @since 0.3.0
 */
export interface Semialign3<F extends URIS3> extends Functor3<F> {
  readonly align: <U, L, A, B>(fa: Kind3<F, U, L, A>, fb: Kind3<F, U, L, B>) => Kind3<F, U, L, These<A, B>>
  readonly alignWith: <U, L, A, B, C>(
    fa: Kind3<F, U, L, A>,
    fb: Kind3<F, U, L, B>,
    f: (x: These<A, B>) => C
  ) => Kind3<F, U, L, C>
}
