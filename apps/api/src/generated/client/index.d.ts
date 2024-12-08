
/**
 * Client
**/

import * as runtime from './runtime/library.js';
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
 * Model Spell
 * 
 */
export type Spell = $Result.DefaultSelection<Prisma.$SpellPayload>
/**
 * Model Component
 * 
 */
export type Component = $Result.DefaultSelection<Prisma.$ComponentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  BASIC: 'BASIC',
  ADITOR: 'ADITOR',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const SpellType: {
  mouflette: 'mouflette',
  beast: 'beast',
  nature: 'nature',
  scourge: 'scourge',
  spirit: 'spirit',
  death: 'death',
  life: 'life',
  earth: 'earth',
  fire: 'fire',
  water: 'water',
  air: 'air',
  blood: 'blood'
};

export type SpellType = (typeof SpellType)[keyof typeof SpellType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type SpellType = $Enums.SpellType

export const SpellType: typeof $Enums.SpellType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.spell`: Exposes CRUD operations for the **Spell** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spells
    * const spells = await prisma.spell.findMany()
    * ```
    */
  get spell(): Prisma.SpellDelegate<ExtArgs>;

  /**
   * `prisma.component`: Exposes CRUD operations for the **Component** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Components
    * const components = await prisma.component.findMany()
    * ```
    */
  get component(): Prisma.ComponentDelegate<ExtArgs>;
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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.0.1
   * Query Engine version: 5dbef10bdbfb579e07d35cc85fb1518d357cb99e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Spell: 'Spell',
    Component: 'Component'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "spell" | "component"
      txIsolationLevel: never
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
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Spell: {
        payload: Prisma.$SpellPayload<ExtArgs>
        fields: Prisma.SpellFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpellFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpellFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>
          }
          findFirst: {
            args: Prisma.SpellFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpellFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>
          }
          findMany: {
            args: Prisma.SpellFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>[]
          }
          create: {
            args: Prisma.SpellCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>
          }
          createMany: {
            args: Prisma.SpellCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SpellDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>
          }
          update: {
            args: Prisma.SpellUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>
          }
          deleteMany: {
            args: Prisma.SpellDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpellUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SpellUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>
          }
          aggregate: {
            args: Prisma.SpellAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpell>
          }
          groupBy: {
            args: Prisma.SpellGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpellGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SpellFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SpellAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SpellCountArgs<ExtArgs>
            result: $Utils.Optional<SpellCountAggregateOutputType> | number
          }
        }
      }
      Component: {
        payload: Prisma.$ComponentPayload<ExtArgs>
        fields: Prisma.ComponentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComponentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComponentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>
          }
          findFirst: {
            args: Prisma.ComponentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComponentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>
          }
          findMany: {
            args: Prisma.ComponentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>[]
          }
          create: {
            args: Prisma.ComponentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>
          }
          createMany: {
            args: Prisma.ComponentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ComponentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>
          }
          update: {
            args: Prisma.ComponentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>
          }
          deleteMany: {
            args: Prisma.ComponentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComponentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ComponentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>
          }
          aggregate: {
            args: Prisma.ComponentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComponent>
          }
          groupBy: {
            args: Prisma.ComponentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComponentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ComponentFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ComponentAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ComponentCountArgs<ExtArgs>
            result: $Utils.Optional<ComponentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    isOwner: boolean | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    isOwner: boolean | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    isOwner: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    isOwner?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    isOwner?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    isOwner?: true
    role?: true
    createdAt?: true
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
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    isOwner: boolean
    role: $Enums.Role
    createdAt: Date
    _count: UserCountAggregateOutputType | null
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
    email?: boolean
    name?: boolean
    password?: boolean
    isOwner?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    isOwner?: boolean
    role?: boolean
    createdAt?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      isOwner: boolean
      role: $Enums.Role
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly isOwner: FieldRef<"User", 'Boolean'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
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
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model Spell
   */

  export type AggregateSpell = {
    _count: SpellCountAggregateOutputType | null
    _avg: SpellAvgAggregateOutputType | null
    _sum: SpellSumAggregateOutputType | null
    _min: SpellMinAggregateOutputType | null
    _max: SpellMaxAggregateOutputType | null
  }

  export type SpellAvgAggregateOutputType = {
    number: number | null
    level: number | null
    cost: number | null
    difficulty: number | null
  }

  export type SpellSumAggregateOutputType = {
    number: number | null
    level: number | null
    cost: number | null
    difficulty: number | null
  }

  export type SpellMinAggregateOutputType = {
    id: string | null
    number: number | null
    titleGlaise: string | null
    titleCommon: string | null
    createdAt: Date | null
    updatedAt: Date | null
    level: number | null
    type: $Enums.SpellType | null
    cost: number | null
    difficulty: number | null
    description: string | null
    damages: string | null
    heal: string | null
    effects: string | null
    range: string | null
    duration: string | null
    target: string | null
    components: string | null
  }

  export type SpellMaxAggregateOutputType = {
    id: string | null
    number: number | null
    titleGlaise: string | null
    titleCommon: string | null
    createdAt: Date | null
    updatedAt: Date | null
    level: number | null
    type: $Enums.SpellType | null
    cost: number | null
    difficulty: number | null
    description: string | null
    damages: string | null
    heal: string | null
    effects: string | null
    range: string | null
    duration: string | null
    target: string | null
    components: string | null
  }

  export type SpellCountAggregateOutputType = {
    id: number
    number: number
    titleGlaise: number
    titleCommon: number
    createdAt: number
    updatedAt: number
    level: number
    type: number
    cost: number
    difficulty: number
    description: number
    damages: number
    heal: number
    effects: number
    range: number
    duration: number
    target: number
    components: number
    _all: number
  }


  export type SpellAvgAggregateInputType = {
    number?: true
    level?: true
    cost?: true
    difficulty?: true
  }

  export type SpellSumAggregateInputType = {
    number?: true
    level?: true
    cost?: true
    difficulty?: true
  }

  export type SpellMinAggregateInputType = {
    id?: true
    number?: true
    titleGlaise?: true
    titleCommon?: true
    createdAt?: true
    updatedAt?: true
    level?: true
    type?: true
    cost?: true
    difficulty?: true
    description?: true
    damages?: true
    heal?: true
    effects?: true
    range?: true
    duration?: true
    target?: true
    components?: true
  }

  export type SpellMaxAggregateInputType = {
    id?: true
    number?: true
    titleGlaise?: true
    titleCommon?: true
    createdAt?: true
    updatedAt?: true
    level?: true
    type?: true
    cost?: true
    difficulty?: true
    description?: true
    damages?: true
    heal?: true
    effects?: true
    range?: true
    duration?: true
    target?: true
    components?: true
  }

  export type SpellCountAggregateInputType = {
    id?: true
    number?: true
    titleGlaise?: true
    titleCommon?: true
    createdAt?: true
    updatedAt?: true
    level?: true
    type?: true
    cost?: true
    difficulty?: true
    description?: true
    damages?: true
    heal?: true
    effects?: true
    range?: true
    duration?: true
    target?: true
    components?: true
    _all?: true
  }

  export type SpellAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Spell to aggregate.
     */
    where?: SpellWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spells to fetch.
     */
    orderBy?: SpellOrderByWithRelationInput | SpellOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpellWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spells from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spells.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Spells
    **/
    _count?: true | SpellCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpellAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpellSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpellMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpellMaxAggregateInputType
  }

  export type GetSpellAggregateType<T extends SpellAggregateArgs> = {
        [P in keyof T & keyof AggregateSpell]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpell[P]>
      : GetScalarType<T[P], AggregateSpell[P]>
  }




  export type SpellGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpellWhereInput
    orderBy?: SpellOrderByWithAggregationInput | SpellOrderByWithAggregationInput[]
    by: SpellScalarFieldEnum[] | SpellScalarFieldEnum
    having?: SpellScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpellCountAggregateInputType | true
    _avg?: SpellAvgAggregateInputType
    _sum?: SpellSumAggregateInputType
    _min?: SpellMinAggregateInputType
    _max?: SpellMaxAggregateInputType
  }

  export type SpellGroupByOutputType = {
    id: string
    number: number
    titleGlaise: string | null
    titleCommon: string
    createdAt: Date | null
    updatedAt: Date | null
    level: number
    type: $Enums.SpellType
    cost: number
    difficulty: number
    description: string | null
    damages: string | null
    heal: string | null
    effects: string | null
    range: string | null
    duration: string | null
    target: string | null
    components: string | null
    _count: SpellCountAggregateOutputType | null
    _avg: SpellAvgAggregateOutputType | null
    _sum: SpellSumAggregateOutputType | null
    _min: SpellMinAggregateOutputType | null
    _max: SpellMaxAggregateOutputType | null
  }

  type GetSpellGroupByPayload<T extends SpellGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpellGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpellGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpellGroupByOutputType[P]>
            : GetScalarType<T[P], SpellGroupByOutputType[P]>
        }
      >
    >


  export type SpellSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    titleGlaise?: boolean
    titleCommon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    level?: boolean
    type?: boolean
    cost?: boolean
    difficulty?: boolean
    description?: boolean
    damages?: boolean
    heal?: boolean
    effects?: boolean
    range?: boolean
    duration?: boolean
    target?: boolean
    components?: boolean
  }, ExtArgs["result"]["spell"]>


  export type SpellSelectScalar = {
    id?: boolean
    number?: boolean
    titleGlaise?: boolean
    titleCommon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    level?: boolean
    type?: boolean
    cost?: boolean
    difficulty?: boolean
    description?: boolean
    damages?: boolean
    heal?: boolean
    effects?: boolean
    range?: boolean
    duration?: boolean
    target?: boolean
    components?: boolean
  }


  export type $SpellPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Spell"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      number: number
      titleGlaise: string | null
      titleCommon: string
      createdAt: Date | null
      updatedAt: Date | null
      level: number
      type: $Enums.SpellType
      cost: number
      difficulty: number
      description: string | null
      damages: string | null
      heal: string | null
      effects: string | null
      range: string | null
      duration: string | null
      target: string | null
      components: string | null
    }, ExtArgs["result"]["spell"]>
    composites: {}
  }

  type SpellGetPayload<S extends boolean | null | undefined | SpellDefaultArgs> = $Result.GetResult<Prisma.$SpellPayload, S>

  type SpellCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SpellFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SpellCountAggregateInputType | true
    }

  export interface SpellDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Spell'], meta: { name: 'Spell' } }
    /**
     * Find zero or one Spell that matches the filter.
     * @param {SpellFindUniqueArgs} args - Arguments to find a Spell
     * @example
     * // Get one Spell
     * const spell = await prisma.spell.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpellFindUniqueArgs>(args: SelectSubset<T, SpellFindUniqueArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Spell that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SpellFindUniqueOrThrowArgs} args - Arguments to find a Spell
     * @example
     * // Get one Spell
     * const spell = await prisma.spell.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpellFindUniqueOrThrowArgs>(args: SelectSubset<T, SpellFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Spell that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellFindFirstArgs} args - Arguments to find a Spell
     * @example
     * // Get one Spell
     * const spell = await prisma.spell.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpellFindFirstArgs>(args?: SelectSubset<T, SpellFindFirstArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Spell that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellFindFirstOrThrowArgs} args - Arguments to find a Spell
     * @example
     * // Get one Spell
     * const spell = await prisma.spell.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpellFindFirstOrThrowArgs>(args?: SelectSubset<T, SpellFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Spells that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spells
     * const spells = await prisma.spell.findMany()
     * 
     * // Get first 10 Spells
     * const spells = await prisma.spell.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spellWithIdOnly = await prisma.spell.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpellFindManyArgs>(args?: SelectSubset<T, SpellFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Spell.
     * @param {SpellCreateArgs} args - Arguments to create a Spell.
     * @example
     * // Create one Spell
     * const Spell = await prisma.spell.create({
     *   data: {
     *     // ... data to create a Spell
     *   }
     * })
     * 
     */
    create<T extends SpellCreateArgs>(args: SelectSubset<T, SpellCreateArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Spells.
     * @param {SpellCreateManyArgs} args - Arguments to create many Spells.
     * @example
     * // Create many Spells
     * const spell = await prisma.spell.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpellCreateManyArgs>(args?: SelectSubset<T, SpellCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Spell.
     * @param {SpellDeleteArgs} args - Arguments to delete one Spell.
     * @example
     * // Delete one Spell
     * const Spell = await prisma.spell.delete({
     *   where: {
     *     // ... filter to delete one Spell
     *   }
     * })
     * 
     */
    delete<T extends SpellDeleteArgs>(args: SelectSubset<T, SpellDeleteArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Spell.
     * @param {SpellUpdateArgs} args - Arguments to update one Spell.
     * @example
     * // Update one Spell
     * const spell = await prisma.spell.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpellUpdateArgs>(args: SelectSubset<T, SpellUpdateArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Spells.
     * @param {SpellDeleteManyArgs} args - Arguments to filter Spells to delete.
     * @example
     * // Delete a few Spells
     * const { count } = await prisma.spell.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpellDeleteManyArgs>(args?: SelectSubset<T, SpellDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spells.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spells
     * const spell = await prisma.spell.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpellUpdateManyArgs>(args: SelectSubset<T, SpellUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Spell.
     * @param {SpellUpsertArgs} args - Arguments to update or create a Spell.
     * @example
     * // Update or create a Spell
     * const spell = await prisma.spell.upsert({
     *   create: {
     *     // ... data to create a Spell
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Spell we want to update
     *   }
     * })
     */
    upsert<T extends SpellUpsertArgs>(args: SelectSubset<T, SpellUpsertArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Spells that matches the filter.
     * @param {SpellFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const spell = await prisma.spell.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: SpellFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Spell.
     * @param {SpellAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const spell = await prisma.spell.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SpellAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Spells.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellCountArgs} args - Arguments to filter Spells to count.
     * @example
     * // Count the number of Spells
     * const count = await prisma.spell.count({
     *   where: {
     *     // ... the filter for the Spells we want to count
     *   }
     * })
    **/
    count<T extends SpellCountArgs>(
      args?: Subset<T, SpellCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpellCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Spell.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SpellAggregateArgs>(args: Subset<T, SpellAggregateArgs>): Prisma.PrismaPromise<GetSpellAggregateType<T>>

    /**
     * Group by Spell.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellGroupByArgs} args - Group by arguments.
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
      T extends SpellGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpellGroupByArgs['orderBy'] }
        : { orderBy?: SpellGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SpellGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpellGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Spell model
   */
  readonly fields: SpellFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Spell.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpellClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Spell model
   */ 
  interface SpellFieldRefs {
    readonly id: FieldRef<"Spell", 'String'>
    readonly number: FieldRef<"Spell", 'Int'>
    readonly titleGlaise: FieldRef<"Spell", 'String'>
    readonly titleCommon: FieldRef<"Spell", 'String'>
    readonly createdAt: FieldRef<"Spell", 'DateTime'>
    readonly updatedAt: FieldRef<"Spell", 'DateTime'>
    readonly level: FieldRef<"Spell", 'Int'>
    readonly type: FieldRef<"Spell", 'SpellType'>
    readonly cost: FieldRef<"Spell", 'Int'>
    readonly difficulty: FieldRef<"Spell", 'Int'>
    readonly description: FieldRef<"Spell", 'String'>
    readonly damages: FieldRef<"Spell", 'String'>
    readonly heal: FieldRef<"Spell", 'String'>
    readonly effects: FieldRef<"Spell", 'String'>
    readonly range: FieldRef<"Spell", 'String'>
    readonly duration: FieldRef<"Spell", 'String'>
    readonly target: FieldRef<"Spell", 'String'>
    readonly components: FieldRef<"Spell", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Spell findUnique
   */
  export type SpellFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Filter, which Spell to fetch.
     */
    where: SpellWhereUniqueInput
  }

  /**
   * Spell findUniqueOrThrow
   */
  export type SpellFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Filter, which Spell to fetch.
     */
    where: SpellWhereUniqueInput
  }

  /**
   * Spell findFirst
   */
  export type SpellFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Filter, which Spell to fetch.
     */
    where?: SpellWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spells to fetch.
     */
    orderBy?: SpellOrderByWithRelationInput | SpellOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spells.
     */
    cursor?: SpellWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spells from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spells.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spells.
     */
    distinct?: SpellScalarFieldEnum | SpellScalarFieldEnum[]
  }

  /**
   * Spell findFirstOrThrow
   */
  export type SpellFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Filter, which Spell to fetch.
     */
    where?: SpellWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spells to fetch.
     */
    orderBy?: SpellOrderByWithRelationInput | SpellOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spells.
     */
    cursor?: SpellWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spells from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spells.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spells.
     */
    distinct?: SpellScalarFieldEnum | SpellScalarFieldEnum[]
  }

  /**
   * Spell findMany
   */
  export type SpellFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Filter, which Spells to fetch.
     */
    where?: SpellWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spells to fetch.
     */
    orderBy?: SpellOrderByWithRelationInput | SpellOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Spells.
     */
    cursor?: SpellWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spells from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spells.
     */
    skip?: number
    distinct?: SpellScalarFieldEnum | SpellScalarFieldEnum[]
  }

  /**
   * Spell create
   */
  export type SpellCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * The data needed to create a Spell.
     */
    data: XOR<SpellCreateInput, SpellUncheckedCreateInput>
  }

  /**
   * Spell createMany
   */
  export type SpellCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Spells.
     */
    data: SpellCreateManyInput | SpellCreateManyInput[]
  }

  /**
   * Spell update
   */
  export type SpellUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * The data needed to update a Spell.
     */
    data: XOR<SpellUpdateInput, SpellUncheckedUpdateInput>
    /**
     * Choose, which Spell to update.
     */
    where: SpellWhereUniqueInput
  }

  /**
   * Spell updateMany
   */
  export type SpellUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Spells.
     */
    data: XOR<SpellUpdateManyMutationInput, SpellUncheckedUpdateManyInput>
    /**
     * Filter which Spells to update
     */
    where?: SpellWhereInput
  }

  /**
   * Spell upsert
   */
  export type SpellUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * The filter to search for the Spell to update in case it exists.
     */
    where: SpellWhereUniqueInput
    /**
     * In case the Spell found by the `where` argument doesn't exist, create a new Spell with this data.
     */
    create: XOR<SpellCreateInput, SpellUncheckedCreateInput>
    /**
     * In case the Spell was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpellUpdateInput, SpellUncheckedUpdateInput>
  }

  /**
   * Spell delete
   */
  export type SpellDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Filter which Spell to delete.
     */
    where: SpellWhereUniqueInput
  }

  /**
   * Spell deleteMany
   */
  export type SpellDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Spells to delete
     */
    where?: SpellWhereInput
  }

  /**
   * Spell findRaw
   */
  export type SpellFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Spell aggregateRaw
   */
  export type SpellAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Spell without action
   */
  export type SpellDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
  }


  /**
   * Model Component
   */

  export type AggregateComponent = {
    _count: ComponentCountAggregateOutputType | null
    _avg: ComponentAvgAggregateOutputType | null
    _sum: ComponentSumAggregateOutputType | null
    _min: ComponentMinAggregateOutputType | null
    _max: ComponentMaxAggregateOutputType | null
  }

  export type ComponentAvgAggregateOutputType = {
    quantity: number | null
    weight: number | null
    value: number | null
  }

  export type ComponentSumAggregateOutputType = {
    quantity: number | null
    weight: number | null
    value: number | null
  }

  export type ComponentMinAggregateOutputType = {
    id: string | null
    quantity: number | null
    name: string | null
    description: string | null
    weight: number | null
    value: number | null
    rarity: string | null
  }

  export type ComponentMaxAggregateOutputType = {
    id: string | null
    quantity: number | null
    name: string | null
    description: string | null
    weight: number | null
    value: number | null
    rarity: string | null
  }

  export type ComponentCountAggregateOutputType = {
    id: number
    quantity: number
    name: number
    description: number
    weight: number
    value: number
    rarity: number
    spells: number
    _all: number
  }


  export type ComponentAvgAggregateInputType = {
    quantity?: true
    weight?: true
    value?: true
  }

  export type ComponentSumAggregateInputType = {
    quantity?: true
    weight?: true
    value?: true
  }

  export type ComponentMinAggregateInputType = {
    id?: true
    quantity?: true
    name?: true
    description?: true
    weight?: true
    value?: true
    rarity?: true
  }

  export type ComponentMaxAggregateInputType = {
    id?: true
    quantity?: true
    name?: true
    description?: true
    weight?: true
    value?: true
    rarity?: true
  }

  export type ComponentCountAggregateInputType = {
    id?: true
    quantity?: true
    name?: true
    description?: true
    weight?: true
    value?: true
    rarity?: true
    spells?: true
    _all?: true
  }

  export type ComponentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Component to aggregate.
     */
    where?: ComponentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Components to fetch.
     */
    orderBy?: ComponentOrderByWithRelationInput | ComponentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComponentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Components from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Components.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Components
    **/
    _count?: true | ComponentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComponentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComponentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComponentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComponentMaxAggregateInputType
  }

  export type GetComponentAggregateType<T extends ComponentAggregateArgs> = {
        [P in keyof T & keyof AggregateComponent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComponent[P]>
      : GetScalarType<T[P], AggregateComponent[P]>
  }




  export type ComponentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComponentWhereInput
    orderBy?: ComponentOrderByWithAggregationInput | ComponentOrderByWithAggregationInput[]
    by: ComponentScalarFieldEnum[] | ComponentScalarFieldEnum
    having?: ComponentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComponentCountAggregateInputType | true
    _avg?: ComponentAvgAggregateInputType
    _sum?: ComponentSumAggregateInputType
    _min?: ComponentMinAggregateInputType
    _max?: ComponentMaxAggregateInputType
  }

  export type ComponentGroupByOutputType = {
    id: string
    quantity: number | null
    name: string
    description: string | null
    weight: number | null
    value: number | null
    rarity: string | null
    spells: string[]
    _count: ComponentCountAggregateOutputType | null
    _avg: ComponentAvgAggregateOutputType | null
    _sum: ComponentSumAggregateOutputType | null
    _min: ComponentMinAggregateOutputType | null
    _max: ComponentMaxAggregateOutputType | null
  }

  type GetComponentGroupByPayload<T extends ComponentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComponentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComponentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComponentGroupByOutputType[P]>
            : GetScalarType<T[P], ComponentGroupByOutputType[P]>
        }
      >
    >


  export type ComponentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantity?: boolean
    name?: boolean
    description?: boolean
    weight?: boolean
    value?: boolean
    rarity?: boolean
    spells?: boolean
  }, ExtArgs["result"]["component"]>


  export type ComponentSelectScalar = {
    id?: boolean
    quantity?: boolean
    name?: boolean
    description?: boolean
    weight?: boolean
    value?: boolean
    rarity?: boolean
    spells?: boolean
  }


  export type $ComponentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Component"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      quantity: number | null
      name: string
      description: string | null
      weight: number | null
      value: number | null
      rarity: string | null
      spells: string[]
    }, ExtArgs["result"]["component"]>
    composites: {}
  }

  type ComponentGetPayload<S extends boolean | null | undefined | ComponentDefaultArgs> = $Result.GetResult<Prisma.$ComponentPayload, S>

  type ComponentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ComponentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ComponentCountAggregateInputType | true
    }

  export interface ComponentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Component'], meta: { name: 'Component' } }
    /**
     * Find zero or one Component that matches the filter.
     * @param {ComponentFindUniqueArgs} args - Arguments to find a Component
     * @example
     * // Get one Component
     * const component = await prisma.component.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComponentFindUniqueArgs>(args: SelectSubset<T, ComponentFindUniqueArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Component that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ComponentFindUniqueOrThrowArgs} args - Arguments to find a Component
     * @example
     * // Get one Component
     * const component = await prisma.component.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComponentFindUniqueOrThrowArgs>(args: SelectSubset<T, ComponentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Component that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentFindFirstArgs} args - Arguments to find a Component
     * @example
     * // Get one Component
     * const component = await prisma.component.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComponentFindFirstArgs>(args?: SelectSubset<T, ComponentFindFirstArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Component that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentFindFirstOrThrowArgs} args - Arguments to find a Component
     * @example
     * // Get one Component
     * const component = await prisma.component.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComponentFindFirstOrThrowArgs>(args?: SelectSubset<T, ComponentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Components that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Components
     * const components = await prisma.component.findMany()
     * 
     * // Get first 10 Components
     * const components = await prisma.component.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const componentWithIdOnly = await prisma.component.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComponentFindManyArgs>(args?: SelectSubset<T, ComponentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Component.
     * @param {ComponentCreateArgs} args - Arguments to create a Component.
     * @example
     * // Create one Component
     * const Component = await prisma.component.create({
     *   data: {
     *     // ... data to create a Component
     *   }
     * })
     * 
     */
    create<T extends ComponentCreateArgs>(args: SelectSubset<T, ComponentCreateArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Components.
     * @param {ComponentCreateManyArgs} args - Arguments to create many Components.
     * @example
     * // Create many Components
     * const component = await prisma.component.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComponentCreateManyArgs>(args?: SelectSubset<T, ComponentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Component.
     * @param {ComponentDeleteArgs} args - Arguments to delete one Component.
     * @example
     * // Delete one Component
     * const Component = await prisma.component.delete({
     *   where: {
     *     // ... filter to delete one Component
     *   }
     * })
     * 
     */
    delete<T extends ComponentDeleteArgs>(args: SelectSubset<T, ComponentDeleteArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Component.
     * @param {ComponentUpdateArgs} args - Arguments to update one Component.
     * @example
     * // Update one Component
     * const component = await prisma.component.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComponentUpdateArgs>(args: SelectSubset<T, ComponentUpdateArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Components.
     * @param {ComponentDeleteManyArgs} args - Arguments to filter Components to delete.
     * @example
     * // Delete a few Components
     * const { count } = await prisma.component.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComponentDeleteManyArgs>(args?: SelectSubset<T, ComponentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Components.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Components
     * const component = await prisma.component.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComponentUpdateManyArgs>(args: SelectSubset<T, ComponentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Component.
     * @param {ComponentUpsertArgs} args - Arguments to update or create a Component.
     * @example
     * // Update or create a Component
     * const component = await prisma.component.upsert({
     *   create: {
     *     // ... data to create a Component
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Component we want to update
     *   }
     * })
     */
    upsert<T extends ComponentUpsertArgs>(args: SelectSubset<T, ComponentUpsertArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Components that matches the filter.
     * @param {ComponentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const component = await prisma.component.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: ComponentFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Component.
     * @param {ComponentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const component = await prisma.component.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ComponentAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Components.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentCountArgs} args - Arguments to filter Components to count.
     * @example
     * // Count the number of Components
     * const count = await prisma.component.count({
     *   where: {
     *     // ... the filter for the Components we want to count
     *   }
     * })
    **/
    count<T extends ComponentCountArgs>(
      args?: Subset<T, ComponentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComponentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Component.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ComponentAggregateArgs>(args: Subset<T, ComponentAggregateArgs>): Prisma.PrismaPromise<GetComponentAggregateType<T>>

    /**
     * Group by Component.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentGroupByArgs} args - Group by arguments.
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
      T extends ComponentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComponentGroupByArgs['orderBy'] }
        : { orderBy?: ComponentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ComponentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComponentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Component model
   */
  readonly fields: ComponentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Component.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComponentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Component model
   */ 
  interface ComponentFieldRefs {
    readonly id: FieldRef<"Component", 'String'>
    readonly quantity: FieldRef<"Component", 'Float'>
    readonly name: FieldRef<"Component", 'String'>
    readonly description: FieldRef<"Component", 'String'>
    readonly weight: FieldRef<"Component", 'Float'>
    readonly value: FieldRef<"Component", 'Float'>
    readonly rarity: FieldRef<"Component", 'String'>
    readonly spells: FieldRef<"Component", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * Component findUnique
   */
  export type ComponentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Filter, which Component to fetch.
     */
    where: ComponentWhereUniqueInput
  }

  /**
   * Component findUniqueOrThrow
   */
  export type ComponentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Filter, which Component to fetch.
     */
    where: ComponentWhereUniqueInput
  }

  /**
   * Component findFirst
   */
  export type ComponentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Filter, which Component to fetch.
     */
    where?: ComponentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Components to fetch.
     */
    orderBy?: ComponentOrderByWithRelationInput | ComponentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Components.
     */
    cursor?: ComponentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Components from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Components.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Components.
     */
    distinct?: ComponentScalarFieldEnum | ComponentScalarFieldEnum[]
  }

  /**
   * Component findFirstOrThrow
   */
  export type ComponentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Filter, which Component to fetch.
     */
    where?: ComponentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Components to fetch.
     */
    orderBy?: ComponentOrderByWithRelationInput | ComponentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Components.
     */
    cursor?: ComponentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Components from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Components.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Components.
     */
    distinct?: ComponentScalarFieldEnum | ComponentScalarFieldEnum[]
  }

  /**
   * Component findMany
   */
  export type ComponentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Filter, which Components to fetch.
     */
    where?: ComponentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Components to fetch.
     */
    orderBy?: ComponentOrderByWithRelationInput | ComponentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Components.
     */
    cursor?: ComponentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Components from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Components.
     */
    skip?: number
    distinct?: ComponentScalarFieldEnum | ComponentScalarFieldEnum[]
  }

  /**
   * Component create
   */
  export type ComponentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * The data needed to create a Component.
     */
    data: XOR<ComponentCreateInput, ComponentUncheckedCreateInput>
  }

  /**
   * Component createMany
   */
  export type ComponentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Components.
     */
    data: ComponentCreateManyInput | ComponentCreateManyInput[]
  }

  /**
   * Component update
   */
  export type ComponentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * The data needed to update a Component.
     */
    data: XOR<ComponentUpdateInput, ComponentUncheckedUpdateInput>
    /**
     * Choose, which Component to update.
     */
    where: ComponentWhereUniqueInput
  }

  /**
   * Component updateMany
   */
  export type ComponentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Components.
     */
    data: XOR<ComponentUpdateManyMutationInput, ComponentUncheckedUpdateManyInput>
    /**
     * Filter which Components to update
     */
    where?: ComponentWhereInput
  }

  /**
   * Component upsert
   */
  export type ComponentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * The filter to search for the Component to update in case it exists.
     */
    where: ComponentWhereUniqueInput
    /**
     * In case the Component found by the `where` argument doesn't exist, create a new Component with this data.
     */
    create: XOR<ComponentCreateInput, ComponentUncheckedCreateInput>
    /**
     * In case the Component was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComponentUpdateInput, ComponentUncheckedUpdateInput>
  }

  /**
   * Component delete
   */
  export type ComponentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Filter which Component to delete.
     */
    where: ComponentWhereUniqueInput
  }

  /**
   * Component deleteMany
   */
  export type ComponentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Components to delete
     */
    where?: ComponentWhereInput
  }

  /**
   * Component findRaw
   */
  export type ComponentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Component aggregateRaw
   */
  export type ComponentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Component without action
   */
  export type ComponentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    isOwner: 'isOwner',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SpellScalarFieldEnum: {
    id: 'id',
    number: 'number',
    titleGlaise: 'titleGlaise',
    titleCommon: 'titleCommon',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    level: 'level',
    type: 'type',
    cost: 'cost',
    difficulty: 'difficulty',
    description: 'description',
    damages: 'damages',
    heal: 'heal',
    effects: 'effects',
    range: 'range',
    duration: 'duration',
    target: 'target',
    components: 'components'
  };

  export type SpellScalarFieldEnum = (typeof SpellScalarFieldEnum)[keyof typeof SpellScalarFieldEnum]


  export const ComponentScalarFieldEnum: {
    id: 'id',
    quantity: 'quantity',
    name: 'name',
    description: 'description',
    weight: 'weight',
    value: 'value',
    rarity: 'rarity',
    spells: 'spells'
  };

  export type ComponentScalarFieldEnum = (typeof ComponentScalarFieldEnum)[keyof typeof ComponentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'SpellType'
   */
  export type EnumSpellTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SpellType'>
    


  /**
   * Reference to a field of type 'SpellType[]'
   */
  export type ListEnumSpellTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SpellType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    isOwner?: BoolFilter<"User"> | boolean
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    isOwner?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    password?: string
    name_password?: UserNamePasswordCompoundUniqueInput
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    isOwner?: BoolFilter<"User"> | boolean
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "password" | "name_password">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    isOwner?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    isOwner?: BoolWithAggregatesFilter<"User"> | boolean
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SpellWhereInput = {
    AND?: SpellWhereInput | SpellWhereInput[]
    OR?: SpellWhereInput[]
    NOT?: SpellWhereInput | SpellWhereInput[]
    id?: StringFilter<"Spell"> | string
    number?: IntFilter<"Spell"> | number
    titleGlaise?: StringNullableFilter<"Spell"> | string | null
    titleCommon?: StringFilter<"Spell"> | string
    createdAt?: DateTimeNullableFilter<"Spell"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Spell"> | Date | string | null
    level?: IntFilter<"Spell"> | number
    type?: EnumSpellTypeFilter<"Spell"> | $Enums.SpellType
    cost?: IntFilter<"Spell"> | number
    difficulty?: IntFilter<"Spell"> | number
    description?: StringNullableFilter<"Spell"> | string | null
    damages?: StringNullableFilter<"Spell"> | string | null
    heal?: StringNullableFilter<"Spell"> | string | null
    effects?: StringNullableFilter<"Spell"> | string | null
    range?: StringNullableFilter<"Spell"> | string | null
    duration?: StringNullableFilter<"Spell"> | string | null
    target?: StringNullableFilter<"Spell"> | string | null
    components?: StringNullableFilter<"Spell"> | string | null
  }

  export type SpellOrderByWithRelationInput = {
    id?: SortOrder
    number?: SortOrder
    titleGlaise?: SortOrder
    titleCommon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    level?: SortOrder
    type?: SortOrder
    cost?: SortOrder
    difficulty?: SortOrder
    description?: SortOrder
    damages?: SortOrder
    heal?: SortOrder
    effects?: SortOrder
    range?: SortOrder
    duration?: SortOrder
    target?: SortOrder
    components?: SortOrder
  }

  export type SpellWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    number?: number
    AND?: SpellWhereInput | SpellWhereInput[]
    OR?: SpellWhereInput[]
    NOT?: SpellWhereInput | SpellWhereInput[]
    titleGlaise?: StringNullableFilter<"Spell"> | string | null
    titleCommon?: StringFilter<"Spell"> | string
    createdAt?: DateTimeNullableFilter<"Spell"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Spell"> | Date | string | null
    level?: IntFilter<"Spell"> | number
    type?: EnumSpellTypeFilter<"Spell"> | $Enums.SpellType
    cost?: IntFilter<"Spell"> | number
    difficulty?: IntFilter<"Spell"> | number
    description?: StringNullableFilter<"Spell"> | string | null
    damages?: StringNullableFilter<"Spell"> | string | null
    heal?: StringNullableFilter<"Spell"> | string | null
    effects?: StringNullableFilter<"Spell"> | string | null
    range?: StringNullableFilter<"Spell"> | string | null
    duration?: StringNullableFilter<"Spell"> | string | null
    target?: StringNullableFilter<"Spell"> | string | null
    components?: StringNullableFilter<"Spell"> | string | null
  }, "id" | "number">

  export type SpellOrderByWithAggregationInput = {
    id?: SortOrder
    number?: SortOrder
    titleGlaise?: SortOrder
    titleCommon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    level?: SortOrder
    type?: SortOrder
    cost?: SortOrder
    difficulty?: SortOrder
    description?: SortOrder
    damages?: SortOrder
    heal?: SortOrder
    effects?: SortOrder
    range?: SortOrder
    duration?: SortOrder
    target?: SortOrder
    components?: SortOrder
    _count?: SpellCountOrderByAggregateInput
    _avg?: SpellAvgOrderByAggregateInput
    _max?: SpellMaxOrderByAggregateInput
    _min?: SpellMinOrderByAggregateInput
    _sum?: SpellSumOrderByAggregateInput
  }

  export type SpellScalarWhereWithAggregatesInput = {
    AND?: SpellScalarWhereWithAggregatesInput | SpellScalarWhereWithAggregatesInput[]
    OR?: SpellScalarWhereWithAggregatesInput[]
    NOT?: SpellScalarWhereWithAggregatesInput | SpellScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Spell"> | string
    number?: IntWithAggregatesFilter<"Spell"> | number
    titleGlaise?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    titleCommon?: StringWithAggregatesFilter<"Spell"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"Spell"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Spell"> | Date | string | null
    level?: IntWithAggregatesFilter<"Spell"> | number
    type?: EnumSpellTypeWithAggregatesFilter<"Spell"> | $Enums.SpellType
    cost?: IntWithAggregatesFilter<"Spell"> | number
    difficulty?: IntWithAggregatesFilter<"Spell"> | number
    description?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    damages?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    heal?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    effects?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    range?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    duration?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    target?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    components?: StringNullableWithAggregatesFilter<"Spell"> | string | null
  }

  export type ComponentWhereInput = {
    AND?: ComponentWhereInput | ComponentWhereInput[]
    OR?: ComponentWhereInput[]
    NOT?: ComponentWhereInput | ComponentWhereInput[]
    id?: StringFilter<"Component"> | string
    quantity?: FloatNullableFilter<"Component"> | number | null
    name?: StringFilter<"Component"> | string
    description?: StringNullableFilter<"Component"> | string | null
    weight?: FloatNullableFilter<"Component"> | number | null
    value?: FloatNullableFilter<"Component"> | number | null
    rarity?: StringNullableFilter<"Component"> | string | null
    spells?: StringNullableListFilter<"Component">
  }

  export type ComponentOrderByWithRelationInput = {
    id?: SortOrder
    quantity?: SortOrder
    name?: SortOrder
    description?: SortOrder
    weight?: SortOrder
    value?: SortOrder
    rarity?: SortOrder
    spells?: SortOrder
  }

  export type ComponentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ComponentWhereInput | ComponentWhereInput[]
    OR?: ComponentWhereInput[]
    NOT?: ComponentWhereInput | ComponentWhereInput[]
    quantity?: FloatNullableFilter<"Component"> | number | null
    description?: StringNullableFilter<"Component"> | string | null
    weight?: FloatNullableFilter<"Component"> | number | null
    value?: FloatNullableFilter<"Component"> | number | null
    rarity?: StringNullableFilter<"Component"> | string | null
    spells?: StringNullableListFilter<"Component">
  }, "id" | "name">

  export type ComponentOrderByWithAggregationInput = {
    id?: SortOrder
    quantity?: SortOrder
    name?: SortOrder
    description?: SortOrder
    weight?: SortOrder
    value?: SortOrder
    rarity?: SortOrder
    spells?: SortOrder
    _count?: ComponentCountOrderByAggregateInput
    _avg?: ComponentAvgOrderByAggregateInput
    _max?: ComponentMaxOrderByAggregateInput
    _min?: ComponentMinOrderByAggregateInput
    _sum?: ComponentSumOrderByAggregateInput
  }

  export type ComponentScalarWhereWithAggregatesInput = {
    AND?: ComponentScalarWhereWithAggregatesInput | ComponentScalarWhereWithAggregatesInput[]
    OR?: ComponentScalarWhereWithAggregatesInput[]
    NOT?: ComponentScalarWhereWithAggregatesInput | ComponentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Component"> | string
    quantity?: FloatNullableWithAggregatesFilter<"Component"> | number | null
    name?: StringWithAggregatesFilter<"Component"> | string
    description?: StringNullableWithAggregatesFilter<"Component"> | string | null
    weight?: FloatNullableWithAggregatesFilter<"Component"> | number | null
    value?: FloatNullableWithAggregatesFilter<"Component"> | number | null
    rarity?: StringNullableWithAggregatesFilter<"Component"> | string | null
    spells?: StringNullableListFilter<"Component">
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    isOwner: boolean
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    isOwner: boolean
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isOwner?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isOwner?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    isOwner: boolean
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isOwner?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isOwner?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpellCreateInput = {
    id?: string
    number: number
    titleGlaise?: string | null
    titleCommon: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    level: number
    type: $Enums.SpellType
    cost: number
    difficulty: number
    description?: string | null
    damages?: string | null
    heal?: string | null
    effects?: string | null
    range?: string | null
    duration?: string | null
    target?: string | null
    components?: string | null
  }

  export type SpellUncheckedCreateInput = {
    id?: string
    number: number
    titleGlaise?: string | null
    titleCommon: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    level: number
    type: $Enums.SpellType
    cost: number
    difficulty: number
    description?: string | null
    damages?: string | null
    heal?: string | null
    effects?: string | null
    range?: string | null
    duration?: string | null
    target?: string | null
    components?: string | null
  }

  export type SpellUpdateInput = {
    number?: IntFieldUpdateOperationsInput | number
    titleGlaise?: NullableStringFieldUpdateOperationsInput | string | null
    titleCommon?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    level?: IntFieldUpdateOperationsInput | number
    type?: EnumSpellTypeFieldUpdateOperationsInput | $Enums.SpellType
    cost?: IntFieldUpdateOperationsInput | number
    difficulty?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    damages?: NullableStringFieldUpdateOperationsInput | string | null
    heal?: NullableStringFieldUpdateOperationsInput | string | null
    effects?: NullableStringFieldUpdateOperationsInput | string | null
    range?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    target?: NullableStringFieldUpdateOperationsInput | string | null
    components?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SpellUncheckedUpdateInput = {
    number?: IntFieldUpdateOperationsInput | number
    titleGlaise?: NullableStringFieldUpdateOperationsInput | string | null
    titleCommon?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    level?: IntFieldUpdateOperationsInput | number
    type?: EnumSpellTypeFieldUpdateOperationsInput | $Enums.SpellType
    cost?: IntFieldUpdateOperationsInput | number
    difficulty?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    damages?: NullableStringFieldUpdateOperationsInput | string | null
    heal?: NullableStringFieldUpdateOperationsInput | string | null
    effects?: NullableStringFieldUpdateOperationsInput | string | null
    range?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    target?: NullableStringFieldUpdateOperationsInput | string | null
    components?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SpellCreateManyInput = {
    id?: string
    number: number
    titleGlaise?: string | null
    titleCommon: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    level: number
    type: $Enums.SpellType
    cost: number
    difficulty: number
    description?: string | null
    damages?: string | null
    heal?: string | null
    effects?: string | null
    range?: string | null
    duration?: string | null
    target?: string | null
    components?: string | null
  }

  export type SpellUpdateManyMutationInput = {
    number?: IntFieldUpdateOperationsInput | number
    titleGlaise?: NullableStringFieldUpdateOperationsInput | string | null
    titleCommon?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    level?: IntFieldUpdateOperationsInput | number
    type?: EnumSpellTypeFieldUpdateOperationsInput | $Enums.SpellType
    cost?: IntFieldUpdateOperationsInput | number
    difficulty?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    damages?: NullableStringFieldUpdateOperationsInput | string | null
    heal?: NullableStringFieldUpdateOperationsInput | string | null
    effects?: NullableStringFieldUpdateOperationsInput | string | null
    range?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    target?: NullableStringFieldUpdateOperationsInput | string | null
    components?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SpellUncheckedUpdateManyInput = {
    number?: IntFieldUpdateOperationsInput | number
    titleGlaise?: NullableStringFieldUpdateOperationsInput | string | null
    titleCommon?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    level?: IntFieldUpdateOperationsInput | number
    type?: EnumSpellTypeFieldUpdateOperationsInput | $Enums.SpellType
    cost?: IntFieldUpdateOperationsInput | number
    difficulty?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    damages?: NullableStringFieldUpdateOperationsInput | string | null
    heal?: NullableStringFieldUpdateOperationsInput | string | null
    effects?: NullableStringFieldUpdateOperationsInput | string | null
    range?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    target?: NullableStringFieldUpdateOperationsInput | string | null
    components?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComponentCreateInput = {
    id?: string
    quantity?: number | null
    name: string
    description?: string | null
    weight?: number | null
    value?: number | null
    rarity?: string | null
    spells?: ComponentCreatespellsInput | string[]
  }

  export type ComponentUncheckedCreateInput = {
    id?: string
    quantity?: number | null
    name: string
    description?: string | null
    weight?: number | null
    value?: number | null
    rarity?: string | null
    spells?: ComponentCreatespellsInput | string[]
  }

  export type ComponentUpdateInput = {
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    spells?: ComponentUpdatespellsInput | string[]
  }

  export type ComponentUncheckedUpdateInput = {
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    spells?: ComponentUpdatespellsInput | string[]
  }

  export type ComponentCreateManyInput = {
    id?: string
    quantity?: number | null
    name: string
    description?: string | null
    weight?: number | null
    value?: number | null
    rarity?: string | null
    spells?: ComponentCreatespellsInput | string[]
  }

  export type ComponentUpdateManyMutationInput = {
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    spells?: ComponentUpdatespellsInput | string[]
  }

  export type ComponentUncheckedUpdateManyInput = {
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    spells?: ComponentUpdatespellsInput | string[]
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserNamePasswordCompoundUniqueInput = {
    name: string
    password: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    isOwner?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    isOwner?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    isOwner?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type EnumSpellTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SpellType | EnumSpellTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SpellType[] | ListEnumSpellTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpellType[] | ListEnumSpellTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSpellTypeFilter<$PrismaModel> | $Enums.SpellType
  }

  export type SpellCountOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    titleGlaise?: SortOrder
    titleCommon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    level?: SortOrder
    type?: SortOrder
    cost?: SortOrder
    difficulty?: SortOrder
    description?: SortOrder
    damages?: SortOrder
    heal?: SortOrder
    effects?: SortOrder
    range?: SortOrder
    duration?: SortOrder
    target?: SortOrder
    components?: SortOrder
  }

  export type SpellAvgOrderByAggregateInput = {
    number?: SortOrder
    level?: SortOrder
    cost?: SortOrder
    difficulty?: SortOrder
  }

  export type SpellMaxOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    titleGlaise?: SortOrder
    titleCommon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    level?: SortOrder
    type?: SortOrder
    cost?: SortOrder
    difficulty?: SortOrder
    description?: SortOrder
    damages?: SortOrder
    heal?: SortOrder
    effects?: SortOrder
    range?: SortOrder
    duration?: SortOrder
    target?: SortOrder
    components?: SortOrder
  }

  export type SpellMinOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    titleGlaise?: SortOrder
    titleCommon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    level?: SortOrder
    type?: SortOrder
    cost?: SortOrder
    difficulty?: SortOrder
    description?: SortOrder
    damages?: SortOrder
    heal?: SortOrder
    effects?: SortOrder
    range?: SortOrder
    duration?: SortOrder
    target?: SortOrder
    components?: SortOrder
  }

  export type SpellSumOrderByAggregateInput = {
    number?: SortOrder
    level?: SortOrder
    cost?: SortOrder
    difficulty?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumSpellTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SpellType | EnumSpellTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SpellType[] | ListEnumSpellTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpellType[] | ListEnumSpellTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSpellTypeWithAggregatesFilter<$PrismaModel> | $Enums.SpellType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSpellTypeFilter<$PrismaModel>
    _max?: NestedEnumSpellTypeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ComponentCountOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    name?: SortOrder
    description?: SortOrder
    weight?: SortOrder
    value?: SortOrder
    rarity?: SortOrder
    spells?: SortOrder
  }

  export type ComponentAvgOrderByAggregateInput = {
    quantity?: SortOrder
    weight?: SortOrder
    value?: SortOrder
  }

  export type ComponentMaxOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    name?: SortOrder
    description?: SortOrder
    weight?: SortOrder
    value?: SortOrder
    rarity?: SortOrder
  }

  export type ComponentMinOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    name?: SortOrder
    description?: SortOrder
    weight?: SortOrder
    value?: SortOrder
    rarity?: SortOrder
  }

  export type ComponentSumOrderByAggregateInput = {
    quantity?: SortOrder
    weight?: SortOrder
    value?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type EnumSpellTypeFieldUpdateOperationsInput = {
    set?: $Enums.SpellType
  }

  export type ComponentCreatespellsInput = {
    set: string[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type ComponentUpdatespellsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
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
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedEnumSpellTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SpellType | EnumSpellTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SpellType[] | ListEnumSpellTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpellType[] | ListEnumSpellTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSpellTypeFilter<$PrismaModel> | $Enums.SpellType
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedEnumSpellTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SpellType | EnumSpellTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SpellType[] | ListEnumSpellTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpellType[] | ListEnumSpellTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSpellTypeWithAggregatesFilter<$PrismaModel> | $Enums.SpellType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSpellTypeFilter<$PrismaModel>
    _max?: NestedEnumSpellTypeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
    isSet?: boolean
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