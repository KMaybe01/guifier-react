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
| Build Tool   | Vite 6                                |
| Language     | TypeScript 5.8                        |
| Styling      | Tailwind CSS 3                        |
| Code Editor  | CodeMirror 6                          |
| Package Mgr  | pnpm                                  |
| Linting      | ESLint 9                              |
| Formatting   | Prettier 3                            |
| Git Hooks    | Husky 9 + lint-staged                 |

## Project Structure

```
guifier-react/
├── .husky/                  # Git hooks
│   ├── pre-commit           # Runs lint-staged before commit
│   └── commit-msg           # Validates commit message format
├── .vscode/                 # VS Code settings
│   ├── settings.json        # Editor configuration
│   └── extensions.json      # Recommended extensions
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
├── eslint.config.js         # ESLint flat config
├── prettier.config.js       # Prettier configuration
├── .editorconfig            # Editor consistency
├── .lintstagedrc.js         # lint-staged configuration
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.js        # PostCSS config
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd guifier-react

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Open http://localhost:5173
```

### Build

```bash
# Production build
pnpm build

# Preview production build
pnpm preview
```

## Scripts

| Script           | Description                                        |
| ---------------- | -------------------------------------------------- |
| `pnpm dev`       | Start development server                           |
| `pnpm build`     | Type check and build for production                |
| `pnpm preview`   | Preview production build                           |
| `pnpm lint`      | Run ESLint with strict rules                       |
| `pnpm lint:fix`  | Auto-fix ESLint issues                             |
| `pnpm format`    | Format code with Prettier                          |
| `pnpm format:check` | Check code formatting without modifying files  |
| `pnpm type-check` | Run TypeScript type checking                      |

## Code Quality

### ESLint Rules

- React Hooks rules enforced
- No unused variables (except prefixed with `_`)
- Explicit `any` usage warned
- Consistent type imports
- Import order enforced with grouping
- No `console.log` (except `warn` and `error`)
- `prefer-const` enforced
- Strict equality (`===`) required

### Prettier Configuration

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

- **pre-commit**: Runs `lint-staged` to auto-fix and format staged files
- **commit-msg**: Validates commit message format

## VS Code Setup

Install the recommended extensions when prompted:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Path Intellisense

Settings are pre-configured for:
- Format on save
- ESLint auto-fix on save
- Organize imports on save

## License

MIT
