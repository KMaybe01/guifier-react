/// <reference types="vite/client" />

declare module '*.css' {
  const content: Record<string, string>
  export default content
}

declare module '*.json?raw' {
  const content: string
  export default content
}

declare module '*.yaml?raw' {
  const content: string
  export default content
}

declare module '*.toml?raw' {
  const content: string
  export default content
}

declare module '*.xml?raw' {
  const content: string
  export default content
}
