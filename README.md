# Guifier React

An interactive front-end toolkit simplifying JSON, YAML, TOML, and XML data. Visualize, edit, convert formats, and perform real-time data manipulations. Built with React 19, Ant Design, and TypeScript.

## Features

- **Multi-format Support**: JSON, YAML, TOML, XML
- **Dual Editor View**: Code editor (CodeMirror) + Visual GUI editor side by side
- **Real-time Sync**: Changes in code editor instantly reflect in GUI editor and vice versa
- **Interactive GUI**: Expandable/collapsible containers, inline editing, add/delete fields
- **Type-safe**: Full TypeScript support
- **Error Handling**: Graceful error display for invalid data formats

## Tech Stack

| Category     | Technology                            |
| ------------ | ------------------------------------- |
| Framework    | React 19                              |
| UI Library   | Ant Design 5                          |
| Build Tool   | Vite 8 + SWC                          |
| Language     | TypeScript 5.8                        |
| Styling      | Tailwind CSS 3                        |
| Code Editor  | CodeMirror 6                          |
| Package Mgr  | bun                                   |
| Linting/Format | Biome 2                            |
| Git Hooks    | simple-git-hooks                      |

## Project Structure

```
guifier-react/
├── src/
│   ├── components/
│   │   ├── guifier/         # Core Guifier components
│   │   │   ├── fields/      # Primitive field editors
│   │   │   │   ├── StringField.tsx
│   │   │   │   ├── NumberField.tsx
│   │   │   │   ├── BooleanField.tsx
│   │   │   │   ├── NullField.tsx
│   │   │   │   └── DateField.tsx
│   │   │   ├── containers/  # Container components
│   │   │   │   ├── ObjectContainer.tsx
│   │   │   │   └── ArrayContainer.tsx
│   │   │   ├── CreateFieldButton.tsx
│   │   │   └── Guifier.tsx
│   │   ├── CodeEditor.tsx
│   │   └── GuifierEditorPageContent.tsx
│   ├── utils/               # Utility functions
│   │   ├── cn.ts
│   │   └── guifierUtils.ts
│   ├── samples/             # Sample data files
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── biome.json               # Biome configuration
├── .editorconfig            # Editor consistency
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.js        # PostCSS config
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 18
- bun >= 1.3

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd guifier-react

# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun dev

# Open http://localhost:5173
```

### Build

```bash
# Production build
bun run build

# Preview production build
bun run preview
```

## Scripts

| Script             | Description                                        |
| ------------------ | -------------------------------------------------- |
| `bun dev`          | Start development server                           |
| `bun run build`    | Type check and build for production                |
| `bun run preview`  | Preview production build                           |
| `bun run lint`     | Run Biome linter with strict rules                 |
| `bun run lint:fix` | Auto-fix Biome lint issues                         |
| `bun run format`   | Format code with Biome                             |
| `bun run format:check` | Check code formatting without modifying files  |
| `bun run check`    | Run Biome check (lint + format + organize imports) |
| `bun run type-check` | Run TypeScript type checking                    |
| `bun run check-all` | Run Biome check + TypeScript type checking       |

## Code Quality

### Biome Rules

- No unused variables (except prefixed with `_`)
- Explicit `any` usage warned
- Consistent type imports enforced
- No `console.log` (except `warn` and `error`)
- `prefer-const` enforced
- Strict equality (`===`) required
- Import organizing on save

### Biome Formatting

- Single quotes
- No semicolons
- Trailing commas (all)
- Print width: 100
- 2 spaces indentation
- LF line endings

### Commit Message Convention

Commits must follow the format: `<type>(<scope>): <description>`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Reverting a commit

**Examples:**
```
feat(auth): add login page
fix: resolve null pointer exception
docs: update README
refactor(guifier): simplify container logic
```

### Git Hooks

- **pre-commit**: Runs `biome check --staged` to lint and format staged files
- **commit-msg**: Validates commit message format

## VS Code Setup

Install the recommended extensions when prompted:

- Biome
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Path Intellisense

Settings are pre-configured for:
- Format on save
- Organize imports on save

## License

MIT
