import { Typography, Alert, Spin } from 'antd'
import { useState, useEffect, useCallback } from 'react'

import CodeEditor from '@/components/CodeEditor'
import Guifier from '@/components/guifier/Guifier'
import { encode, decode, type GuifierData, type DataType } from '@/utils/guifierUtils'

const { Title } = Typography

interface GuifierEditorPageContentProps {
  type: DataType
  sampleData: string
}

export default function GuifierEditorPageContent({
  type,
  sampleData,
}: GuifierEditorPageContentProps) {
  const [value, setValue] = useState<GuifierData | null>(null)
  const [codeValue, setCodeValue] = useState('')
  const [encodingError, setEncodingError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    try {
      setEncodingError(null)
      const encoded = encode(type, sampleData)
      setValue(encoded)
      setCodeValue(decode(type, encoded))
    } catch (error) {
      setEncodingError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [type, sampleData])

  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCodeValue(newCode)
      try {
        setEncodingError(null)
        const encoded = encode(type, newCode)
        setValue(encoded)
      } catch (error) {
        setEncodingError(error instanceof Error ? error.message : 'Unknown error')
      }
    },
    [type],
  )

  const handleDataChange = useCallback(
    (newData: GuifierData) => {
      setValue(newData)
      try {
        setEncodingError(null)
        setCodeValue(decode(type, newData))
      } catch (error) {
        setEncodingError(error instanceof Error ? error.message : 'Unknown error')
      }
    },
    [type],
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <Title level={2} className="mb-0">
        {type.toUpperCase()} Viewer & Editor
      </Title>

      <div className="relative flex gap-4 w-full max-w-6xl h-[600px]">
        <div className="flex-1 min-w-0 border rounded-md overflow-hidden bg-white">
          <CodeEditor lang={type} value={codeValue} onChange={handleCodeChange} />
        </div>

        {encodingError ? (
          <div className="flex-1 min-w-0 border rounded-md bg-red-50 p-4">
            <Alert message="Encoding Error" description={encodingError} type="error" showIcon />
          </div>
        ) : value ? (
          <div className="flex-1 min-w-0 border rounded-md overflow-hidden bg-white p-4">
            <Guifier data={value} onDataChange={handleDataChange} className="h-full" />
          </div>
        ) : (
          <div className="flex-1 min-w-0 border rounded-md bg-gray-50" />
        )}
      </div>
    </div>
  )
}
