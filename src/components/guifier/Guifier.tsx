import type { GuifierData } from '@/utils/guifierUtils'

import ArrayContainer from './containers/ArrayContainer'
import ObjectContainer from './containers/ObjectContainer'

interface GuifierProps {
  data: GuifierData
  onDataChange: (data: GuifierData) => void
  className?: string
  style?: React.CSSProperties
}

export default function Guifier({ data, onDataChange, className, style }: GuifierProps) {
  if (Array.isArray(data)) {
    return (
      <ArrayContainer
        name="root"
        data={data}
        parentData={data}
        levels={0}
        mainContainer
        className={className}
        style={style}
        onDataChange={onDataChange}
        onParentDataChange={(newData) => onDataChange(newData)}
      />
    )
  }

  return (
    <ObjectContainer
      name="root"
      data={data as Record<string, unknown>}
      parentData={data}
      mainContainer
      className={className}
      style={style}
      onDataChange={(newData) => onDataChange(newData)}
      onParentDataChange={(newData) => onDataChange(newData)}
    />
  )
}
