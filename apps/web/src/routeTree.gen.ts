/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SpellsAddImport } from './routes/spells/add'
import { Route as SpellsIdImport } from './routes/spells/$id'
import { Route as MeRegisterImport } from './routes/me/register'
import { Route as MeLoginImport } from './routes/me/login'
import { Route as ItemsAddImport } from './routes/items/add'
import { Route as BestiaryAddImport } from './routes/bestiary/add'
import { Route as BestiaryIdImport } from './routes/bestiary/$id'
import { Route as SpellsEditIdImport } from './routes/spells/edit/$id'
import { Route as ItemsShareIdImport } from './routes/items/share/$id'
import { Route as ItemsEditIdImport } from './routes/items/edit/$id'
import { Route as BestiaryEditIdImport } from './routes/bestiary/edit/$id'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const SpellsIndexLazyImport = createFileRoute('/spells/')()
const ItemsIndexLazyImport = createFileRoute('/items/')()
const BestiaryIndexLazyImport = createFileRoute('/bestiary/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const SpellsIndexLazyRoute = SpellsIndexLazyImport.update({
  id: '/spells/',
  path: '/spells/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/spells/index.lazy').then((d) => d.Route))

const ItemsIndexLazyRoute = ItemsIndexLazyImport.update({
  id: '/items/',
  path: '/items/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/items/index.lazy').then((d) => d.Route))

const BestiaryIndexLazyRoute = BestiaryIndexLazyImport.update({
  id: '/bestiary/',
  path: '/bestiary/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/bestiary/index.lazy').then((d) => d.Route),
)

const SpellsAddRoute = SpellsAddImport.update({
  id: '/spells/add',
  path: '/spells/add',
  getParentRoute: () => rootRoute,
} as any)

const SpellsIdRoute = SpellsIdImport.update({
  id: '/spells/$id',
  path: '/spells/$id',
  getParentRoute: () => rootRoute,
} as any)

const MeRegisterRoute = MeRegisterImport.update({
  id: '/me/register',
  path: '/me/register',
  getParentRoute: () => rootRoute,
} as any)

const MeLoginRoute = MeLoginImport.update({
  id: '/me/login',
  path: '/me/login',
  getParentRoute: () => rootRoute,
} as any)

const ItemsAddRoute = ItemsAddImport.update({
  id: '/items/add',
  path: '/items/add',
  getParentRoute: () => rootRoute,
} as any)

const BestiaryAddRoute = BestiaryAddImport.update({
  id: '/bestiary/add',
  path: '/bestiary/add',
  getParentRoute: () => rootRoute,
} as any)

const BestiaryIdRoute = BestiaryIdImport.update({
  id: '/bestiary/$id',
  path: '/bestiary/$id',
  getParentRoute: () => rootRoute,
} as any)

const SpellsEditIdRoute = SpellsEditIdImport.update({
  id: '/spells/edit/$id',
  path: '/spells/edit/$id',
  getParentRoute: () => rootRoute,
} as any)

const ItemsShareIdRoute = ItemsShareIdImport.update({
  id: '/items/share/$id',
  path: '/items/share/$id',
  getParentRoute: () => rootRoute,
} as any)

const ItemsEditIdRoute = ItemsEditIdImport.update({
  id: '/items/edit/$id',
  path: '/items/edit/$id',
  getParentRoute: () => rootRoute,
} as any)

const BestiaryEditIdRoute = BestiaryEditIdImport.update({
  id: '/bestiary/edit/$id',
  path: '/bestiary/edit/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/bestiary/$id': {
      id: '/bestiary/$id'
      path: '/bestiary/$id'
      fullPath: '/bestiary/$id'
      preLoaderRoute: typeof BestiaryIdImport
      parentRoute: typeof rootRoute
    }
    '/bestiary/add': {
      id: '/bestiary/add'
      path: '/bestiary/add'
      fullPath: '/bestiary/add'
      preLoaderRoute: typeof BestiaryAddImport
      parentRoute: typeof rootRoute
    }
    '/items/add': {
      id: '/items/add'
      path: '/items/add'
      fullPath: '/items/add'
      preLoaderRoute: typeof ItemsAddImport
      parentRoute: typeof rootRoute
    }
    '/me/login': {
      id: '/me/login'
      path: '/me/login'
      fullPath: '/me/login'
      preLoaderRoute: typeof MeLoginImport
      parentRoute: typeof rootRoute
    }
    '/me/register': {
      id: '/me/register'
      path: '/me/register'
      fullPath: '/me/register'
      preLoaderRoute: typeof MeRegisterImport
      parentRoute: typeof rootRoute
    }
    '/spells/$id': {
      id: '/spells/$id'
      path: '/spells/$id'
      fullPath: '/spells/$id'
      preLoaderRoute: typeof SpellsIdImport
      parentRoute: typeof rootRoute
    }
    '/spells/add': {
      id: '/spells/add'
      path: '/spells/add'
      fullPath: '/spells/add'
      preLoaderRoute: typeof SpellsAddImport
      parentRoute: typeof rootRoute
    }
    '/bestiary/': {
      id: '/bestiary/'
      path: '/bestiary'
      fullPath: '/bestiary'
      preLoaderRoute: typeof BestiaryIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/items/': {
      id: '/items/'
      path: '/items'
      fullPath: '/items'
      preLoaderRoute: typeof ItemsIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/spells/': {
      id: '/spells/'
      path: '/spells'
      fullPath: '/spells'
      preLoaderRoute: typeof SpellsIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/bestiary/edit/$id': {
      id: '/bestiary/edit/$id'
      path: '/bestiary/edit/$id'
      fullPath: '/bestiary/edit/$id'
      preLoaderRoute: typeof BestiaryEditIdImport
      parentRoute: typeof rootRoute
    }
    '/items/edit/$id': {
      id: '/items/edit/$id'
      path: '/items/edit/$id'
      fullPath: '/items/edit/$id'
      preLoaderRoute: typeof ItemsEditIdImport
      parentRoute: typeof rootRoute
    }
    '/items/share/$id': {
      id: '/items/share/$id'
      path: '/items/share/$id'
      fullPath: '/items/share/$id'
      preLoaderRoute: typeof ItemsShareIdImport
      parentRoute: typeof rootRoute
    }
    '/spells/edit/$id': {
      id: '/spells/edit/$id'
      path: '/spells/edit/$id'
      fullPath: '/spells/edit/$id'
      preLoaderRoute: typeof SpellsEditIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/bestiary/$id': typeof BestiaryIdRoute
  '/bestiary/add': typeof BestiaryAddRoute
  '/items/add': typeof ItemsAddRoute
  '/me/login': typeof MeLoginRoute
  '/me/register': typeof MeRegisterRoute
  '/spells/$id': typeof SpellsIdRoute
  '/spells/add': typeof SpellsAddRoute
  '/bestiary': typeof BestiaryIndexLazyRoute
  '/items': typeof ItemsIndexLazyRoute
  '/spells': typeof SpellsIndexLazyRoute
  '/bestiary/edit/$id': typeof BestiaryEditIdRoute
  '/items/edit/$id': typeof ItemsEditIdRoute
  '/items/share/$id': typeof ItemsShareIdRoute
  '/spells/edit/$id': typeof SpellsEditIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/bestiary/$id': typeof BestiaryIdRoute
  '/bestiary/add': typeof BestiaryAddRoute
  '/items/add': typeof ItemsAddRoute
  '/me/login': typeof MeLoginRoute
  '/me/register': typeof MeRegisterRoute
  '/spells/$id': typeof SpellsIdRoute
  '/spells/add': typeof SpellsAddRoute
  '/bestiary': typeof BestiaryIndexLazyRoute
  '/items': typeof ItemsIndexLazyRoute
  '/spells': typeof SpellsIndexLazyRoute
  '/bestiary/edit/$id': typeof BestiaryEditIdRoute
  '/items/edit/$id': typeof ItemsEditIdRoute
  '/items/share/$id': typeof ItemsShareIdRoute
  '/spells/edit/$id': typeof SpellsEditIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/bestiary/$id': typeof BestiaryIdRoute
  '/bestiary/add': typeof BestiaryAddRoute
  '/items/add': typeof ItemsAddRoute
  '/me/login': typeof MeLoginRoute
  '/me/register': typeof MeRegisterRoute
  '/spells/$id': typeof SpellsIdRoute
  '/spells/add': typeof SpellsAddRoute
  '/bestiary/': typeof BestiaryIndexLazyRoute
  '/items/': typeof ItemsIndexLazyRoute
  '/spells/': typeof SpellsIndexLazyRoute
  '/bestiary/edit/$id': typeof BestiaryEditIdRoute
  '/items/edit/$id': typeof ItemsEditIdRoute
  '/items/share/$id': typeof ItemsShareIdRoute
  '/spells/edit/$id': typeof SpellsEditIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/bestiary/$id'
    | '/bestiary/add'
    | '/items/add'
    | '/me/login'
    | '/me/register'
    | '/spells/$id'
    | '/spells/add'
    | '/bestiary'
    | '/items'
    | '/spells'
    | '/bestiary/edit/$id'
    | '/items/edit/$id'
    | '/items/share/$id'
    | '/spells/edit/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/bestiary/$id'
    | '/bestiary/add'
    | '/items/add'
    | '/me/login'
    | '/me/register'
    | '/spells/$id'
    | '/spells/add'
    | '/bestiary'
    | '/items'
    | '/spells'
    | '/bestiary/edit/$id'
    | '/items/edit/$id'
    | '/items/share/$id'
    | '/spells/edit/$id'
  id:
    | '__root__'
    | '/'
    | '/bestiary/$id'
    | '/bestiary/add'
    | '/items/add'
    | '/me/login'
    | '/me/register'
    | '/spells/$id'
    | '/spells/add'
    | '/bestiary/'
    | '/items/'
    | '/spells/'
    | '/bestiary/edit/$id'
    | '/items/edit/$id'
    | '/items/share/$id'
    | '/spells/edit/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  BestiaryIdRoute: typeof BestiaryIdRoute
  BestiaryAddRoute: typeof BestiaryAddRoute
  ItemsAddRoute: typeof ItemsAddRoute
  MeLoginRoute: typeof MeLoginRoute
  MeRegisterRoute: typeof MeRegisterRoute
  SpellsIdRoute: typeof SpellsIdRoute
  SpellsAddRoute: typeof SpellsAddRoute
  BestiaryIndexLazyRoute: typeof BestiaryIndexLazyRoute
  ItemsIndexLazyRoute: typeof ItemsIndexLazyRoute
  SpellsIndexLazyRoute: typeof SpellsIndexLazyRoute
  BestiaryEditIdRoute: typeof BestiaryEditIdRoute
  ItemsEditIdRoute: typeof ItemsEditIdRoute
  ItemsShareIdRoute: typeof ItemsShareIdRoute
  SpellsEditIdRoute: typeof SpellsEditIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  BestiaryIdRoute: BestiaryIdRoute,
  BestiaryAddRoute: BestiaryAddRoute,
  ItemsAddRoute: ItemsAddRoute,
  MeLoginRoute: MeLoginRoute,
  MeRegisterRoute: MeRegisterRoute,
  SpellsIdRoute: SpellsIdRoute,
  SpellsAddRoute: SpellsAddRoute,
  BestiaryIndexLazyRoute: BestiaryIndexLazyRoute,
  ItemsIndexLazyRoute: ItemsIndexLazyRoute,
  SpellsIndexLazyRoute: SpellsIndexLazyRoute,
  BestiaryEditIdRoute: BestiaryEditIdRoute,
  ItemsEditIdRoute: ItemsEditIdRoute,
  ItemsShareIdRoute: ItemsShareIdRoute,
  SpellsEditIdRoute: SpellsEditIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/bestiary/$id",
        "/bestiary/add",
        "/items/add",
        "/me/login",
        "/me/register",
        "/spells/$id",
        "/spells/add",
        "/bestiary/",
        "/items/",
        "/spells/",
        "/bestiary/edit/$id",
        "/items/edit/$id",
        "/items/share/$id",
        "/spells/edit/$id"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/bestiary/$id": {
      "filePath": "bestiary/$id.tsx"
    },
    "/bestiary/add": {
      "filePath": "bestiary/add.tsx"
    },
    "/items/add": {
      "filePath": "items/add.tsx"
    },
    "/me/login": {
      "filePath": "me/login.tsx"
    },
    "/me/register": {
      "filePath": "me/register.tsx"
    },
    "/spells/$id": {
      "filePath": "spells/$id.tsx"
    },
    "/spells/add": {
      "filePath": "spells/add.tsx"
    },
    "/bestiary/": {
      "filePath": "bestiary/index.lazy.tsx"
    },
    "/items/": {
      "filePath": "items/index.lazy.tsx"
    },
    "/spells/": {
      "filePath": "spells/index.lazy.tsx"
    },
    "/bestiary/edit/$id": {
      "filePath": "bestiary/edit/$id.tsx"
    },
    "/items/edit/$id": {
      "filePath": "items/edit/$id.tsx"
    },
    "/items/share/$id": {
      "filePath": "items/share/$id.tsx"
    },
    "/spells/edit/$id": {
      "filePath": "spells/edit/$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
