# Prompt Hub

Prompt Hub es un monorepo diseñado para centralizar, gestionar y compartir prompts, componentes y configuraciones reutilizables en proyectos de desarrollo que utilizan inteligencia artificial, automatización o generación de contenido. Su objetivo es facilitar la colaboración entre equipos, acelerar el desarrollo y mantener la coherencia en el uso de prompts y herramientas asociadas.

## ¿Para qué sirve?

Prompt Hub permite:

- Organizar y versionar prompts para modelos de lenguaje o IA generativa.
- Compartir componentes de interfaz y configuraciones entre diferentes aplicaciones.
- Estandarizar buenas prácticas en el uso de prompts y herramientas relacionadas.
- Mejorar la productividad y la colaboración en equipos multidisciplinares.

## Estructura del monorepo

El monorepo está organizado en aplicaciones y paquetes reutilizables:

### Aplicaciones (`apps/`)

- **docs**: Aplicación Next.js para la documentación del monorepo y sus componentes.
- **web**: Aplicación Next.js principal para interactuar con los prompts y herramientas del hub.

### Paquetes (`packages/`)

- **@repo/ui**: Librería de componentes React compartidos entre las aplicaciones.
- **@repo/eslint-config**: Configuración de ESLint común para mantener la calidad del código.
- **@repo/typescript-config**: Configuración de TypeScript compartida para tipado estricto y coherente.

## Tecnologías principales

- **TypeScript**: Tipado estático en todo el monorepo.
- **Next.js**: Framework para aplicaciones web modernas.
- **Turborepo**: Herramienta para gestionar monorepos, tareas y caché.
- **ESLint & Prettier**: Linting y formateo de código.

## Comandos principales

- `yarn build`: Compila todas las apps y paquetes.
- `yarn dev`: Inicia el entorno de desarrollo para todas las apps y paquetes.
- `yarn lint`: Ejecuta el linter en todo el monorepo.
- `yarn format`: Formatea el código fuente.
- `yarn git:commit-push`: Automatiza el commit y push de cambios.

## Instalación y uso

1. Clona el repositorio y accede a la carpeta raíz.
2. Instala las dependencias con `yarn install`.
3. Usa los comandos anteriores según tus necesidades de desarrollo.

## Enlaces útiles

- [Documentación de Turborepo](https://turbo.build/repo/docs)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io)

---

A continuación, se mantiene la documentación técnica original para referencia rápida sobre el uso de Turborepo y las utilidades incluidas.

# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
