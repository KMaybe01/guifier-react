import {
  PlusOutlined,
  OrderedListOutlined,
  FontSizeOutlined,
  NumberOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import { Dropdown, Button } from 'antd'

import type { MenuProps } from 'antd'

export type CreateFieldButtonOptions = 'object' | 'array' | 'string' | 'number' | 'boolean'

interface CreateFieldButtonProps {
  onSelect: (value: CreateFieldButtonOptions) => void
}

const items: MenuProps['items'] = [
  {
    key: 'object',
    icon: <span>{'{}'}</span>,
    label: 'Object',
  },
  {
    key: 'array',
    icon: <OrderedListOutlined />,
    label: 'Array',
  },
  {
    key: 'string',
    icon: <FontSizeOutlined />,
    label: 'String',
  },
  {
    key: 'number',
    icon: <NumberOutlined />,
    label: 'Number',
  },
  {
    key: 'boolean',
    icon: <CheckOutlined />,
    label: 'Boolean',
  },
]

export default function CreateFieldButton({ onSelect }: CreateFieldButtonProps) {
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    onSelect(key as CreateFieldButtonOptions)
  }

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
      <Button type="text" size="small" icon={<PlusOutlined />} />
    </Dropdown>
  )
}
