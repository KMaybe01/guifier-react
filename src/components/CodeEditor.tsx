import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { xml } from '@codemirror/lang-xml'
import { yaml } from '@codemirror/lang-yaml'
import { EditorView } from '@codemirror/view'
import CodeMirror from '@uiw/react-codemirror'

type LangType = 'json' | 'yaml' | 'xml' | 'toml'

interface CodeEditorProps {
  lang: LangType
  value: string
  onChange: (value: string) => void
  className?: string
}

function getLanguage(lang: LangType) {
  switch (lang) {
    case 'json':
      return json()
    case 'yaml':
      return yaml()
    case 'xml':
      return xml()
    case 'toml':
      return javascript()
    default:
      return json()
  }
}

export default function CodeEditor({ lang, value, onChange, className }: CodeEditorProps) {
  return (
    <div className={`h-full ${className ?? ''}`}>
      <CodeMirror
        value={value}
        height="100%"
        extensions={[getLanguage(lang), EditorView.lineWrapping]}
        onChange={onChange}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          defaultKeymap: true,
        }}
      />
    </div>
  )
}
