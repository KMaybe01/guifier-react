import { DatePicker } from 'antd'
import dayjs from 'dayjs'

interface DateFieldProps {
  value: Date
  onChange: (value: Date) => void
}

export default function DateField({ value, onChange }: DateFieldProps) {
  const formatDate = (d: Date): string => {
    if (Number.isNaN(d.getTime())) return ''
    return d.toISOString().slice(0, 10)
  }

  const parseDate = (str: string): Date => {
    const date = new Date(str)
    return Number.isNaN(date.getTime()) ? value : date
  }

  return (
    <DatePicker
      value={dayjs(formatDate(value))}
      onChange={(date) => {
        if (date) {
          onChange(parseDate(date.format('YYYY-MM-DD')))
        }
      }}
      size="small"
      className="w-full"
    />
  )
}
