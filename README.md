# ASCII Header CLI

Interactive CLI to generate reusable code headers with ASCII art.

---

# Español

## Qué Es

`ASCII Header CLI` es una herramienta interactiva de terminal para generar cabeceras reutilizables para archivos de código usando arte ASCII.

Este proyecto está planteado como una herramienta útil y, al mismo tiempo, como un proyecto de aprendizaje orientado a portfolio. La idea no era construir un script rápido, sino una CLI bien estructurada, visualmente atractiva y fácil de entender.

## Qué Hace

La herramienta permite:

- introducir un título obligatorio
- elegir una fuente ASCII
- seleccionar un lenguaje objetivo
- añadir metadatos opcionales como autor, versión, descripción, fecha, proyecto, licencia y web
- previsualizar el resultado antes de guardarlo
- exportar la cabecera final como archivo `.txt`

La cabecera generada se comenta automáticamente con el estilo correcto según el lenguaje elegido.

## Por Qué Existe Este Proyecto

Este proyecto se creó con dos objetivos:

1. construir una herramienta realmente útil
2. usarla como ejercicio práctico para aprender:
   - fundamentos de TypeScript
   - diseño de CLIs
   - experiencia de usuario en terminal
   - arquitectura modular
   - lógica guiada por configuración

En lugar de meter toda la lógica en un único archivo, el proyecto está dividido en módulos pequeños y claros para que sea más mantenible, ampliable y didáctico.

## Lenguajes Soportados

La primera versión soporta:

- JavaScript
- TypeScript
- Python
- PHP
- Java
- C
- C++
- Shell
- HTML
- CSS

Cada lenguaje está asociado a su sintaxis de comentario correspondiente.

## Funcionalidades

- flujo interactivo en terminal
- interfaz localizada con detección `es/en`
- selección de fuentes ASCII
- filtrado de fuentes según el ancho de la terminal
- vista previa antes de guardar
- los campos vacíos se omiten automáticamente
- interfaz visual cuidada en terminal
- salida guardada como `.txt`

## Ejemplo De Salida

```txt
/**
 * +-------------------------------------------+
 * |             [ ASCII HEADER ]              |
 * | ----------------------------------------- |
 * |   __  __ _   ____  _             _        |
 * |  |  \/  (_) |  _ \| |_   _  __ _(_)_ __   |
 * |  | |\/| | | | |_) | | | | |/ _` | | '_ \  |
 * |  | |  | | | |  __/| | |_| | (_| | | | | | |
 * |  |_|  |_|_| |_|   |_|\__,_|\__, |_|_| |_| |
 * |                            |___/          |
 * |                                           |
 * | Author: Fernando                          |
 * | Version: 1.0.0                            |
 * | Description: CLI de prueba                |
 * | Date: 2026-04-21                          |
 * | Project: Portfolio CLI                    |
 * | License: MIT                              |
 * | Website: https://example.com              |
 * +-------------------------------------------+
 */
```

## Capturas Y GIFs

Para mejorar la presentación visual del proyecto en GitHub, este repositorio puede incluir capturas y animaciones del flujo de la CLI.

Ruta recomendada para los recursos:

```txt
docs/media/
```

Ejemplo de imágenes en el README:

```md
![CLI welcome screen](docs/media/cli-banner.png)
![CLI preview flow](docs/media/cli-preview.png)
```

Ejemplo de GIF en el README:

```md
![ASCII Header CLI demo](docs/media/cli-demo.gif)
```

Ejemplo de bloque listo para usar:

```md
## Demo Visual

![ASCII Header CLI demo](docs/media/cli-demo.gif)

## Capturas

![Welcome screen](docs/media/cli-banner.png)
![Preview and summary](docs/media/cli-preview.png)
```

Sugerencias de contenido visual:

- pantalla inicial con el banner ASCII
- selección de fuente y lenguaje
- vista previa de la cabecera antes de guardar
- GIF corto mostrando el flujo completo

## Stack Tecnológico

- `Node.js`
- `TypeScript`
- `@inquirer/prompts`
- `figlet`
- `chalk`
- `boxen`
- `ora`

## Instalación

Clona el repositorio e instala las dependencias:

```bash
npm install
```

## Ejecutar En Desarrollo

```bash
npm run dev
```

Esto ejecuta la CLI directamente desde los archivos TypeScript usando `tsx`.

## Compilar

```bash
npm run build
```

Esto compila el proyecto dentro de la carpeta `dist/`.

## Ejecutar La Versión Compilada

```bash
npm start
```

## Script De Demo

También existe un pequeño script de demo que genera una cabecera de ejemplo sin pasar por el flujo interactivo:

```bash
npm run demo
```

## Estructura Del Proyecto

```txt
ascii-header-cli/
├─ src/
│  ├─ cli/
│  │  ├─ prompts.ts
│  │  └─ ui.ts
│  ├─ config/
│  │  ├─ fonts.ts
│  │  └─ languages.ts
│  ├─ i18n/
│  │  └─ messages.ts
│  ├─ services/
│  │  ├─ asciiRenderer.ts
│  │  ├─ fileWriter.ts
│  │  ├─ generateHeaderArtifact.ts
│  │  └─ headerBuilder.ts
│  ├─ utils/
│  │  ├─ detectLocale.ts
│  │  └─ normalizeFileName.ts
│  ├─ demo.ts
│  ├─ index.ts
│  └─ types.ts
├─ output/
├─ package.json
└─ tsconfig.json
```

## Notas De Arquitectura

El proyecto está organizado por responsabilidad:

- `index.ts` orquesta el flujo principal de la CLI
- `prompts.ts` gestiona la entrada del usuario
- `ui.ts` controla la presentación en terminal
- `asciiRenderer.ts` genera el ASCII y comprueba límites de ancho
- `headerBuilder.ts` construye la cabecera final
- `fileWriter.ts` guarda la salida generada
- `languages.ts` contiene las reglas de comentario por lenguaje
- `types.ts` define los contratos compartidos de TypeScript

Esta separación hace que el proyecto sea más fácil de mantener, ampliar, probar y explicar.

## Aprendizajes Clave

Este proyecto es un buen ejemplo inicial para aprender:

- uso real de `async/await` en una CLI
- diseño basado en módulos reutilizables
- modelado de datos con interfaces de TypeScript
- separación entre lógica de negocio y presentación
- validación basada en condiciones reales de ejecución, como el ancho del terminal
- generación de comportamiento a partir de configuración en lugar de hardcodearlo

## Limitaciones Actuales

- la salida solo se guarda como `.txt`
- la CLI no inserta todavía cabeceras directamente dentro de archivos existentes
- aún no hay plantillas reutilizables guardadas
- el soporte de lenguajes es deliberadamente limitado a un primer conjunto útil

## Posibles Mejoras Futuras

- variantes visuales de cabecera como `minimal`, `boxed` o `retro`
- inserción directa en archivos existentes
- plantillas personalizadas del usuario
- flags por línea de comandos además del modo interactivo
- publicación como paquete instalable en npm
- tests para la lógica de render y formateo

## Autor

Fernando Pinilla Valbuena

## Licencia

MIT

---

# English

## What It Is

`ASCII Header CLI` is an interactive terminal tool for generating reusable headers for code files using ASCII art.

This project was designed as both a useful tool and a portfolio-oriented learning project. The goal was not to build a quick script, but a well-structured CLI with clear architecture, strong terminal UX, and a visually distinctive style.

## What It Does

The tool allows you to:

- enter a required title
- choose an ASCII font
- select a target language
- add optional metadata such as author, version, description, date, project, license, and website
- preview the result before saving
- export the final header as a `.txt` file

The generated header is automatically formatted using the correct comment style for the selected language.

## Why This Project Exists

This project was created with two goals:

1. build something genuinely useful
2. use it as a practical learning exercise for:
   - TypeScript fundamentals
   - CLI design
   - terminal user experience
   - modular architecture
   - configuration-driven logic

Instead of putting everything in a single file, the project is split into small focused modules so it is easier to understand, maintain, extend, and explain.

## Supported Languages

The first version supports:

- JavaScript
- TypeScript
- Python
- PHP
- Java
- C
- C++
- Shell
- HTML
- CSS

Each language is mapped to its corresponding comment syntax.

## Features

- interactive terminal flow
- localized UI with `es/en` detection
- ASCII font selection
- terminal-width-aware font filtering
- preview before saving
- empty fields are omitted automatically
- visually styled terminal interface
- output saved as `.txt`

## Example Output

```txt
/**
 * +-------------------------------------------+
 * |             [ ASCII HEADER ]              |
 * | ----------------------------------------- |
 * |   __  __ _   ____  _             _        |
 * |  |  \/  (_) |  _ \| |_   _  __ _(_)_ __   |
 * |  | |\/| | | | |_) | | | | |/ _` | | '_ \  |
 * |  | |  | | | |  __/| | |_| | (_| | | | | | |
 * |  |_|  |_|_| |_|   |_|\__,_|\__, |_|_| |_| |
 * |                            |___/          |
 * |                                           |
 * | Author: Fernando                          |
 * | Version: 1.0.0                            |
 * | Description: CLI de prueba                |
 * | Date: 2026-04-21                          |
 * | Project: Portfolio CLI                    |
 * | License: MIT                              |
 * | Website: https://example.com              |
 * +-------------------------------------------+
 */
```

## Screenshots And GIFs

To improve the visual presentation of the project on GitHub, the repository can include screenshots and short GIFs showing the CLI flow.

Recommended path for assets:

```txt
docs/media/
```

Example images inside the README:

```md
![CLI welcome screen](docs/media/cli-banner.png)
![CLI preview flow](docs/media/cli-preview.png)
```

Example GIF inside the README:

```md
![ASCII Header CLI demo](docs/media/cli-demo.gif)
```

Ready-to-use example block:

```md
## Visual Demo

![ASCII Header CLI demo](docs/media/cli-demo.gif)

## Screenshots

![Welcome screen](docs/media/cli-banner.png)
![Preview and summary](docs/media/cli-preview.png)
```

Suggested visual content:

- initial screen with the ASCII banner
- font and language selection
- final header preview before saving
- short GIF showing the full flow

## Tech Stack

- `Node.js`
- `TypeScript`
- `@inquirer/prompts`
- `figlet`
- `chalk`
- `boxen`
- `ora`

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Run In Development

```bash
npm run dev
```

This runs the CLI directly from the TypeScript source using `tsx`.

## Build

```bash
npm run build
```

This compiles the project into the `dist/` folder.

## Run The Built Version

```bash
npm start
```

## Demo Script

There is also a small demo script that generates a sample header without using the interactive flow:

```bash
npm run demo
```

## Project Structure

```txt
ascii-header-cli/
├─ src/
│  ├─ cli/
│  │  ├─ prompts.ts
│  │  └─ ui.ts
│  ├─ config/
│  │  ├─ fonts.ts
│  │  └─ languages.ts
│  ├─ i18n/
│  │  └─ messages.ts
│  ├─ services/
│  │  ├─ asciiRenderer.ts
│  │  ├─ fileWriter.ts
│  │  ├─ generateHeaderArtifact.ts
│  │  └─ headerBuilder.ts
│  ├─ utils/
│  │  ├─ detectLocale.ts
│  │  └─ normalizeFileName.ts
│  ├─ demo.ts
│  ├─ index.ts
│  └─ types.ts
├─ output/
├─ package.json
└─ tsconfig.json
```

## Architecture Notes

The project is organized by responsibility:

- `index.ts` orchestrates the main CLI flow
- `prompts.ts` handles user input
- `ui.ts` handles terminal presentation
- `asciiRenderer.ts` generates ASCII output and checks width constraints
- `headerBuilder.ts` builds the final formatted header
- `fileWriter.ts` saves the generated output
- `languages.ts` stores language-specific comment rules
- `types.ts` defines shared TypeScript contracts

This separation makes the project easier to maintain, extend, test, and explain.

## Key Learning Points

This project is a good beginner-friendly example for learning:

- real `async/await` usage inside a CLI flow
- modular design with reusable pieces
- data modeling with TypeScript interfaces
- separation between business logic and presentation
- validation based on real runtime conditions such as terminal width
- generating behavior from configuration instead of hardcoding it

## Current Limitations

- output is only saved as `.txt`
- the CLI does not yet insert headers directly into existing files
- there are no saved reusable templates yet
- language support is intentionally limited to a first practical set

## Possible Future Improvements

- visual header variants such as `minimal`, `boxed`, or `retro`
- direct insertion into existing files
- custom user templates
- command-line flags in addition to interactive mode
- publish as an installable npm package
- tests for rendering and formatting logic

## Author

Fernando Pinilla Valbuena

## License

MIT
