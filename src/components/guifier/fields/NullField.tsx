import { CloseCircleOutlined } from '@ant-design/icons'
import { Tag } from 'antd'

export default function NullField() {
  return (
    <Tag icon={<CloseCircleOutlined />} color="default" className="flex items-center">
      null
    </Tag>
  )
}
