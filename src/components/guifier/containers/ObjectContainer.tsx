import { DeleteOutlined, FontSizeOutlined, NumberOutlined, CheckOutlined } from '@ant-design/icons'
import { Card, Button, Typography, Empty } from 'antd'

import { cn, isContainerValue, isPlainObject } from '@/utils/cn'
import type { GuifierData } from '@/utils/guifierUtils'

import ArrayContainer from '../containers/ArrayContainer'
import CreateFieldButton, { type CreateFieldButtonOptions } from '../CreateFieldButton'
import Field from '../fields/Field'

const { Text } = Typography

interface ObjectContainerProps {
  data: Record<string, unknown>
  parentData: GuifierData
  name?: string
  className?: string
  style?: React.CSSProperties
  mainContainer?: boolean
  onDataChange: (data: Record<string, unknown>) => void
  onParentDataChange: (data: GuifierData) => void
}

function handleAddField(
  option: CreateFieldButtonOptions,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const keyName = prompt('Enter the name of the new property')
  if (!keyName) return data

  const newData = { ...data }
  switch (option) {
    case 'object':
      newData[keyName] = {}
      break
    case 'array':
      newData[keyName] = []
      break
    case 'string':
      newData[keyName] = ''
      break
    case 'number':
      newData[keyName] = 0
      break
    case 'boolean':
      newData[keyName] = true
      break
  }
  return newData
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'string':
      return <FontSizeOutlined className="text-xs" />
    case 'number':
      return <NumberOutlined className="text-xs" />
    case 'boolean':
      return <CheckOutlined className="text-xs" />
    default:
      return null
  }
}

export default function ObjectContainer({
  data,
  parentData,
  name,
  className,
  style,
  mainContainer = false,
  onDataChange,
  onParentDataChange,
}: ObjectContainerProps) {
  const handleDelete = (key: string) => {
    const newData = { ...data }
    delete newData[key]
    onDataChange(newData)

    if (isPlainObject(parentData) && name) {
      const newParentData = { ...parentData }
      delete newParentData[name]
      onParentDataChange(newParentData)
    }
  }

  const handleFieldChange = (key: string, newValue: unknown) => {
    onDataChange({ ...data, [key]: newValue })
  }

  const handleAdd = (option: CreateFieldButtonOptions) => {
    onDataChange(handleAddField(option, data))
  }

  const entries = Object.entries(data)

  const header = (
    <div className="flex items-center justify-between h-10 px-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">{'{}'}</span>
        <Text>{name}</Text>
      </div>
      <div className="flex items-center gap-2">
        {!mainContainer && name && (
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              if (isPlainObject(parentData)) {
                const newParentData = { ...parentData }
                delete newParentData[name]
                onParentDataChange(newParentData)
              }
            }}
          />
        )}
        <CreateFieldButton onSelect={handleAdd} />
      </div>
    </div>
  )

  if (!name) {
    return (
      <div className="grid grid-cols-2 gap-4 p-4 overflow-auto">
        {entries.length > 0 ? (
          entries.map(([key, value]) => {
            const isContainer = isContainerValue(value)
            return (
              <div key={key} className={isContainer ? 'col-span-2' : ''}>
                {isContainer ? (
                  Array.isArray(value) ? (
                    <ArrayContainer
                      name={key}
                      data={value as unknown[]}
                      parentData={data}
                      levels={0}
                      className="rounded-t-none"
                      onDataChange={(newData) => handleFieldChange(key, newData)}
                      onParentDataChange={(newParent) =>
                        onDataChange(newParent as Record<string, unknown>)
                      }
                    />
                  ) : (
                    <ObjectContainer
                      name={key}
                      data={value as Record<string, unknown>}
                      parentData={data}
                      className="rounded-t-none"
                      onDataChange={(newData) => handleFieldChange(key, newData)}
                      onParentDataChange={(newParent) =>
                        onDataChange(newParent as Record<string, unknown>)
                      }
                    />
                  )
                ) : (
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Text strong className="text-xs">
                        {key}
                      </Text>
                      <span className="text-gray-400">{getTypeIcon(typeof value)}</span>
                      <Button
                        type="text"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        className="h-4 w-4 p-0"
                        onClick={() => handleDelete(key)}
                      />
                    </div>
                    <Field
                      value={value}
                      onChange={(newValue) => handleFieldChange(key, newValue)}
                    />
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div className="col-span-full text-center py-4">
            <Empty description="No items yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            <Text type="secondary" className="text-xs">
              Click + to add your first one
            </Text>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card
      className={cn('h-fit', className)}
      style={style}
      styles={{ body: { padding: 0 } }}
      title={header}
      bordered
      size="small"
    >
      <div className="grid grid-cols-2 gap-4 p-4">
        {entries.length > 0 ? (
          entries.map(([key, value]) => {
            const isContainer = isContainerValue(value)
            return (
              <div key={key} className={isContainer ? 'col-span-2' : ''}>
                {isContainer ? (
                  Array.isArray(value) ? (
                    <ArrayContainer
                      name={key}
                      data={value as unknown[]}
                      parentData={data}
                      levels={0}
                      className="rounded-t-none"
                      onDataChange={(newData) => handleFieldChange(key, newData)}
                      onParentDataChange={(newParent) =>
                        onDataChange(newParent as Record<string, unknown>)
                      }
                    />
                  ) : (
                    <ObjectContainer
                      name={key}
                      data={value as Record<string, unknown>}
                      parentData={data}
                      className="rounded-t-none"
                      onDataChange={(newData) => handleFieldChange(key, newData)}
                      onParentDataChange={(newParent) =>
                        onDataChange(newParent as Record<string, unknown>)
                      }
                    />
                  )
                ) : (
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Text strong className="text-xs">
                        {key}
                      </Text>
                      <span className="text-gray-400">{getTypeIcon(typeof value)}</span>
                      <Button
                        type="text"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        className="h-4 w-4 p-0"
                        onClick={() => handleDelete(key)}
                      />
                    </div>
                    <Field
                      value={value}
                      onChange={(newValue) => handleFieldChange(key, newValue)}
                    />
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div className="col-span-full text-center py-4">
            <Empty description="No items yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            <Text type="secondary" className="text-xs">
              Click + to add your first one
            </Text>
          </div>
        )}
      </div>
    </Card>
  )
}
