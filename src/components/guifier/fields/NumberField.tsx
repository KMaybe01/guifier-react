import { InputNumber } from 'antd'

interface NumberFieldProps {
  value: number
  onChange: (value: number) => void
}

export default function NumberField({ value, onChange }: NumberFieldProps) {
  return (
    <InputNumber
      value={value}
      onChange={(val) => onChange(val ?? 0)}
      size="small"
      className="w-full"
    />
  )
}
