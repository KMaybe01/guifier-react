import { Input } from 'antd'

interface StringFieldProps {
  value: string
  onChange: (value: string) => void
}

export default function StringField({ value, onChange }: StringFieldProps) {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="string"
      size="small"
    />
  )
}
