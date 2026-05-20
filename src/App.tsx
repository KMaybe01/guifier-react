import { Tabs, Typography } from 'antd'
import { useState } from 'react'

import GuifierEditorPageContent from '@/components/GuifierEditorPageContent'
import jsonSample from '@/samples/sample.json?raw'
import tomlSample from '@/samples/sample.toml?raw'
import xmlSample from '@/samples/sample.xml?raw'
import yamlSample from '@/samples/sample.yaml?raw'
import type { DataType } from '@/utils/guifierUtils'

const { Title } = Typography

const samples: Record<DataType, string> = {
  json: jsonSample,
  yaml: yamlSample,
  toml: tomlSample,
  xml: xmlSample,
}

const items = [
  { key: 'json', label: 'JSON' },
  { key: 'yaml', label: 'YAML' },
  { key: 'toml', label: 'TOML' },
  { key: 'xml', label: 'XML' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<DataType>('json')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Title level={2} className="text-center mb-6">
          Guifier
        </Title>

        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as DataType)}
          items={items}
          size="large"
          className="bg-white rounded-lg px-4 pt-4"
        />

        <div className="bg-white rounded-lg px-4 pb-6">
          <GuifierEditorPageContent
            key={activeTab}
            type={activeTab}
            sampleData={samples[activeTab]}
          />
        </div>
      </div>
    </div>
  )
}
