import BooleanField from './BooleanField'
import DateField from './DateField'
import NullField from './NullField'
import NumberField from './NumberField'
import StringField from './StringField'

interface FieldProps {
  value: unknown
  onChange: (value: unknown) => void
}

export default function Field({ value, onChange }: FieldProps) {
  if (typeof value === 'string') {
    return <StringField value={value} onChange={onChange} />
  }
  if (typeof value === 'number') {
    return <NumberField value={value} onChange={onChange} />
  }
  if (typeof value === 'boolean') {
    return <BooleanField value={value} onChange={onChange} />
  }
  if (value === null) {
    return <NullField />
  }
  if (value instanceof Date) {
    return <DateField value={value} onChange={onChange} />
  }
  return <div className="text-red-500">This type doesn't have a default field</div>
}
