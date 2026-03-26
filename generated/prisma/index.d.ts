
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Sigil
 * 
 */
export type Sigil = $Result.DefaultSelection<Prisma.$SigilPayload>
/**
 * Model SigilGroup
 * 
 */
export type SigilGroup = $Result.DefaultSelection<Prisma.$SigilGroupPayload>
/**
 * Model SvgVector
 * 
 */
export type SvgVector = $Result.DefaultSelection<Prisma.$SvgVectorPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sigil`: Exposes CRUD operations for the **Sigil** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sigils
    * const sigils = await prisma.sigil.findMany()
    * ```
    */
  get sigil(): Prisma.SigilDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sigilGroup`: Exposes CRUD operations for the **SigilGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SigilGroups
    * const sigilGroups = await prisma.sigilGroup.findMany()
    * ```
    */
  get sigilGroup(): Prisma.SigilGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.svgVector`: Exposes CRUD operations for the **SvgVector** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SvgVectors
    * const svgVectors = await prisma.svgVector.findMany()
    * ```
    */
  get svgVector(): Prisma.SvgVectorDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Sigil: 'Sigil',
    SigilGroup: 'SigilGroup',
    SvgVector: 'SvgVector'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "sigil" | "sigilGroup" | "svgVector"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Sigil: {
        payload: Prisma.$SigilPayload<ExtArgs>
        fields: Prisma.SigilFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SigilFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SigilFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilPayload>
          }
          findFirst: {
            args: Prisma.SigilFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SigilFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilPayload>
          }
          findMany: {
            args: Prisma.SigilFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilPayload>[]
          }
          create: {
            args: Prisma.SigilCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilPayload>
          }
          createMany: {
            args: Prisma.SigilCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SigilDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilPayload>
          }
          update: {
            args: Prisma.SigilUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilPayload>
          }
          deleteMany: {
            args: Prisma.SigilDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SigilUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SigilUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilPayload>
          }
          aggregate: {
            args: Prisma.SigilAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSigil>
          }
          groupBy: {
            args: Prisma.SigilGroupByArgs<ExtArgs>
            result: $Utils.Optional<SigilGroupByOutputType>[]
          }
          count: {
            args: Prisma.SigilCountArgs<ExtArgs>
            result: $Utils.Optional<SigilCountAggregateOutputType> | number
          }
        }
      }
      SigilGroup: {
        payload: Prisma.$SigilGroupPayload<ExtArgs>
        fields: Prisma.SigilGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SigilGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SigilGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilGroupPayload>
          }
          findFirst: {
            args: Prisma.SigilGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SigilGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilGroupPayload>
          }
          findMany: {
            args: Prisma.SigilGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilGroupPayload>[]
          }
          create: {
            args: Prisma.SigilGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilGroupPayload>
          }
          createMany: {
            args: Prisma.SigilGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SigilGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilGroupPayload>
          }
          update: {
            args: Prisma.SigilGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilGroupPayload>
          }
          deleteMany: {
            args: Prisma.SigilGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SigilGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SigilGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SigilGroupPayload>
          }
          aggregate: {
            args: Prisma.SigilGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSigilGroup>
          }
          groupBy: {
            args: Prisma.SigilGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<SigilGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.SigilGroupCountArgs<ExtArgs>
            result: $Utils.Optional<SigilGroupCountAggregateOutputType> | number
          }
        }
      }
      SvgVector: {
        payload: Prisma.$SvgVectorPayload<ExtArgs>
        fields: Prisma.SvgVectorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SvgVectorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SvgVectorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SvgVectorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SvgVectorPayload>
          }
          findFirst: {
            args: Prisma.SvgVectorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SvgVectorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SvgVectorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SvgVectorPayload>
          }
          findMany: {
            args: Prisma.SvgVectorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SvgVectorPayload>[]
          }
          create: {
            args: Prisma.SvgVectorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SvgVectorPayload>
          }
          createMany: {
            args: Prisma.SvgVectorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SvgVectorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SvgVectorPayload>
          }
          update: {
            args: Prisma.SvgVectorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SvgVectorPayload>
          }
          deleteMany: {
            args: Prisma.SvgVectorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SvgVectorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SvgVectorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SvgVectorPayload>
          }
          aggregate: {
            args: Prisma.SvgVectorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSvgVector>
          }
          groupBy: {
            args: Prisma.SvgVectorGroupByArgs<ExtArgs>
            result: $Utils.Optional<SvgVectorGroupByOutputType>[]
          }
          count: {
            args: Prisma.SvgVectorCountArgs<ExtArgs>
            result: $Utils.Optional<SvgVectorCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    sigil?: SigilOmit
    sigilGroup?: SigilGroupOmit
    svgVector?: SvgVectorOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sigils: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sigils?: boolean | UserCountOutputTypeCountSigilsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSigilsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SigilWhereInput
  }


  /**
   * Count Type SigilCountOutputType
   */

  export type SigilCountOutputType = {
    sigilGroups: number
  }

  export type SigilCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sigilGroups?: boolean | SigilCountOutputTypeCountSigilGroupsArgs
  }

  // Custom InputTypes
  /**
   * SigilCountOutputType without action
   */
  export type SigilCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SigilCountOutputType
     */
    select?: SigilCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SigilCountOutputType without action
   */
  export type SigilCountOutputTypeCountSigilGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SigilGroupWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    avatar: number | null
    theme: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    avatar: number | null
    theme: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    avatar: number | null
    theme: number | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    avatar: number | null
    theme: number | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    avatar: number
    theme: number
    isAdmin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    avatar?: true
    theme?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    avatar?: true
    theme?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    avatar?: true
    theme?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    avatar?: true
    theme?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    avatar?: true
    theme?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    email: string
    avatar: number
    theme: number
    isAdmin: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    avatar?: boolean
    theme?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sigils?: boolean | User$sigilsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    avatar?: boolean
    theme?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "avatar" | "theme" | "isAdmin" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sigils?: boolean | User$sigilsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sigils: Prisma.$SigilPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      email: string
      avatar: number
      theme: number
      isAdmin: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sigils<T extends User$sigilsArgs<ExtArgs> = {}>(args?: Subset<T, User$sigilsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SigilPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'Int'>
    readonly theme: FieldRef<"User", 'Int'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sigils
   */
  export type User$sigilsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sigil
     */
    select?: SigilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sigil
     */
    omit?: SigilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilInclude<ExtArgs> | null
    where?: SigilWhereInput
    orderBy?: SigilOrderByWithRelationInput | SigilOrderByWithRelationInput[]
    cursor?: SigilWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SigilScalarFieldEnum | SigilScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Sigil
   */

  export type AggregateSigil = {
    _count: SigilCountAggregateOutputType | null
    _avg: SigilAvgAggregateOutputType | null
    _sum: SigilSumAggregateOutputType | null
    _min: SigilMinAggregateOutputType | null
    _max: SigilMaxAggregateOutputType | null
  }

  export type SigilAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type SigilSumAggregateOutputType = {
    id: number | null
    userId: number | null
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type SigilMinAggregateOutputType = {
    id: number | null
    name: string | null
    userId: number | null
    intention: string | null
    canvasData: string | null
    imageData: string | null
    isCharged: boolean | null
    locationName: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    createdAt: Date | null
  }

  export type SigilMaxAggregateOutputType = {
    id: number | null
    name: string | null
    userId: number | null
    intention: string | null
    canvasData: string | null
    imageData: string | null
    isCharged: boolean | null
    locationName: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    createdAt: Date | null
  }

  export type SigilCountAggregateOutputType = {
    id: number
    name: number
    userId: number
    intention: number
    canvasData: number
    imageData: number
    isCharged: number
    locationName: number
    latitude: number
    longitude: number
    createdAt: number
    _all: number
  }


  export type SigilAvgAggregateInputType = {
    id?: true
    userId?: true
    latitude?: true
    longitude?: true
  }

  export type SigilSumAggregateInputType = {
    id?: true
    userId?: true
    latitude?: true
    longitude?: true
  }

  export type SigilMinAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    intention?: true
    canvasData?: true
    imageData?: true
    isCharged?: true
    locationName?: true
    latitude?: true
    longitude?: true
    createdAt?: true
  }

  export type SigilMaxAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    intention?: true
    canvasData?: true
    imageData?: true
    isCharged?: true
    locationName?: true
    latitude?: true
    longitude?: true
    createdAt?: true
  }

  export type SigilCountAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    intention?: true
    canvasData?: true
    imageData?: true
    isCharged?: true
    locationName?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    _all?: true
  }

  export type SigilAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sigil to aggregate.
     */
    where?: SigilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sigils to fetch.
     */
    orderBy?: SigilOrderByWithRelationInput | SigilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SigilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sigils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sigils.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sigils
    **/
    _count?: true | SigilCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SigilAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SigilSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SigilMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SigilMaxAggregateInputType
  }

  export type GetSigilAggregateType<T extends SigilAggregateArgs> = {
        [P in keyof T & keyof AggregateSigil]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSigil[P]>
      : GetScalarType<T[P], AggregateSigil[P]>
  }




  export type SigilGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SigilWhereInput
    orderBy?: SigilOrderByWithAggregationInput | SigilOrderByWithAggregationInput[]
    by: SigilScalarFieldEnum[] | SigilScalarFieldEnum
    having?: SigilScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SigilCountAggregateInputType | true
    _avg?: SigilAvgAggregateInputType
    _sum?: SigilSumAggregateInputType
    _min?: SigilMinAggregateInputType
    _max?: SigilMaxAggregateInputType
  }

  export type SigilGroupByOutputType = {
    id: number
    name: string
    userId: number
    intention: string | null
    canvasData: string | null
    imageData: string | null
    isCharged: boolean
    locationName: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    createdAt: Date
    _count: SigilCountAggregateOutputType | null
    _avg: SigilAvgAggregateOutputType | null
    _sum: SigilSumAggregateOutputType | null
    _min: SigilMinAggregateOutputType | null
    _max: SigilMaxAggregateOutputType | null
  }

  type GetSigilGroupByPayload<T extends SigilGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SigilGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SigilGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SigilGroupByOutputType[P]>
            : GetScalarType<T[P], SigilGroupByOutputType[P]>
        }
      >
    >


  export type SigilSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    intention?: boolean
    canvasData?: boolean
    imageData?: boolean
    isCharged?: boolean
    locationName?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    sigilGroups?: boolean | Sigil$sigilGroupsArgs<ExtArgs>
    _count?: boolean | SigilCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sigil"]>



  export type SigilSelectScalar = {
    id?: boolean
    name?: boolean
    userId?: boolean
    intention?: boolean
    canvasData?: boolean
    imageData?: boolean
    isCharged?: boolean
    locationName?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
  }

  export type SigilOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "userId" | "intention" | "canvasData" | "imageData" | "isCharged" | "locationName" | "latitude" | "longitude" | "createdAt", ExtArgs["result"]["sigil"]>
  export type SigilInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    sigilGroups?: boolean | Sigil$sigilGroupsArgs<ExtArgs>
    _count?: boolean | SigilCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SigilPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sigil"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      sigilGroups: Prisma.$SigilGroupPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      userId: number
      intention: string | null
      canvasData: string | null
      imageData: string | null
      isCharged: boolean
      locationName: string | null
      latitude: Prisma.Decimal | null
      longitude: Prisma.Decimal | null
      createdAt: Date
    }, ExtArgs["result"]["sigil"]>
    composites: {}
  }

  type SigilGetPayload<S extends boolean | null | undefined | SigilDefaultArgs> = $Result.GetResult<Prisma.$SigilPayload, S>

  type SigilCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SigilFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SigilCountAggregateInputType | true
    }

  export interface SigilDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sigil'], meta: { name: 'Sigil' } }
    /**
     * Find zero or one Sigil that matches the filter.
     * @param {SigilFindUniqueArgs} args - Arguments to find a Sigil
     * @example
     * // Get one Sigil
     * const sigil = await prisma.sigil.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SigilFindUniqueArgs>(args: SelectSubset<T, SigilFindUniqueArgs<ExtArgs>>): Prisma__SigilClient<$Result.GetResult<Prisma.$SigilPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sigil that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SigilFindUniqueOrThrowArgs} args - Arguments to find a Sigil
     * @example
     * // Get one Sigil
     * const sigil = await prisma.sigil.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SigilFindUniqueOrThrowArgs>(args: SelectSubset<T, SigilFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SigilClient<$Result.GetResult<Prisma.$SigilPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sigil that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilFindFirstArgs} args - Arguments to find a Sigil
     * @example
     * // Get one Sigil
     * const sigil = await prisma.sigil.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SigilFindFirstArgs>(args?: SelectSubset<T, SigilFindFirstArgs<ExtArgs>>): Prisma__SigilClient<$Result.GetResult<Prisma.$SigilPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sigil that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilFindFirstOrThrowArgs} args - Arguments to find a Sigil
     * @example
     * // Get one Sigil
     * const sigil = await prisma.sigil.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SigilFindFirstOrThrowArgs>(args?: SelectSubset<T, SigilFindFirstOrThrowArgs<ExtArgs>>): Prisma__SigilClient<$Result.GetResult<Prisma.$SigilPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sigils that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sigils
     * const sigils = await prisma.sigil.findMany()
     * 
     * // Get first 10 Sigils
     * const sigils = await prisma.sigil.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sigilWithIdOnly = await prisma.sigil.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SigilFindManyArgs>(args?: SelectSubset<T, SigilFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SigilPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sigil.
     * @param {SigilCreateArgs} args - Arguments to create a Sigil.
     * @example
     * // Create one Sigil
     * const Sigil = await prisma.sigil.create({
     *   data: {
     *     // ... data to create a Sigil
     *   }
     * })
     * 
     */
    create<T extends SigilCreateArgs>(args: SelectSubset<T, SigilCreateArgs<ExtArgs>>): Prisma__SigilClient<$Result.GetResult<Prisma.$SigilPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sigils.
     * @param {SigilCreateManyArgs} args - Arguments to create many Sigils.
     * @example
     * // Create many Sigils
     * const sigil = await prisma.sigil.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SigilCreateManyArgs>(args?: SelectSubset<T, SigilCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Sigil.
     * @param {SigilDeleteArgs} args - Arguments to delete one Sigil.
     * @example
     * // Delete one Sigil
     * const Sigil = await prisma.sigil.delete({
     *   where: {
     *     // ... filter to delete one Sigil
     *   }
     * })
     * 
     */
    delete<T extends SigilDeleteArgs>(args: SelectSubset<T, SigilDeleteArgs<ExtArgs>>): Prisma__SigilClient<$Result.GetResult<Prisma.$SigilPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sigil.
     * @param {SigilUpdateArgs} args - Arguments to update one Sigil.
     * @example
     * // Update one Sigil
     * const sigil = await prisma.sigil.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SigilUpdateArgs>(args: SelectSubset<T, SigilUpdateArgs<ExtArgs>>): Prisma__SigilClient<$Result.GetResult<Prisma.$SigilPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sigils.
     * @param {SigilDeleteManyArgs} args - Arguments to filter Sigils to delete.
     * @example
     * // Delete a few Sigils
     * const { count } = await prisma.sigil.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SigilDeleteManyArgs>(args?: SelectSubset<T, SigilDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sigils.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sigils
     * const sigil = await prisma.sigil.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SigilUpdateManyArgs>(args: SelectSubset<T, SigilUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sigil.
     * @param {SigilUpsertArgs} args - Arguments to update or create a Sigil.
     * @example
     * // Update or create a Sigil
     * const sigil = await prisma.sigil.upsert({
     *   create: {
     *     // ... data to create a Sigil
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sigil we want to update
     *   }
     * })
     */
    upsert<T extends SigilUpsertArgs>(args: SelectSubset<T, SigilUpsertArgs<ExtArgs>>): Prisma__SigilClient<$Result.GetResult<Prisma.$SigilPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sigils.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilCountArgs} args - Arguments to filter Sigils to count.
     * @example
     * // Count the number of Sigils
     * const count = await prisma.sigil.count({
     *   where: {
     *     // ... the filter for the Sigils we want to count
     *   }
     * })
    **/
    count<T extends SigilCountArgs>(
      args?: Subset<T, SigilCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SigilCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sigil.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SigilAggregateArgs>(args: Subset<T, SigilAggregateArgs>): Prisma.PrismaPromise<GetSigilAggregateType<T>>

    /**
     * Group by Sigil.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SigilGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SigilGroupByArgs['orderBy'] }
        : { orderBy?: SigilGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SigilGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSigilGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sigil model
   */
  readonly fields: SigilFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sigil.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SigilClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sigilGroups<T extends Sigil$sigilGroupsArgs<ExtArgs> = {}>(args?: Subset<T, Sigil$sigilGroupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SigilGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sigil model
   */
  interface SigilFieldRefs {
    readonly id: FieldRef<"Sigil", 'Int'>
    readonly name: FieldRef<"Sigil", 'String'>
    readonly userId: FieldRef<"Sigil", 'Int'>
    readonly intention: FieldRef<"Sigil", 'String'>
    readonly canvasData: FieldRef<"Sigil", 'String'>
    readonly imageData: FieldRef<"Sigil", 'String'>
    readonly isCharged: FieldRef<"Sigil", 'Boolean'>
    readonly locationName: FieldRef<"Sigil", 'String'>
    readonly latitude: FieldRef<"Sigil", 'Decimal'>
    readonly longitude: FieldRef<"Sigil", 'Decimal'>
    readonly createdAt: FieldRef<"Sigil", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sigil findUnique
   */
  export type SigilFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sigil
     */
    select?: SigilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sigil
     */
    omit?: SigilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilInclude<ExtArgs> | null
    /**
     * Filter, which Sigil to fetch.
     */
    where: SigilWhereUniqueInput
  }

  /**
   * Sigil findUniqueOrThrow
   */
  export type SigilFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sigil
     */
    select?: SigilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sigil
     */
    omit?: SigilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilInclude<ExtArgs> | null
    /**
     * Filter, which Sigil to fetch.
     */
    where: SigilWhereUniqueInput
  }

  /**
   * Sigil findFirst
   */
  export type SigilFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sigil
     */
    select?: SigilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sigil
     */
    omit?: SigilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilInclude<ExtArgs> | null
    /**
     * Filter, which Sigil to fetch.
     */
    where?: SigilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sigils to fetch.
     */
    orderBy?: SigilOrderByWithRelationInput | SigilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sigils.
     */
    cursor?: SigilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sigils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sigils.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sigils.
     */
    distinct?: SigilScalarFieldEnum | SigilScalarFieldEnum[]
  }

  /**
   * Sigil findFirstOrThrow
   */
  export type SigilFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sigil
     */
    select?: SigilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sigil
     */
    omit?: SigilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilInclude<ExtArgs> | null
    /**
     * Filter, which Sigil to fetch.
     */
    where?: SigilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sigils to fetch.
     */
    orderBy?: SigilOrderByWithRelationInput | SigilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sigils.
     */
    cursor?: SigilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sigils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sigils.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sigils.
     */
    distinct?: SigilScalarFieldEnum | SigilScalarFieldEnum[]
  }

  /**
   * Sigil findMany
   */
  export type SigilFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sigil
     */
    select?: SigilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sigil
     */
    omit?: SigilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilInclude<ExtArgs> | null
    /**
     * Filter, which Sigils to fetch.
     */
    where?: SigilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sigils to fetch.
     */
    orderBy?: SigilOrderByWithRelationInput | SigilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sigils.
     */
    cursor?: SigilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sigils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sigils.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sigils.
     */
    distinct?: SigilScalarFieldEnum | SigilScalarFieldEnum[]
  }

  /**
   * Sigil create
   */
  export type SigilCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sigil
     */
    select?: SigilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sigil
     */
    omit?: SigilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilInclude<ExtArgs> | null
    /**
     * The data needed to create a Sigil.
     */
    data: XOR<SigilCreateInput, SigilUncheckedCreateInput>
  }

  /**
   * Sigil createMany
   */
  export type SigilCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sigils.
     */
    data: SigilCreateManyInput | SigilCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sigil update
   */
  export type SigilUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sigil
     */
    select?: SigilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sigil
     */
    omit?: SigilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilInclude<ExtArgs> | null
    /**
     * The data needed to update a Sigil.
     */
    data: XOR<SigilUpdateInput, SigilUncheckedUpdateInput>
    /**
     * Choose, which Sigil to update.
     */
    where: SigilWhereUniqueInput
  }

  /**
   * Sigil updateMany
   */
  export type SigilUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sigils.
     */
    data: XOR<SigilUpdateManyMutationInput, SigilUncheckedUpdateManyInput>
    /**
     * Filter which Sigils to update
     */
    where?: SigilWhereInput
    /**
     * Limit how many Sigils to update.
     */
    limit?: number
  }

  /**
   * Sigil upsert
   */
  export type SigilUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sigil
     */
    select?: SigilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sigil
     */
    omit?: SigilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilInclude<ExtArgs> | null
    /**
     * The filter to search for the Sigil to update in case it exists.
     */
    where: SigilWhereUniqueInput
    /**
     * In case the Sigil found by the `where` argument doesn't exist, create a new Sigil with this data.
     */
    create: XOR<SigilCreateInput, SigilUncheckedCreateInput>
    /**
     * In case the Sigil was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SigilUpdateInput, SigilUncheckedUpdateInput>
  }

  /**
   * Sigil delete
   */
  export type SigilDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sigil
     */
    select?: SigilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sigil
     */
    omit?: SigilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilInclude<ExtArgs> | null
    /**
     * Filter which Sigil to delete.
     */
    where: SigilWhereUniqueInput
  }

  /**
   * Sigil deleteMany
   */
  export type SigilDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sigils to delete
     */
    where?: SigilWhereInput
    /**
     * Limit how many Sigils to delete.
     */
    limit?: number
  }

  /**
   * Sigil.sigilGroups
   */
  export type Sigil$sigilGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SigilGroup
     */
    select?: SigilGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SigilGroup
     */
    omit?: SigilGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilGroupInclude<ExtArgs> | null
    where?: SigilGroupWhereInput
    orderBy?: SigilGroupOrderByWithRelationInput | SigilGroupOrderByWithRelationInput[]
    cursor?: SigilGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SigilGroupScalarFieldEnum | SigilGroupScalarFieldEnum[]
  }

  /**
   * Sigil without action
   */
  export type SigilDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sigil
     */
    select?: SigilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sigil
     */
    omit?: SigilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilInclude<ExtArgs> | null
  }


  /**
   * Model SigilGroup
   */

  export type AggregateSigilGroup = {
    _count: SigilGroupCountAggregateOutputType | null
    _avg: SigilGroupAvgAggregateOutputType | null
    _sum: SigilGroupSumAggregateOutputType | null
    _min: SigilGroupMinAggregateOutputType | null
    _max: SigilGroupMaxAggregateOutputType | null
  }

  export type SigilGroupAvgAggregateOutputType = {
    id: number | null
    sigilId: number | null
  }

  export type SigilGroupSumAggregateOutputType = {
    id: number | null
    sigilId: number | null
  }

  export type SigilGroupMinAggregateOutputType = {
    id: number | null
    sigilId: number | null
    groupMember: string | null
  }

  export type SigilGroupMaxAggregateOutputType = {
    id: number | null
    sigilId: number | null
    groupMember: string | null
  }

  export type SigilGroupCountAggregateOutputType = {
    id: number
    sigilId: number
    groupMember: number
    _all: number
  }


  export type SigilGroupAvgAggregateInputType = {
    id?: true
    sigilId?: true
  }

  export type SigilGroupSumAggregateInputType = {
    id?: true
    sigilId?: true
  }

  export type SigilGroupMinAggregateInputType = {
    id?: true
    sigilId?: true
    groupMember?: true
  }

  export type SigilGroupMaxAggregateInputType = {
    id?: true
    sigilId?: true
    groupMember?: true
  }

  export type SigilGroupCountAggregateInputType = {
    id?: true
    sigilId?: true
    groupMember?: true
    _all?: true
  }

  export type SigilGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SigilGroup to aggregate.
     */
    where?: SigilGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SigilGroups to fetch.
     */
    orderBy?: SigilGroupOrderByWithRelationInput | SigilGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SigilGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SigilGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SigilGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SigilGroups
    **/
    _count?: true | SigilGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SigilGroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SigilGroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SigilGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SigilGroupMaxAggregateInputType
  }

  export type GetSigilGroupAggregateType<T extends SigilGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateSigilGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSigilGroup[P]>
      : GetScalarType<T[P], AggregateSigilGroup[P]>
  }




  export type SigilGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SigilGroupWhereInput
    orderBy?: SigilGroupOrderByWithAggregationInput | SigilGroupOrderByWithAggregationInput[]
    by: SigilGroupScalarFieldEnum[] | SigilGroupScalarFieldEnum
    having?: SigilGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SigilGroupCountAggregateInputType | true
    _avg?: SigilGroupAvgAggregateInputType
    _sum?: SigilGroupSumAggregateInputType
    _min?: SigilGroupMinAggregateInputType
    _max?: SigilGroupMaxAggregateInputType
  }

  export type SigilGroupGroupByOutputType = {
    id: number
    sigilId: number
    groupMember: string
    _count: SigilGroupCountAggregateOutputType | null
    _avg: SigilGroupAvgAggregateOutputType | null
    _sum: SigilGroupSumAggregateOutputType | null
    _min: SigilGroupMinAggregateOutputType | null
    _max: SigilGroupMaxAggregateOutputType | null
  }

  type GetSigilGroupGroupByPayload<T extends SigilGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SigilGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SigilGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SigilGroupGroupByOutputType[P]>
            : GetScalarType<T[P], SigilGroupGroupByOutputType[P]>
        }
      >
    >


  export type SigilGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sigilId?: boolean
    groupMember?: boolean
    sigil?: boolean | SigilDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sigilGroup"]>



  export type SigilGroupSelectScalar = {
    id?: boolean
    sigilId?: boolean
    groupMember?: boolean
  }

  export type SigilGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sigilId" | "groupMember", ExtArgs["result"]["sigilGroup"]>
  export type SigilGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sigil?: boolean | SigilDefaultArgs<ExtArgs>
  }

  export type $SigilGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SigilGroup"
    objects: {
      sigil: Prisma.$SigilPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sigilId: number
      groupMember: string
    }, ExtArgs["result"]["sigilGroup"]>
    composites: {}
  }

  type SigilGroupGetPayload<S extends boolean | null | undefined | SigilGroupDefaultArgs> = $Result.GetResult<Prisma.$SigilGroupPayload, S>

  type SigilGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SigilGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SigilGroupCountAggregateInputType | true
    }

  export interface SigilGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SigilGroup'], meta: { name: 'SigilGroup' } }
    /**
     * Find zero or one SigilGroup that matches the filter.
     * @param {SigilGroupFindUniqueArgs} args - Arguments to find a SigilGroup
     * @example
     * // Get one SigilGroup
     * const sigilGroup = await prisma.sigilGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SigilGroupFindUniqueArgs>(args: SelectSubset<T, SigilGroupFindUniqueArgs<ExtArgs>>): Prisma__SigilGroupClient<$Result.GetResult<Prisma.$SigilGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SigilGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SigilGroupFindUniqueOrThrowArgs} args - Arguments to find a SigilGroup
     * @example
     * // Get one SigilGroup
     * const sigilGroup = await prisma.sigilGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SigilGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, SigilGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SigilGroupClient<$Result.GetResult<Prisma.$SigilGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SigilGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilGroupFindFirstArgs} args - Arguments to find a SigilGroup
     * @example
     * // Get one SigilGroup
     * const sigilGroup = await prisma.sigilGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SigilGroupFindFirstArgs>(args?: SelectSubset<T, SigilGroupFindFirstArgs<ExtArgs>>): Prisma__SigilGroupClient<$Result.GetResult<Prisma.$SigilGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SigilGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilGroupFindFirstOrThrowArgs} args - Arguments to find a SigilGroup
     * @example
     * // Get one SigilGroup
     * const sigilGroup = await prisma.sigilGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SigilGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, SigilGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__SigilGroupClient<$Result.GetResult<Prisma.$SigilGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SigilGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SigilGroups
     * const sigilGroups = await prisma.sigilGroup.findMany()
     * 
     * // Get first 10 SigilGroups
     * const sigilGroups = await prisma.sigilGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sigilGroupWithIdOnly = await prisma.sigilGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SigilGroupFindManyArgs>(args?: SelectSubset<T, SigilGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SigilGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SigilGroup.
     * @param {SigilGroupCreateArgs} args - Arguments to create a SigilGroup.
     * @example
     * // Create one SigilGroup
     * const SigilGroup = await prisma.sigilGroup.create({
     *   data: {
     *     // ... data to create a SigilGroup
     *   }
     * })
     * 
     */
    create<T extends SigilGroupCreateArgs>(args: SelectSubset<T, SigilGroupCreateArgs<ExtArgs>>): Prisma__SigilGroupClient<$Result.GetResult<Prisma.$SigilGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SigilGroups.
     * @param {SigilGroupCreateManyArgs} args - Arguments to create many SigilGroups.
     * @example
     * // Create many SigilGroups
     * const sigilGroup = await prisma.sigilGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SigilGroupCreateManyArgs>(args?: SelectSubset<T, SigilGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SigilGroup.
     * @param {SigilGroupDeleteArgs} args - Arguments to delete one SigilGroup.
     * @example
     * // Delete one SigilGroup
     * const SigilGroup = await prisma.sigilGroup.delete({
     *   where: {
     *     // ... filter to delete one SigilGroup
     *   }
     * })
     * 
     */
    delete<T extends SigilGroupDeleteArgs>(args: SelectSubset<T, SigilGroupDeleteArgs<ExtArgs>>): Prisma__SigilGroupClient<$Result.GetResult<Prisma.$SigilGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SigilGroup.
     * @param {SigilGroupUpdateArgs} args - Arguments to update one SigilGroup.
     * @example
     * // Update one SigilGroup
     * const sigilGroup = await prisma.sigilGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SigilGroupUpdateArgs>(args: SelectSubset<T, SigilGroupUpdateArgs<ExtArgs>>): Prisma__SigilGroupClient<$Result.GetResult<Prisma.$SigilGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SigilGroups.
     * @param {SigilGroupDeleteManyArgs} args - Arguments to filter SigilGroups to delete.
     * @example
     * // Delete a few SigilGroups
     * const { count } = await prisma.sigilGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SigilGroupDeleteManyArgs>(args?: SelectSubset<T, SigilGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SigilGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SigilGroups
     * const sigilGroup = await prisma.sigilGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SigilGroupUpdateManyArgs>(args: SelectSubset<T, SigilGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SigilGroup.
     * @param {SigilGroupUpsertArgs} args - Arguments to update or create a SigilGroup.
     * @example
     * // Update or create a SigilGroup
     * const sigilGroup = await prisma.sigilGroup.upsert({
     *   create: {
     *     // ... data to create a SigilGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SigilGroup we want to update
     *   }
     * })
     */
    upsert<T extends SigilGroupUpsertArgs>(args: SelectSubset<T, SigilGroupUpsertArgs<ExtArgs>>): Prisma__SigilGroupClient<$Result.GetResult<Prisma.$SigilGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SigilGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilGroupCountArgs} args - Arguments to filter SigilGroups to count.
     * @example
     * // Count the number of SigilGroups
     * const count = await prisma.sigilGroup.count({
     *   where: {
     *     // ... the filter for the SigilGroups we want to count
     *   }
     * })
    **/
    count<T extends SigilGroupCountArgs>(
      args?: Subset<T, SigilGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SigilGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SigilGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SigilGroupAggregateArgs>(args: Subset<T, SigilGroupAggregateArgs>): Prisma.PrismaPromise<GetSigilGroupAggregateType<T>>

    /**
     * Group by SigilGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SigilGroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SigilGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SigilGroupGroupByArgs['orderBy'] }
        : { orderBy?: SigilGroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SigilGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSigilGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SigilGroup model
   */
  readonly fields: SigilGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SigilGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SigilGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sigil<T extends SigilDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SigilDefaultArgs<ExtArgs>>): Prisma__SigilClient<$Result.GetResult<Prisma.$SigilPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SigilGroup model
   */
  interface SigilGroupFieldRefs {
    readonly id: FieldRef<"SigilGroup", 'Int'>
    readonly sigilId: FieldRef<"SigilGroup", 'Int'>
    readonly groupMember: FieldRef<"SigilGroup", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SigilGroup findUnique
   */
  export type SigilGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SigilGroup
     */
    select?: SigilGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SigilGroup
     */
    omit?: SigilGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilGroupInclude<ExtArgs> | null
    /**
     * Filter, which SigilGroup to fetch.
     */
    where: SigilGroupWhereUniqueInput
  }

  /**
   * SigilGroup findUniqueOrThrow
   */
  export type SigilGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SigilGroup
     */
    select?: SigilGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SigilGroup
     */
    omit?: SigilGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilGroupInclude<ExtArgs> | null
    /**
     * Filter, which SigilGroup to fetch.
     */
    where: SigilGroupWhereUniqueInput
  }

  /**
   * SigilGroup findFirst
   */
  export type SigilGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SigilGroup
     */
    select?: SigilGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SigilGroup
     */
    omit?: SigilGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilGroupInclude<ExtArgs> | null
    /**
     * Filter, which SigilGroup to fetch.
     */
    where?: SigilGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SigilGroups to fetch.
     */
    orderBy?: SigilGroupOrderByWithRelationInput | SigilGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SigilGroups.
     */
    cursor?: SigilGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SigilGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SigilGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SigilGroups.
     */
    distinct?: SigilGroupScalarFieldEnum | SigilGroupScalarFieldEnum[]
  }

  /**
   * SigilGroup findFirstOrThrow
   */
  export type SigilGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SigilGroup
     */
    select?: SigilGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SigilGroup
     */
    omit?: SigilGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilGroupInclude<ExtArgs> | null
    /**
     * Filter, which SigilGroup to fetch.
     */
    where?: SigilGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SigilGroups to fetch.
     */
    orderBy?: SigilGroupOrderByWithRelationInput | SigilGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SigilGroups.
     */
    cursor?: SigilGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SigilGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SigilGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SigilGroups.
     */
    distinct?: SigilGroupScalarFieldEnum | SigilGroupScalarFieldEnum[]
  }

  /**
   * SigilGroup findMany
   */
  export type SigilGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SigilGroup
     */
    select?: SigilGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SigilGroup
     */
    omit?: SigilGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilGroupInclude<ExtArgs> | null
    /**
     * Filter, which SigilGroups to fetch.
     */
    where?: SigilGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SigilGroups to fetch.
     */
    orderBy?: SigilGroupOrderByWithRelationInput | SigilGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SigilGroups.
     */
    cursor?: SigilGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SigilGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SigilGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SigilGroups.
     */
    distinct?: SigilGroupScalarFieldEnum | SigilGroupScalarFieldEnum[]
  }

  /**
   * SigilGroup create
   */
  export type SigilGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SigilGroup
     */
    select?: SigilGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SigilGroup
     */
    omit?: SigilGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a SigilGroup.
     */
    data: XOR<SigilGroupCreateInput, SigilGroupUncheckedCreateInput>
  }

  /**
   * SigilGroup createMany
   */
  export type SigilGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SigilGroups.
     */
    data: SigilGroupCreateManyInput | SigilGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SigilGroup update
   */
  export type SigilGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SigilGroup
     */
    select?: SigilGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SigilGroup
     */
    omit?: SigilGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a SigilGroup.
     */
    data: XOR<SigilGroupUpdateInput, SigilGroupUncheckedUpdateInput>
    /**
     * Choose, which SigilGroup to update.
     */
    where: SigilGroupWhereUniqueInput
  }

  /**
   * SigilGroup updateMany
   */
  export type SigilGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SigilGroups.
     */
    data: XOR<SigilGroupUpdateManyMutationInput, SigilGroupUncheckedUpdateManyInput>
    /**
     * Filter which SigilGroups to update
     */
    where?: SigilGroupWhereInput
    /**
     * Limit how many SigilGroups to update.
     */
    limit?: number
  }

  /**
   * SigilGroup upsert
   */
  export type SigilGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SigilGroup
     */
    select?: SigilGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SigilGroup
     */
    omit?: SigilGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the SigilGroup to update in case it exists.
     */
    where: SigilGroupWhereUniqueInput
    /**
     * In case the SigilGroup found by the `where` argument doesn't exist, create a new SigilGroup with this data.
     */
    create: XOR<SigilGroupCreateInput, SigilGroupUncheckedCreateInput>
    /**
     * In case the SigilGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SigilGroupUpdateInput, SigilGroupUncheckedUpdateInput>
  }

  /**
   * SigilGroup delete
   */
  export type SigilGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SigilGroup
     */
    select?: SigilGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SigilGroup
     */
    omit?: SigilGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilGroupInclude<ExtArgs> | null
    /**
     * Filter which SigilGroup to delete.
     */
    where: SigilGroupWhereUniqueInput
  }

  /**
   * SigilGroup deleteMany
   */
  export type SigilGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SigilGroups to delete
     */
    where?: SigilGroupWhereInput
    /**
     * Limit how many SigilGroups to delete.
     */
    limit?: number
  }

  /**
   * SigilGroup without action
   */
  export type SigilGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SigilGroup
     */
    select?: SigilGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SigilGroup
     */
    omit?: SigilGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SigilGroupInclude<ExtArgs> | null
  }


  /**
   * Model SvgVector
   */

  export type AggregateSvgVector = {
    _count: SvgVectorCountAggregateOutputType | null
    _avg: SvgVectorAvgAggregateOutputType | null
    _sum: SvgVectorSumAggregateOutputType | null
    _min: SvgVectorMinAggregateOutputType | null
    _max: SvgVectorMaxAggregateOutputType | null
  }

  export type SvgVectorAvgAggregateOutputType = {
    id: number | null
    sigilId: number | null
    width: number | null
    height: number | null
    fileSize: number | null
  }

  export type SvgVectorSumAggregateOutputType = {
    id: number | null
    sigilId: number | null
    width: number | null
    height: number | null
    fileSize: number | null
  }

  export type SvgVectorMinAggregateOutputType = {
    id: number | null
    sigilId: number | null
    filename: string | null
    vectorData: string | null
    width: number | null
    height: number | null
    fileSize: number | null
    createdAt: Date | null
  }

  export type SvgVectorMaxAggregateOutputType = {
    id: number | null
    sigilId: number | null
    filename: string | null
    vectorData: string | null
    width: number | null
    height: number | null
    fileSize: number | null
    createdAt: Date | null
  }

  export type SvgVectorCountAggregateOutputType = {
    id: number
    sigilId: number
    filename: number
    vectorData: number
    width: number
    height: number
    fileSize: number
    createdAt: number
    _all: number
  }


  export type SvgVectorAvgAggregateInputType = {
    id?: true
    sigilId?: true
    width?: true
    height?: true
    fileSize?: true
  }

  export type SvgVectorSumAggregateInputType = {
    id?: true
    sigilId?: true
    width?: true
    height?: true
    fileSize?: true
  }

  export type SvgVectorMinAggregateInputType = {
    id?: true
    sigilId?: true
    filename?: true
    vectorData?: true
    width?: true
    height?: true
    fileSize?: true
    createdAt?: true
  }

  export type SvgVectorMaxAggregateInputType = {
    id?: true
    sigilId?: true
    filename?: true
    vectorData?: true
    width?: true
    height?: true
    fileSize?: true
    createdAt?: true
  }

  export type SvgVectorCountAggregateInputType = {
    id?: true
    sigilId?: true
    filename?: true
    vectorData?: true
    width?: true
    height?: true
    fileSize?: true
    createdAt?: true
    _all?: true
  }

  export type SvgVectorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SvgVector to aggregate.
     */
    where?: SvgVectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SvgVectors to fetch.
     */
    orderBy?: SvgVectorOrderByWithRelationInput | SvgVectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SvgVectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SvgVectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SvgVectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SvgVectors
    **/
    _count?: true | SvgVectorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SvgVectorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SvgVectorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SvgVectorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SvgVectorMaxAggregateInputType
  }

  export type GetSvgVectorAggregateType<T extends SvgVectorAggregateArgs> = {
        [P in keyof T & keyof AggregateSvgVector]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSvgVector[P]>
      : GetScalarType<T[P], AggregateSvgVector[P]>
  }




  export type SvgVectorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SvgVectorWhereInput
    orderBy?: SvgVectorOrderByWithAggregationInput | SvgVectorOrderByWithAggregationInput[]
    by: SvgVectorScalarFieldEnum[] | SvgVectorScalarFieldEnum
    having?: SvgVectorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SvgVectorCountAggregateInputType | true
    _avg?: SvgVectorAvgAggregateInputType
    _sum?: SvgVectorSumAggregateInputType
    _min?: SvgVectorMinAggregateInputType
    _max?: SvgVectorMaxAggregateInputType
  }

  export type SvgVectorGroupByOutputType = {
    id: number
    sigilId: number | null
    filename: string
    vectorData: string
    width: number
    height: number
    fileSize: number
    createdAt: Date
    _count: SvgVectorCountAggregateOutputType | null
    _avg: SvgVectorAvgAggregateOutputType | null
    _sum: SvgVectorSumAggregateOutputType | null
    _min: SvgVectorMinAggregateOutputType | null
    _max: SvgVectorMaxAggregateOutputType | null
  }

  type GetSvgVectorGroupByPayload<T extends SvgVectorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SvgVectorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SvgVectorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SvgVectorGroupByOutputType[P]>
            : GetScalarType<T[P], SvgVectorGroupByOutputType[P]>
        }
      >
    >


  export type SvgVectorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sigilId?: boolean
    filename?: boolean
    vectorData?: boolean
    width?: boolean
    height?: boolean
    fileSize?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["svgVector"]>



  export type SvgVectorSelectScalar = {
    id?: boolean
    sigilId?: boolean
    filename?: boolean
    vectorData?: boolean
    width?: boolean
    height?: boolean
    fileSize?: boolean
    createdAt?: boolean
  }

  export type SvgVectorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sigilId" | "filename" | "vectorData" | "width" | "height" | "fileSize" | "createdAt", ExtArgs["result"]["svgVector"]>

  export type $SvgVectorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SvgVector"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sigilId: number | null
      filename: string
      vectorData: string
      width: number
      height: number
      fileSize: number
      createdAt: Date
    }, ExtArgs["result"]["svgVector"]>
    composites: {}
  }

  type SvgVectorGetPayload<S extends boolean | null | undefined | SvgVectorDefaultArgs> = $Result.GetResult<Prisma.$SvgVectorPayload, S>

  type SvgVectorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SvgVectorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SvgVectorCountAggregateInputType | true
    }

  export interface SvgVectorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SvgVector'], meta: { name: 'SvgVector' } }
    /**
     * Find zero or one SvgVector that matches the filter.
     * @param {SvgVectorFindUniqueArgs} args - Arguments to find a SvgVector
     * @example
     * // Get one SvgVector
     * const svgVector = await prisma.svgVector.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SvgVectorFindUniqueArgs>(args: SelectSubset<T, SvgVectorFindUniqueArgs<ExtArgs>>): Prisma__SvgVectorClient<$Result.GetResult<Prisma.$SvgVectorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SvgVector that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SvgVectorFindUniqueOrThrowArgs} args - Arguments to find a SvgVector
     * @example
     * // Get one SvgVector
     * const svgVector = await prisma.svgVector.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SvgVectorFindUniqueOrThrowArgs>(args: SelectSubset<T, SvgVectorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SvgVectorClient<$Result.GetResult<Prisma.$SvgVectorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SvgVector that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SvgVectorFindFirstArgs} args - Arguments to find a SvgVector
     * @example
     * // Get one SvgVector
     * const svgVector = await prisma.svgVector.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SvgVectorFindFirstArgs>(args?: SelectSubset<T, SvgVectorFindFirstArgs<ExtArgs>>): Prisma__SvgVectorClient<$Result.GetResult<Prisma.$SvgVectorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SvgVector that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SvgVectorFindFirstOrThrowArgs} args - Arguments to find a SvgVector
     * @example
     * // Get one SvgVector
     * const svgVector = await prisma.svgVector.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SvgVectorFindFirstOrThrowArgs>(args?: SelectSubset<T, SvgVectorFindFirstOrThrowArgs<ExtArgs>>): Prisma__SvgVectorClient<$Result.GetResult<Prisma.$SvgVectorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SvgVectors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SvgVectorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SvgVectors
     * const svgVectors = await prisma.svgVector.findMany()
     * 
     * // Get first 10 SvgVectors
     * const svgVectors = await prisma.svgVector.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const svgVectorWithIdOnly = await prisma.svgVector.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SvgVectorFindManyArgs>(args?: SelectSubset<T, SvgVectorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SvgVectorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SvgVector.
     * @param {SvgVectorCreateArgs} args - Arguments to create a SvgVector.
     * @example
     * // Create one SvgVector
     * const SvgVector = await prisma.svgVector.create({
     *   data: {
     *     // ... data to create a SvgVector
     *   }
     * })
     * 
     */
    create<T extends SvgVectorCreateArgs>(args: SelectSubset<T, SvgVectorCreateArgs<ExtArgs>>): Prisma__SvgVectorClient<$Result.GetResult<Prisma.$SvgVectorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SvgVectors.
     * @param {SvgVectorCreateManyArgs} args - Arguments to create many SvgVectors.
     * @example
     * // Create many SvgVectors
     * const svgVector = await prisma.svgVector.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SvgVectorCreateManyArgs>(args?: SelectSubset<T, SvgVectorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SvgVector.
     * @param {SvgVectorDeleteArgs} args - Arguments to delete one SvgVector.
     * @example
     * // Delete one SvgVector
     * const SvgVector = await prisma.svgVector.delete({
     *   where: {
     *     // ... filter to delete one SvgVector
     *   }
     * })
     * 
     */
    delete<T extends SvgVectorDeleteArgs>(args: SelectSubset<T, SvgVectorDeleteArgs<ExtArgs>>): Prisma__SvgVectorClient<$Result.GetResult<Prisma.$SvgVectorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SvgVector.
     * @param {SvgVectorUpdateArgs} args - Arguments to update one SvgVector.
     * @example
     * // Update one SvgVector
     * const svgVector = await prisma.svgVector.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SvgVectorUpdateArgs>(args: SelectSubset<T, SvgVectorUpdateArgs<ExtArgs>>): Prisma__SvgVectorClient<$Result.GetResult<Prisma.$SvgVectorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SvgVectors.
     * @param {SvgVectorDeleteManyArgs} args - Arguments to filter SvgVectors to delete.
     * @example
     * // Delete a few SvgVectors
     * const { count } = await prisma.svgVector.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SvgVectorDeleteManyArgs>(args?: SelectSubset<T, SvgVectorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SvgVectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SvgVectorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SvgVectors
     * const svgVector = await prisma.svgVector.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SvgVectorUpdateManyArgs>(args: SelectSubset<T, SvgVectorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SvgVector.
     * @param {SvgVectorUpsertArgs} args - Arguments to update or create a SvgVector.
     * @example
     * // Update or create a SvgVector
     * const svgVector = await prisma.svgVector.upsert({
     *   create: {
     *     // ... data to create a SvgVector
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SvgVector we want to update
     *   }
     * })
     */
    upsert<T extends SvgVectorUpsertArgs>(args: SelectSubset<T, SvgVectorUpsertArgs<ExtArgs>>): Prisma__SvgVectorClient<$Result.GetResult<Prisma.$SvgVectorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SvgVectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SvgVectorCountArgs} args - Arguments to filter SvgVectors to count.
     * @example
     * // Count the number of SvgVectors
     * const count = await prisma.svgVector.count({
     *   where: {
     *     // ... the filter for the SvgVectors we want to count
     *   }
     * })
    **/
    count<T extends SvgVectorCountArgs>(
      args?: Subset<T, SvgVectorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SvgVectorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SvgVector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SvgVectorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SvgVectorAggregateArgs>(args: Subset<T, SvgVectorAggregateArgs>): Prisma.PrismaPromise<GetSvgVectorAggregateType<T>>

    /**
     * Group by SvgVector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SvgVectorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SvgVectorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SvgVectorGroupByArgs['orderBy'] }
        : { orderBy?: SvgVectorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SvgVectorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSvgVectorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SvgVector model
   */
  readonly fields: SvgVectorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SvgVector.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SvgVectorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SvgVector model
   */
  interface SvgVectorFieldRefs {
    readonly id: FieldRef<"SvgVector", 'Int'>
    readonly sigilId: FieldRef<"SvgVector", 'Int'>
    readonly filename: FieldRef<"SvgVector", 'String'>
    readonly vectorData: FieldRef<"SvgVector", 'String'>
    readonly width: FieldRef<"SvgVector", 'Int'>
    readonly height: FieldRef<"SvgVector", 'Int'>
    readonly fileSize: FieldRef<"SvgVector", 'Int'>
    readonly createdAt: FieldRef<"SvgVector", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SvgVector findUnique
   */
  export type SvgVectorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SvgVector
     */
    select?: SvgVectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SvgVector
     */
    omit?: SvgVectorOmit<ExtArgs> | null
    /**
     * Filter, which SvgVector to fetch.
     */
    where: SvgVectorWhereUniqueInput
  }

  /**
   * SvgVector findUniqueOrThrow
   */
  export type SvgVectorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SvgVector
     */
    select?: SvgVectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SvgVector
     */
    omit?: SvgVectorOmit<ExtArgs> | null
    /**
     * Filter, which SvgVector to fetch.
     */
    where: SvgVectorWhereUniqueInput
  }

  /**
   * SvgVector findFirst
   */
  export type SvgVectorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SvgVector
     */
    select?: SvgVectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SvgVector
     */
    omit?: SvgVectorOmit<ExtArgs> | null
    /**
     * Filter, which SvgVector to fetch.
     */
    where?: SvgVectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SvgVectors to fetch.
     */
    orderBy?: SvgVectorOrderByWithRelationInput | SvgVectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SvgVectors.
     */
    cursor?: SvgVectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SvgVectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SvgVectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SvgVectors.
     */
    distinct?: SvgVectorScalarFieldEnum | SvgVectorScalarFieldEnum[]
  }

  /**
   * SvgVector findFirstOrThrow
   */
  export type SvgVectorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SvgVector
     */
    select?: SvgVectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SvgVector
     */
    omit?: SvgVectorOmit<ExtArgs> | null
    /**
     * Filter, which SvgVector to fetch.
     */
    where?: SvgVectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SvgVectors to fetch.
     */
    orderBy?: SvgVectorOrderByWithRelationInput | SvgVectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SvgVectors.
     */
    cursor?: SvgVectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SvgVectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SvgVectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SvgVectors.
     */
    distinct?: SvgVectorScalarFieldEnum | SvgVectorScalarFieldEnum[]
  }

  /**
   * SvgVector findMany
   */
  export type SvgVectorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SvgVector
     */
    select?: SvgVectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SvgVector
     */
    omit?: SvgVectorOmit<ExtArgs> | null
    /**
     * Filter, which SvgVectors to fetch.
     */
    where?: SvgVectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SvgVectors to fetch.
     */
    orderBy?: SvgVectorOrderByWithRelationInput | SvgVectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SvgVectors.
     */
    cursor?: SvgVectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SvgVectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SvgVectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SvgVectors.
     */
    distinct?: SvgVectorScalarFieldEnum | SvgVectorScalarFieldEnum[]
  }

  /**
   * SvgVector create
   */
  export type SvgVectorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SvgVector
     */
    select?: SvgVectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SvgVector
     */
    omit?: SvgVectorOmit<ExtArgs> | null
    /**
     * The data needed to create a SvgVector.
     */
    data: XOR<SvgVectorCreateInput, SvgVectorUncheckedCreateInput>
  }

  /**
   * SvgVector createMany
   */
  export type SvgVectorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SvgVectors.
     */
    data: SvgVectorCreateManyInput | SvgVectorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SvgVector update
   */
  export type SvgVectorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SvgVector
     */
    select?: SvgVectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SvgVector
     */
    omit?: SvgVectorOmit<ExtArgs> | null
    /**
     * The data needed to update a SvgVector.
     */
    data: XOR<SvgVectorUpdateInput, SvgVectorUncheckedUpdateInput>
    /**
     * Choose, which SvgVector to update.
     */
    where: SvgVectorWhereUniqueInput
  }

  /**
   * SvgVector updateMany
   */
  export type SvgVectorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SvgVectors.
     */
    data: XOR<SvgVectorUpdateManyMutationInput, SvgVectorUncheckedUpdateManyInput>
    /**
     * Filter which SvgVectors to update
     */
    where?: SvgVectorWhereInput
    /**
     * Limit how many SvgVectors to update.
     */
    limit?: number
  }

  /**
   * SvgVector upsert
   */
  export type SvgVectorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SvgVector
     */
    select?: SvgVectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SvgVector
     */
    omit?: SvgVectorOmit<ExtArgs> | null
    /**
     * The filter to search for the SvgVector to update in case it exists.
     */
    where: SvgVectorWhereUniqueInput
    /**
     * In case the SvgVector found by the `where` argument doesn't exist, create a new SvgVector with this data.
     */
    create: XOR<SvgVectorCreateInput, SvgVectorUncheckedCreateInput>
    /**
     * In case the SvgVector was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SvgVectorUpdateInput, SvgVectorUncheckedUpdateInput>
  }

  /**
   * SvgVector delete
   */
  export type SvgVectorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SvgVector
     */
    select?: SvgVectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SvgVector
     */
    omit?: SvgVectorOmit<ExtArgs> | null
    /**
     * Filter which SvgVector to delete.
     */
    where: SvgVectorWhereUniqueInput
  }

  /**
   * SvgVector deleteMany
   */
  export type SvgVectorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SvgVectors to delete
     */
    where?: SvgVectorWhereInput
    /**
     * Limit how many SvgVectors to delete.
     */
    limit?: number
  }

  /**
   * SvgVector without action
   */
  export type SvgVectorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SvgVector
     */
    select?: SvgVectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SvgVector
     */
    omit?: SvgVectorOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    avatar: 'avatar',
    theme: 'theme',
    isAdmin: 'isAdmin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SigilScalarFieldEnum: {
    id: 'id',
    name: 'name',
    userId: 'userId',
    intention: 'intention',
    canvasData: 'canvasData',
    imageData: 'imageData',
    isCharged: 'isCharged',
    locationName: 'locationName',
    latitude: 'latitude',
    longitude: 'longitude',
    createdAt: 'createdAt'
  };

  export type SigilScalarFieldEnum = (typeof SigilScalarFieldEnum)[keyof typeof SigilScalarFieldEnum]


  export const SigilGroupScalarFieldEnum: {
    id: 'id',
    sigilId: 'sigilId',
    groupMember: 'groupMember'
  };

  export type SigilGroupScalarFieldEnum = (typeof SigilGroupScalarFieldEnum)[keyof typeof SigilGroupScalarFieldEnum]


  export const SvgVectorScalarFieldEnum: {
    id: 'id',
    sigilId: 'sigilId',
    filename: 'filename',
    vectorData: 'vectorData',
    width: 'width',
    height: 'height',
    fileSize: 'fileSize',
    createdAt: 'createdAt'
  };

  export type SvgVectorScalarFieldEnum = (typeof SvgVectorScalarFieldEnum)[keyof typeof SvgVectorScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const UserOrderByRelevanceFieldEnum: {
    username: 'username',
    email: 'email'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const SigilOrderByRelevanceFieldEnum: {
    name: 'name',
    intention: 'intention',
    canvasData: 'canvasData',
    imageData: 'imageData',
    locationName: 'locationName'
  };

  export type SigilOrderByRelevanceFieldEnum = (typeof SigilOrderByRelevanceFieldEnum)[keyof typeof SigilOrderByRelevanceFieldEnum]


  export const SigilGroupOrderByRelevanceFieldEnum: {
    groupMember: 'groupMember'
  };

  export type SigilGroupOrderByRelevanceFieldEnum = (typeof SigilGroupOrderByRelevanceFieldEnum)[keyof typeof SigilGroupOrderByRelevanceFieldEnum]


  export const SvgVectorOrderByRelevanceFieldEnum: {
    filename: 'filename',
    vectorData: 'vectorData'
  };

  export type SvgVectorOrderByRelevanceFieldEnum = (typeof SvgVectorOrderByRelevanceFieldEnum)[keyof typeof SvgVectorOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    avatar?: IntFilter<"User"> | number
    theme?: IntFilter<"User"> | number
    isAdmin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sigils?: SigilListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    avatar?: SortOrder
    theme?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sigils?: SigilOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    avatar?: IntFilter<"User"> | number
    theme?: IntFilter<"User"> | number
    isAdmin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sigils?: SigilListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    avatar?: SortOrder
    theme?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    avatar?: IntWithAggregatesFilter<"User"> | number
    theme?: IntWithAggregatesFilter<"User"> | number
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SigilWhereInput = {
    AND?: SigilWhereInput | SigilWhereInput[]
    OR?: SigilWhereInput[]
    NOT?: SigilWhereInput | SigilWhereInput[]
    id?: IntFilter<"Sigil"> | number
    name?: StringFilter<"Sigil"> | string
    userId?: IntFilter<"Sigil"> | number
    intention?: StringNullableFilter<"Sigil"> | string | null
    canvasData?: StringNullableFilter<"Sigil"> | string | null
    imageData?: StringNullableFilter<"Sigil"> | string | null
    isCharged?: BoolFilter<"Sigil"> | boolean
    locationName?: StringNullableFilter<"Sigil"> | string | null
    latitude?: DecimalNullableFilter<"Sigil"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableFilter<"Sigil"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Sigil"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sigilGroups?: SigilGroupListRelationFilter
  }

  export type SigilOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    intention?: SortOrderInput | SortOrder
    canvasData?: SortOrderInput | SortOrder
    imageData?: SortOrderInput | SortOrder
    isCharged?: SortOrder
    locationName?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    sigilGroups?: SigilGroupOrderByRelationAggregateInput
    _relevance?: SigilOrderByRelevanceInput
  }

  export type SigilWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: SigilWhereInput | SigilWhereInput[]
    OR?: SigilWhereInput[]
    NOT?: SigilWhereInput | SigilWhereInput[]
    userId?: IntFilter<"Sigil"> | number
    intention?: StringNullableFilter<"Sigil"> | string | null
    canvasData?: StringNullableFilter<"Sigil"> | string | null
    imageData?: StringNullableFilter<"Sigil"> | string | null
    isCharged?: BoolFilter<"Sigil"> | boolean
    locationName?: StringNullableFilter<"Sigil"> | string | null
    latitude?: DecimalNullableFilter<"Sigil"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableFilter<"Sigil"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Sigil"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sigilGroups?: SigilGroupListRelationFilter
  }, "id" | "name">

  export type SigilOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    intention?: SortOrderInput | SortOrder
    canvasData?: SortOrderInput | SortOrder
    imageData?: SortOrderInput | SortOrder
    isCharged?: SortOrder
    locationName?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SigilCountOrderByAggregateInput
    _avg?: SigilAvgOrderByAggregateInput
    _max?: SigilMaxOrderByAggregateInput
    _min?: SigilMinOrderByAggregateInput
    _sum?: SigilSumOrderByAggregateInput
  }

  export type SigilScalarWhereWithAggregatesInput = {
    AND?: SigilScalarWhereWithAggregatesInput | SigilScalarWhereWithAggregatesInput[]
    OR?: SigilScalarWhereWithAggregatesInput[]
    NOT?: SigilScalarWhereWithAggregatesInput | SigilScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Sigil"> | number
    name?: StringWithAggregatesFilter<"Sigil"> | string
    userId?: IntWithAggregatesFilter<"Sigil"> | number
    intention?: StringNullableWithAggregatesFilter<"Sigil"> | string | null
    canvasData?: StringNullableWithAggregatesFilter<"Sigil"> | string | null
    imageData?: StringNullableWithAggregatesFilter<"Sigil"> | string | null
    isCharged?: BoolWithAggregatesFilter<"Sigil"> | boolean
    locationName?: StringNullableWithAggregatesFilter<"Sigil"> | string | null
    latitude?: DecimalNullableWithAggregatesFilter<"Sigil"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableWithAggregatesFilter<"Sigil"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Sigil"> | Date | string
  }

  export type SigilGroupWhereInput = {
    AND?: SigilGroupWhereInput | SigilGroupWhereInput[]
    OR?: SigilGroupWhereInput[]
    NOT?: SigilGroupWhereInput | SigilGroupWhereInput[]
    id?: IntFilter<"SigilGroup"> | number
    sigilId?: IntFilter<"SigilGroup"> | number
    groupMember?: StringFilter<"SigilGroup"> | string
    sigil?: XOR<SigilScalarRelationFilter, SigilWhereInput>
  }

  export type SigilGroupOrderByWithRelationInput = {
    id?: SortOrder
    sigilId?: SortOrder
    groupMember?: SortOrder
    sigil?: SigilOrderByWithRelationInput
    _relevance?: SigilGroupOrderByRelevanceInput
  }

  export type SigilGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SigilGroupWhereInput | SigilGroupWhereInput[]
    OR?: SigilGroupWhereInput[]
    NOT?: SigilGroupWhereInput | SigilGroupWhereInput[]
    sigilId?: IntFilter<"SigilGroup"> | number
    groupMember?: StringFilter<"SigilGroup"> | string
    sigil?: XOR<SigilScalarRelationFilter, SigilWhereInput>
  }, "id">

  export type SigilGroupOrderByWithAggregationInput = {
    id?: SortOrder
    sigilId?: SortOrder
    groupMember?: SortOrder
    _count?: SigilGroupCountOrderByAggregateInput
    _avg?: SigilGroupAvgOrderByAggregateInput
    _max?: SigilGroupMaxOrderByAggregateInput
    _min?: SigilGroupMinOrderByAggregateInput
    _sum?: SigilGroupSumOrderByAggregateInput
  }

  export type SigilGroupScalarWhereWithAggregatesInput = {
    AND?: SigilGroupScalarWhereWithAggregatesInput | SigilGroupScalarWhereWithAggregatesInput[]
    OR?: SigilGroupScalarWhereWithAggregatesInput[]
    NOT?: SigilGroupScalarWhereWithAggregatesInput | SigilGroupScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SigilGroup"> | number
    sigilId?: IntWithAggregatesFilter<"SigilGroup"> | number
    groupMember?: StringWithAggregatesFilter<"SigilGroup"> | string
  }

  export type SvgVectorWhereInput = {
    AND?: SvgVectorWhereInput | SvgVectorWhereInput[]
    OR?: SvgVectorWhereInput[]
    NOT?: SvgVectorWhereInput | SvgVectorWhereInput[]
    id?: IntFilter<"SvgVector"> | number
    sigilId?: IntNullableFilter<"SvgVector"> | number | null
    filename?: StringFilter<"SvgVector"> | string
    vectorData?: StringFilter<"SvgVector"> | string
    width?: IntFilter<"SvgVector"> | number
    height?: IntFilter<"SvgVector"> | number
    fileSize?: IntFilter<"SvgVector"> | number
    createdAt?: DateTimeFilter<"SvgVector"> | Date | string
  }

  export type SvgVectorOrderByWithRelationInput = {
    id?: SortOrder
    sigilId?: SortOrderInput | SortOrder
    filename?: SortOrder
    vectorData?: SortOrder
    width?: SortOrder
    height?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    _relevance?: SvgVectorOrderByRelevanceInput
  }

  export type SvgVectorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SvgVectorWhereInput | SvgVectorWhereInput[]
    OR?: SvgVectorWhereInput[]
    NOT?: SvgVectorWhereInput | SvgVectorWhereInput[]
    sigilId?: IntNullableFilter<"SvgVector"> | number | null
    filename?: StringFilter<"SvgVector"> | string
    vectorData?: StringFilter<"SvgVector"> | string
    width?: IntFilter<"SvgVector"> | number
    height?: IntFilter<"SvgVector"> | number
    fileSize?: IntFilter<"SvgVector"> | number
    createdAt?: DateTimeFilter<"SvgVector"> | Date | string
  }, "id">

  export type SvgVectorOrderByWithAggregationInput = {
    id?: SortOrder
    sigilId?: SortOrderInput | SortOrder
    filename?: SortOrder
    vectorData?: SortOrder
    width?: SortOrder
    height?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    _count?: SvgVectorCountOrderByAggregateInput
    _avg?: SvgVectorAvgOrderByAggregateInput
    _max?: SvgVectorMaxOrderByAggregateInput
    _min?: SvgVectorMinOrderByAggregateInput
    _sum?: SvgVectorSumOrderByAggregateInput
  }

  export type SvgVectorScalarWhereWithAggregatesInput = {
    AND?: SvgVectorScalarWhereWithAggregatesInput | SvgVectorScalarWhereWithAggregatesInput[]
    OR?: SvgVectorScalarWhereWithAggregatesInput[]
    NOT?: SvgVectorScalarWhereWithAggregatesInput | SvgVectorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SvgVector"> | number
    sigilId?: IntNullableWithAggregatesFilter<"SvgVector"> | number | null
    filename?: StringWithAggregatesFilter<"SvgVector"> | string
    vectorData?: StringWithAggregatesFilter<"SvgVector"> | string
    width?: IntWithAggregatesFilter<"SvgVector"> | number
    height?: IntWithAggregatesFilter<"SvgVector"> | number
    fileSize?: IntWithAggregatesFilter<"SvgVector"> | number
    createdAt?: DateTimeWithAggregatesFilter<"SvgVector"> | Date | string
  }

  export type UserCreateInput = {
    username: string
    email: string
    avatar?: number
    theme?: number
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sigils?: SigilCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    email: string
    avatar?: number
    theme?: number
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sigils?: SigilUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    avatar?: IntFieldUpdateOperationsInput | number
    theme?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sigils?: SigilUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    avatar?: IntFieldUpdateOperationsInput | number
    theme?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sigils?: SigilUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    email: string
    avatar?: number
    theme?: number
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    avatar?: IntFieldUpdateOperationsInput | number
    theme?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    avatar?: IntFieldUpdateOperationsInput | number
    theme?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SigilCreateInput = {
    name: string
    intention?: string | null
    canvasData?: string | null
    imageData?: string | null
    isCharged?: boolean
    locationName?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSigilsInput
    sigilGroups?: SigilGroupCreateNestedManyWithoutSigilInput
  }

  export type SigilUncheckedCreateInput = {
    id?: number
    name: string
    userId: number
    intention?: string | null
    canvasData?: string | null
    imageData?: string | null
    isCharged?: boolean
    locationName?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    sigilGroups?: SigilGroupUncheckedCreateNestedManyWithoutSigilInput
  }

  export type SigilUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    canvasData?: NullableStringFieldUpdateOperationsInput | string | null
    imageData?: NullableStringFieldUpdateOperationsInput | string | null
    isCharged?: BoolFieldUpdateOperationsInput | boolean
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSigilsNestedInput
    sigilGroups?: SigilGroupUpdateManyWithoutSigilNestedInput
  }

  export type SigilUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    canvasData?: NullableStringFieldUpdateOperationsInput | string | null
    imageData?: NullableStringFieldUpdateOperationsInput | string | null
    isCharged?: BoolFieldUpdateOperationsInput | boolean
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sigilGroups?: SigilGroupUncheckedUpdateManyWithoutSigilNestedInput
  }

  export type SigilCreateManyInput = {
    id?: number
    name: string
    userId: number
    intention?: string | null
    canvasData?: string | null
    imageData?: string | null
    isCharged?: boolean
    locationName?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type SigilUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    canvasData?: NullableStringFieldUpdateOperationsInput | string | null
    imageData?: NullableStringFieldUpdateOperationsInput | string | null
    isCharged?: BoolFieldUpdateOperationsInput | boolean
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SigilUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    canvasData?: NullableStringFieldUpdateOperationsInput | string | null
    imageData?: NullableStringFieldUpdateOperationsInput | string | null
    isCharged?: BoolFieldUpdateOperationsInput | boolean
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SigilGroupCreateInput = {
    groupMember: string
    sigil: SigilCreateNestedOneWithoutSigilGroupsInput
  }

  export type SigilGroupUncheckedCreateInput = {
    id?: number
    sigilId: number
    groupMember: string
  }

  export type SigilGroupUpdateInput = {
    groupMember?: StringFieldUpdateOperationsInput | string
    sigil?: SigilUpdateOneRequiredWithoutSigilGroupsNestedInput
  }

  export type SigilGroupUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sigilId?: IntFieldUpdateOperationsInput | number
    groupMember?: StringFieldUpdateOperationsInput | string
  }

  export type SigilGroupCreateManyInput = {
    id?: number
    sigilId: number
    groupMember: string
  }

  export type SigilGroupUpdateManyMutationInput = {
    groupMember?: StringFieldUpdateOperationsInput | string
  }

  export type SigilGroupUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sigilId?: IntFieldUpdateOperationsInput | number
    groupMember?: StringFieldUpdateOperationsInput | string
  }

  export type SvgVectorCreateInput = {
    sigilId?: number | null
    filename: string
    vectorData: string
    width: number
    height: number
    fileSize: number
    createdAt?: Date | string
  }

  export type SvgVectorUncheckedCreateInput = {
    id?: number
    sigilId?: number | null
    filename: string
    vectorData: string
    width: number
    height: number
    fileSize: number
    createdAt?: Date | string
  }

  export type SvgVectorUpdateInput = {
    sigilId?: NullableIntFieldUpdateOperationsInput | number | null
    filename?: StringFieldUpdateOperationsInput | string
    vectorData?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SvgVectorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sigilId?: NullableIntFieldUpdateOperationsInput | number | null
    filename?: StringFieldUpdateOperationsInput | string
    vectorData?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SvgVectorCreateManyInput = {
    id?: number
    sigilId?: number | null
    filename: string
    vectorData: string
    width: number
    height: number
    fileSize: number
    createdAt?: Date | string
  }

  export type SvgVectorUpdateManyMutationInput = {
    sigilId?: NullableIntFieldUpdateOperationsInput | number | null
    filename?: StringFieldUpdateOperationsInput | string
    vectorData?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SvgVectorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sigilId?: NullableIntFieldUpdateOperationsInput | number | null
    filename?: StringFieldUpdateOperationsInput | string
    vectorData?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SigilListRelationFilter = {
    every?: SigilWhereInput
    some?: SigilWhereInput
    none?: SigilWhereInput
  }

  export type SigilOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    avatar?: SortOrder
    theme?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    avatar?: SortOrder
    theme?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    avatar?: SortOrder
    theme?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    avatar?: SortOrder
    theme?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    avatar?: SortOrder
    theme?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SigilGroupListRelationFilter = {
    every?: SigilGroupWhereInput
    some?: SigilGroupWhereInput
    none?: SigilGroupWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SigilGroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SigilOrderByRelevanceInput = {
    fields: SigilOrderByRelevanceFieldEnum | SigilOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SigilCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    intention?: SortOrder
    canvasData?: SortOrder
    imageData?: SortOrder
    isCharged?: SortOrder
    locationName?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
  }

  export type SigilAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type SigilMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    intention?: SortOrder
    canvasData?: SortOrder
    imageData?: SortOrder
    isCharged?: SortOrder
    locationName?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
  }

  export type SigilMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    intention?: SortOrder
    canvasData?: SortOrder
    imageData?: SortOrder
    isCharged?: SortOrder
    locationName?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
  }

  export type SigilSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type SigilScalarRelationFilter = {
    is?: SigilWhereInput
    isNot?: SigilWhereInput
  }

  export type SigilGroupOrderByRelevanceInput = {
    fields: SigilGroupOrderByRelevanceFieldEnum | SigilGroupOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SigilGroupCountOrderByAggregateInput = {
    id?: SortOrder
    sigilId?: SortOrder
    groupMember?: SortOrder
  }

  export type SigilGroupAvgOrderByAggregateInput = {
    id?: SortOrder
    sigilId?: SortOrder
  }

  export type SigilGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    sigilId?: SortOrder
    groupMember?: SortOrder
  }

  export type SigilGroupMinOrderByAggregateInput = {
    id?: SortOrder
    sigilId?: SortOrder
    groupMember?: SortOrder
  }

  export type SigilGroupSumOrderByAggregateInput = {
    id?: SortOrder
    sigilId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SvgVectorOrderByRelevanceInput = {
    fields: SvgVectorOrderByRelevanceFieldEnum | SvgVectorOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SvgVectorCountOrderByAggregateInput = {
    id?: SortOrder
    sigilId?: SortOrder
    filename?: SortOrder
    vectorData?: SortOrder
    width?: SortOrder
    height?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
  }

  export type SvgVectorAvgOrderByAggregateInput = {
    id?: SortOrder
    sigilId?: SortOrder
    width?: SortOrder
    height?: SortOrder
    fileSize?: SortOrder
  }

  export type SvgVectorMaxOrderByAggregateInput = {
    id?: SortOrder
    sigilId?: SortOrder
    filename?: SortOrder
    vectorData?: SortOrder
    width?: SortOrder
    height?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
  }

  export type SvgVectorMinOrderByAggregateInput = {
    id?: SortOrder
    sigilId?: SortOrder
    filename?: SortOrder
    vectorData?: SortOrder
    width?: SortOrder
    height?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
  }

  export type SvgVectorSumOrderByAggregateInput = {
    id?: SortOrder
    sigilId?: SortOrder
    width?: SortOrder
    height?: SortOrder
    fileSize?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SigilCreateNestedManyWithoutUserInput = {
    create?: XOR<SigilCreateWithoutUserInput, SigilUncheckedCreateWithoutUserInput> | SigilCreateWithoutUserInput[] | SigilUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SigilCreateOrConnectWithoutUserInput | SigilCreateOrConnectWithoutUserInput[]
    createMany?: SigilCreateManyUserInputEnvelope
    connect?: SigilWhereUniqueInput | SigilWhereUniqueInput[]
  }

  export type SigilUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SigilCreateWithoutUserInput, SigilUncheckedCreateWithoutUserInput> | SigilCreateWithoutUserInput[] | SigilUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SigilCreateOrConnectWithoutUserInput | SigilCreateOrConnectWithoutUserInput[]
    createMany?: SigilCreateManyUserInputEnvelope
    connect?: SigilWhereUniqueInput | SigilWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SigilUpdateManyWithoutUserNestedInput = {
    create?: XOR<SigilCreateWithoutUserInput, SigilUncheckedCreateWithoutUserInput> | SigilCreateWithoutUserInput[] | SigilUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SigilCreateOrConnectWithoutUserInput | SigilCreateOrConnectWithoutUserInput[]
    upsert?: SigilUpsertWithWhereUniqueWithoutUserInput | SigilUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SigilCreateManyUserInputEnvelope
    set?: SigilWhereUniqueInput | SigilWhereUniqueInput[]
    disconnect?: SigilWhereUniqueInput | SigilWhereUniqueInput[]
    delete?: SigilWhereUniqueInput | SigilWhereUniqueInput[]
    connect?: SigilWhereUniqueInput | SigilWhereUniqueInput[]
    update?: SigilUpdateWithWhereUniqueWithoutUserInput | SigilUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SigilUpdateManyWithWhereWithoutUserInput | SigilUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SigilScalarWhereInput | SigilScalarWhereInput[]
  }

  export type SigilUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SigilCreateWithoutUserInput, SigilUncheckedCreateWithoutUserInput> | SigilCreateWithoutUserInput[] | SigilUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SigilCreateOrConnectWithoutUserInput | SigilCreateOrConnectWithoutUserInput[]
    upsert?: SigilUpsertWithWhereUniqueWithoutUserInput | SigilUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SigilCreateManyUserInputEnvelope
    set?: SigilWhereUniqueInput | SigilWhereUniqueInput[]
    disconnect?: SigilWhereUniqueInput | SigilWhereUniqueInput[]
    delete?: SigilWhereUniqueInput | SigilWhereUniqueInput[]
    connect?: SigilWhereUniqueInput | SigilWhereUniqueInput[]
    update?: SigilUpdateWithWhereUniqueWithoutUserInput | SigilUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SigilUpdateManyWithWhereWithoutUserInput | SigilUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SigilScalarWhereInput | SigilScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSigilsInput = {
    create?: XOR<UserCreateWithoutSigilsInput, UserUncheckedCreateWithoutSigilsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSigilsInput
    connect?: UserWhereUniqueInput
  }

  export type SigilGroupCreateNestedManyWithoutSigilInput = {
    create?: XOR<SigilGroupCreateWithoutSigilInput, SigilGroupUncheckedCreateWithoutSigilInput> | SigilGroupCreateWithoutSigilInput[] | SigilGroupUncheckedCreateWithoutSigilInput[]
    connectOrCreate?: SigilGroupCreateOrConnectWithoutSigilInput | SigilGroupCreateOrConnectWithoutSigilInput[]
    createMany?: SigilGroupCreateManySigilInputEnvelope
    connect?: SigilGroupWhereUniqueInput | SigilGroupWhereUniqueInput[]
  }

  export type SigilGroupUncheckedCreateNestedManyWithoutSigilInput = {
    create?: XOR<SigilGroupCreateWithoutSigilInput, SigilGroupUncheckedCreateWithoutSigilInput> | SigilGroupCreateWithoutSigilInput[] | SigilGroupUncheckedCreateWithoutSigilInput[]
    connectOrCreate?: SigilGroupCreateOrConnectWithoutSigilInput | SigilGroupCreateOrConnectWithoutSigilInput[]
    createMany?: SigilGroupCreateManySigilInputEnvelope
    connect?: SigilGroupWhereUniqueInput | SigilGroupWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutSigilsNestedInput = {
    create?: XOR<UserCreateWithoutSigilsInput, UserUncheckedCreateWithoutSigilsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSigilsInput
    upsert?: UserUpsertWithoutSigilsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSigilsInput, UserUpdateWithoutSigilsInput>, UserUncheckedUpdateWithoutSigilsInput>
  }

  export type SigilGroupUpdateManyWithoutSigilNestedInput = {
    create?: XOR<SigilGroupCreateWithoutSigilInput, SigilGroupUncheckedCreateWithoutSigilInput> | SigilGroupCreateWithoutSigilInput[] | SigilGroupUncheckedCreateWithoutSigilInput[]
    connectOrCreate?: SigilGroupCreateOrConnectWithoutSigilInput | SigilGroupCreateOrConnectWithoutSigilInput[]
    upsert?: SigilGroupUpsertWithWhereUniqueWithoutSigilInput | SigilGroupUpsertWithWhereUniqueWithoutSigilInput[]
    createMany?: SigilGroupCreateManySigilInputEnvelope
    set?: SigilGroupWhereUniqueInput | SigilGroupWhereUniqueInput[]
    disconnect?: SigilGroupWhereUniqueInput | SigilGroupWhereUniqueInput[]
    delete?: SigilGroupWhereUniqueInput | SigilGroupWhereUniqueInput[]
    connect?: SigilGroupWhereUniqueInput | SigilGroupWhereUniqueInput[]
    update?: SigilGroupUpdateWithWhereUniqueWithoutSigilInput | SigilGroupUpdateWithWhereUniqueWithoutSigilInput[]
    updateMany?: SigilGroupUpdateManyWithWhereWithoutSigilInput | SigilGroupUpdateManyWithWhereWithoutSigilInput[]
    deleteMany?: SigilGroupScalarWhereInput | SigilGroupScalarWhereInput[]
  }

  export type SigilGroupUncheckedUpdateManyWithoutSigilNestedInput = {
    create?: XOR<SigilGroupCreateWithoutSigilInput, SigilGroupUncheckedCreateWithoutSigilInput> | SigilGroupCreateWithoutSigilInput[] | SigilGroupUncheckedCreateWithoutSigilInput[]
    connectOrCreate?: SigilGroupCreateOrConnectWithoutSigilInput | SigilGroupCreateOrConnectWithoutSigilInput[]
    upsert?: SigilGroupUpsertWithWhereUniqueWithoutSigilInput | SigilGroupUpsertWithWhereUniqueWithoutSigilInput[]
    createMany?: SigilGroupCreateManySigilInputEnvelope
    set?: SigilGroupWhereUniqueInput | SigilGroupWhereUniqueInput[]
    disconnect?: SigilGroupWhereUniqueInput | SigilGroupWhereUniqueInput[]
    delete?: SigilGroupWhereUniqueInput | SigilGroupWhereUniqueInput[]
    connect?: SigilGroupWhereUniqueInput | SigilGroupWhereUniqueInput[]
    update?: SigilGroupUpdateWithWhereUniqueWithoutSigilInput | SigilGroupUpdateWithWhereUniqueWithoutSigilInput[]
    updateMany?: SigilGroupUpdateManyWithWhereWithoutSigilInput | SigilGroupUpdateManyWithWhereWithoutSigilInput[]
    deleteMany?: SigilGroupScalarWhereInput | SigilGroupScalarWhereInput[]
  }

  export type SigilCreateNestedOneWithoutSigilGroupsInput = {
    create?: XOR<SigilCreateWithoutSigilGroupsInput, SigilUncheckedCreateWithoutSigilGroupsInput>
    connectOrCreate?: SigilCreateOrConnectWithoutSigilGroupsInput
    connect?: SigilWhereUniqueInput
  }

  export type SigilUpdateOneRequiredWithoutSigilGroupsNestedInput = {
    create?: XOR<SigilCreateWithoutSigilGroupsInput, SigilUncheckedCreateWithoutSigilGroupsInput>
    connectOrCreate?: SigilCreateOrConnectWithoutSigilGroupsInput
    upsert?: SigilUpsertWithoutSigilGroupsInput
    connect?: SigilWhereUniqueInput
    update?: XOR<XOR<SigilUpdateToOneWithWhereWithoutSigilGroupsInput, SigilUpdateWithoutSigilGroupsInput>, SigilUncheckedUpdateWithoutSigilGroupsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SigilCreateWithoutUserInput = {
    name: string
    intention?: string | null
    canvasData?: string | null
    imageData?: string | null
    isCharged?: boolean
    locationName?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    sigilGroups?: SigilGroupCreateNestedManyWithoutSigilInput
  }

  export type SigilUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    intention?: string | null
    canvasData?: string | null
    imageData?: string | null
    isCharged?: boolean
    locationName?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    sigilGroups?: SigilGroupUncheckedCreateNestedManyWithoutSigilInput
  }

  export type SigilCreateOrConnectWithoutUserInput = {
    where: SigilWhereUniqueInput
    create: XOR<SigilCreateWithoutUserInput, SigilUncheckedCreateWithoutUserInput>
  }

  export type SigilCreateManyUserInputEnvelope = {
    data: SigilCreateManyUserInput | SigilCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SigilUpsertWithWhereUniqueWithoutUserInput = {
    where: SigilWhereUniqueInput
    update: XOR<SigilUpdateWithoutUserInput, SigilUncheckedUpdateWithoutUserInput>
    create: XOR<SigilCreateWithoutUserInput, SigilUncheckedCreateWithoutUserInput>
  }

  export type SigilUpdateWithWhereUniqueWithoutUserInput = {
    where: SigilWhereUniqueInput
    data: XOR<SigilUpdateWithoutUserInput, SigilUncheckedUpdateWithoutUserInput>
  }

  export type SigilUpdateManyWithWhereWithoutUserInput = {
    where: SigilScalarWhereInput
    data: XOR<SigilUpdateManyMutationInput, SigilUncheckedUpdateManyWithoutUserInput>
  }

  export type SigilScalarWhereInput = {
    AND?: SigilScalarWhereInput | SigilScalarWhereInput[]
    OR?: SigilScalarWhereInput[]
    NOT?: SigilScalarWhereInput | SigilScalarWhereInput[]
    id?: IntFilter<"Sigil"> | number
    name?: StringFilter<"Sigil"> | string
    userId?: IntFilter<"Sigil"> | number
    intention?: StringNullableFilter<"Sigil"> | string | null
    canvasData?: StringNullableFilter<"Sigil"> | string | null
    imageData?: StringNullableFilter<"Sigil"> | string | null
    isCharged?: BoolFilter<"Sigil"> | boolean
    locationName?: StringNullableFilter<"Sigil"> | string | null
    latitude?: DecimalNullableFilter<"Sigil"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableFilter<"Sigil"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Sigil"> | Date | string
  }

  export type UserCreateWithoutSigilsInput = {
    username: string
    email: string
    avatar?: number
    theme?: number
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutSigilsInput = {
    id?: number
    username: string
    email: string
    avatar?: number
    theme?: number
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutSigilsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSigilsInput, UserUncheckedCreateWithoutSigilsInput>
  }

  export type SigilGroupCreateWithoutSigilInput = {
    groupMember: string
  }

  export type SigilGroupUncheckedCreateWithoutSigilInput = {
    id?: number
    groupMember: string
  }

  export type SigilGroupCreateOrConnectWithoutSigilInput = {
    where: SigilGroupWhereUniqueInput
    create: XOR<SigilGroupCreateWithoutSigilInput, SigilGroupUncheckedCreateWithoutSigilInput>
  }

  export type SigilGroupCreateManySigilInputEnvelope = {
    data: SigilGroupCreateManySigilInput | SigilGroupCreateManySigilInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSigilsInput = {
    update: XOR<UserUpdateWithoutSigilsInput, UserUncheckedUpdateWithoutSigilsInput>
    create: XOR<UserCreateWithoutSigilsInput, UserUncheckedCreateWithoutSigilsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSigilsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSigilsInput, UserUncheckedUpdateWithoutSigilsInput>
  }

  export type UserUpdateWithoutSigilsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    avatar?: IntFieldUpdateOperationsInput | number
    theme?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutSigilsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    avatar?: IntFieldUpdateOperationsInput | number
    theme?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SigilGroupUpsertWithWhereUniqueWithoutSigilInput = {
    where: SigilGroupWhereUniqueInput
    update: XOR<SigilGroupUpdateWithoutSigilInput, SigilGroupUncheckedUpdateWithoutSigilInput>
    create: XOR<SigilGroupCreateWithoutSigilInput, SigilGroupUncheckedCreateWithoutSigilInput>
  }

  export type SigilGroupUpdateWithWhereUniqueWithoutSigilInput = {
    where: SigilGroupWhereUniqueInput
    data: XOR<SigilGroupUpdateWithoutSigilInput, SigilGroupUncheckedUpdateWithoutSigilInput>
  }

  export type SigilGroupUpdateManyWithWhereWithoutSigilInput = {
    where: SigilGroupScalarWhereInput
    data: XOR<SigilGroupUpdateManyMutationInput, SigilGroupUncheckedUpdateManyWithoutSigilInput>
  }

  export type SigilGroupScalarWhereInput = {
    AND?: SigilGroupScalarWhereInput | SigilGroupScalarWhereInput[]
    OR?: SigilGroupScalarWhereInput[]
    NOT?: SigilGroupScalarWhereInput | SigilGroupScalarWhereInput[]
    id?: IntFilter<"SigilGroup"> | number
    sigilId?: IntFilter<"SigilGroup"> | number
    groupMember?: StringFilter<"SigilGroup"> | string
  }

  export type SigilCreateWithoutSigilGroupsInput = {
    name: string
    intention?: string | null
    canvasData?: string | null
    imageData?: string | null
    isCharged?: boolean
    locationName?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSigilsInput
  }

  export type SigilUncheckedCreateWithoutSigilGroupsInput = {
    id?: number
    name: string
    userId: number
    intention?: string | null
    canvasData?: string | null
    imageData?: string | null
    isCharged?: boolean
    locationName?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type SigilCreateOrConnectWithoutSigilGroupsInput = {
    where: SigilWhereUniqueInput
    create: XOR<SigilCreateWithoutSigilGroupsInput, SigilUncheckedCreateWithoutSigilGroupsInput>
  }

  export type SigilUpsertWithoutSigilGroupsInput = {
    update: XOR<SigilUpdateWithoutSigilGroupsInput, SigilUncheckedUpdateWithoutSigilGroupsInput>
    create: XOR<SigilCreateWithoutSigilGroupsInput, SigilUncheckedCreateWithoutSigilGroupsInput>
    where?: SigilWhereInput
  }

  export type SigilUpdateToOneWithWhereWithoutSigilGroupsInput = {
    where?: SigilWhereInput
    data: XOR<SigilUpdateWithoutSigilGroupsInput, SigilUncheckedUpdateWithoutSigilGroupsInput>
  }

  export type SigilUpdateWithoutSigilGroupsInput = {
    name?: StringFieldUpdateOperationsInput | string
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    canvasData?: NullableStringFieldUpdateOperationsInput | string | null
    imageData?: NullableStringFieldUpdateOperationsInput | string | null
    isCharged?: BoolFieldUpdateOperationsInput | boolean
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSigilsNestedInput
  }

  export type SigilUncheckedUpdateWithoutSigilGroupsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    canvasData?: NullableStringFieldUpdateOperationsInput | string | null
    imageData?: NullableStringFieldUpdateOperationsInput | string | null
    isCharged?: BoolFieldUpdateOperationsInput | boolean
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SigilCreateManyUserInput = {
    id?: number
    name: string
    intention?: string | null
    canvasData?: string | null
    imageData?: string | null
    isCharged?: boolean
    locationName?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type SigilUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    canvasData?: NullableStringFieldUpdateOperationsInput | string | null
    imageData?: NullableStringFieldUpdateOperationsInput | string | null
    isCharged?: BoolFieldUpdateOperationsInput | boolean
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sigilGroups?: SigilGroupUpdateManyWithoutSigilNestedInput
  }

  export type SigilUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    canvasData?: NullableStringFieldUpdateOperationsInput | string | null
    imageData?: NullableStringFieldUpdateOperationsInput | string | null
    isCharged?: BoolFieldUpdateOperationsInput | boolean
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sigilGroups?: SigilGroupUncheckedUpdateManyWithoutSigilNestedInput
  }

  export type SigilUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    canvasData?: NullableStringFieldUpdateOperationsInput | string | null
    imageData?: NullableStringFieldUpdateOperationsInput | string | null
    isCharged?: BoolFieldUpdateOperationsInput | boolean
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SigilGroupCreateManySigilInput = {
    id?: number
    groupMember: string
  }

  export type SigilGroupUpdateWithoutSigilInput = {
    groupMember?: StringFieldUpdateOperationsInput | string
  }

  export type SigilGroupUncheckedUpdateWithoutSigilInput = {
    id?: IntFieldUpdateOperationsInput | number
    groupMember?: StringFieldUpdateOperationsInput | string
  }

  export type SigilGroupUncheckedUpdateManyWithoutSigilInput = {
    id?: IntFieldUpdateOperationsInput | number
    groupMember?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}