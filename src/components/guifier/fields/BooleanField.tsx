import { Segmented } from 'antd'

interface BooleanFieldProps {
  value: boolean
  onChange: (value: boolean) => void
}

export default function BooleanField({ value, onChange }: BooleanFieldProps) {
  return (
    <Segmented
      value={value ? 'true' : 'false'}
      onChange={(val) => onChange(val === 'true')}
      options={['true', 'false']}
      size="small"
    />
  )
}
