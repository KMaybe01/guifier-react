import { DeleteOutlined, OrderedListOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Typography } from 'antd'

import { cn, isContainerValue, isPlainObject } from '@/utils/cn'
import type { GuifierData } from '@/utils/guifierUtils'
import CreateFieldButton, { type CreateFieldButtonOptions } from '../CreateFieldButton'
import ArrayContainerInner from '../containers/ArrayContainer'
import ObjectContainer from '../containers/ObjectContainer'
import Field from '../fields/Field'

const { Text } = Typography

interface ArrayContainerProps {
  data: unknown[]
  parentData: GuifierData
  name?: string
  levels?: number
  className?: string
  style?: React.CSSProperties
  mainContainer?: boolean
  onDataChange: (data: unknown[]) => void
  onParentDataChange: (data: GuifierData) => void
}

function handleAddToArray(option: CreateFieldButtonOptions, data: unknown[]): unknown[] {
  const newData = [...data]
  switch (option) {
    case 'object':
      newData.push({})
      break
    case 'array':
      newData.push([])
      break
    case 'string':
      newData.push('')
      break
    case 'number':
      newData.push(0)
      break
    case 'boolean':
      newData.push(true)
      break
  }
  return newData
}

export default function ArrayContainer({
  data,
  parentData,
  name,
  levels = 0,
  className,
  style,
  mainContainer = false,
  onDataChange,
  onParentDataChange,
}: ArrayContainerProps) {
  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== index)
    onDataChange(newData)
  }

  const handleFieldChange = (index: number, newValue: unknown) => {
    const newData = [...data]
    newData[index] = newValue
    onDataChange(newData)
  }

  const handleAdd = (option: CreateFieldButtonOptions) => {
    onDataChange(handleAddToArray(option, data))
  }

  const handleNestedDataChange = (index: number, newData: unknown) => {
    const arr = [...data]
    arr[index] = newData
    onDataChange(arr)
  }

  const renderInner = () => {
    if (data.length === 0) {
      return (
        <div className="p-4 text-center">
          <Empty description="No items yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          <Text type="secondary" className="text-xs">
            Click + to add your first one
          </Text>
        </div>
      )
    }

    return data.map((value, index) => {
      const isLast = data.length === index + 1
      const isContainer = isContainerValue(value)

      return (
        <div key={index}>
          <div className={cn('flex items-center h-14', !isLast || isContainer ? 'border-b' : '')}>
            {Array.from({ length: levels }).map((_, levelIndex) => (
              <div key={levelIndex} className="flex flex-col w-[1.8rem] h-full">
                <div className="flex-1 border-r border-dashed" />
                <div className="flex-1 border-r border-dashed" />
              </div>
            ))}
            <div className="relative flex w-14 h-full">
              <div className="absolute top-0 flex justify-center items-center w-full h-full">
                <div className="w-8 h-8 border rounded-full bg-white text-gray-500 flex justify-center items-center text-xs">
                  {index + 1}
                </div>
              </div>
              {levels === 0 ? (
                <>
                  <div className="flex-1 h-full border-r border-dashed" />
                  <div className="flex-1 h-full" />
                </>
              ) : (
                <>
                  <div className="flex flex-col flex-1 h-full">
                    <div className="flex-1 h-full border-b border-dashed" />
                    <div className={cn('flex-1 h-full', isContainer && 'border-r border-dashed')} />
                  </div>
                  <div className="flex flex-col flex-1 h-full">
                    <div className="flex h-full" />
                    <div className="flex h-full" />
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center flex-1 h-full">
              {isContainer ? (
                <div className="flex items-center justify-between text-sm h-full w-full px-4">
                  <Text>{Array.isArray(value) ? 'Array' : 'Object'}</Text>
                  <div className="flex items-center gap-2">
                    <Button
                      type="text"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(index)}
                    />
                    <CreateFieldButton
                      onSelect={(v) => {
                        if (Array.isArray(value)) {
                          const newData = [...data]
                          const arrData = handleAddToArray(v, value as unknown[])
                          newData[index] = arrData
                          onDataChange(newData)
                        } else if (isPlainObject(value)) {
                          const keyName = prompt('Enter the name of the new property')
                          if (keyName) {
                            const newData = [...data]
                            const objData = { ...(value as Record<string, unknown>) }
                            switch (v) {
                              case 'object':
                                objData[keyName] = {}
                                break
                              case 'array':
                                objData[keyName] = []
                                break
                              case 'string':
                                objData[keyName] = ''
                                break
                              case 'number':
                                objData[keyName] = 0
                                break
                              case 'boolean':
                                objData[keyName] = true
                                break
                            }
                            newData[index] = objData
                            onDataChange(newData)
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 pr-4 w-full items-center">
                  <div className="flex-1">
                    <Field
                      value={value}
                      onChange={(newValue) => handleFieldChange(index, newValue)}
                    />
                  </div>
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(index)}
                  />
                </div>
              )}
            </div>
          </div>
          {isContainer && (
            <div className={!isLast ? 'border-b' : ''}>
              {Array.isArray(value) ? (
                <ArrayContainerInner
                  data={value as unknown[]}
                  parentData={data}
                  levels={levels + 1}
                  onDataChange={(newData) => handleNestedDataChange(index, newData)}
                  onParentDataChange={(newParent) => onDataChange(newParent as unknown[])}
                />
              ) : isPlainObject(value) ? (
                <div className="flex items-stretch">
                  {Array.from({ length: levels + 1 }).map((_, i) => (
                    <div key={i} className="w-[1.8rem] border-r border-dashed" />
                  ))}
                  <div className="flex-1">
                    <ObjectContainer
                      data={value as Record<string, unknown>}
                      parentData={data}
                      onDataChange={(newData) => handleNestedDataChange(index, newData)}
                      onParentDataChange={(newParent) => onDataChange(newParent as unknown[])}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )
    })
  }

  if (!name) {
    return <div className="grid grid-cols-1 overflow-auto">{renderInner()}</div>
  }

  const header = (
    <div className="flex items-center justify-between h-10 px-4">
      <div className="flex items-center gap-2">
        <OrderedListOutlined />
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

  return (
    <Card
      className={cn('h-fit', className)}
      style={style}
      styles={{ body: { padding: 0 } }}
      title={header}
      bordered
      size="small"
    >
      <div className="overflow-auto">{renderInner()}</div>
    </Card>
  )
}
