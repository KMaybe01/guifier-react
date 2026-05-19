import { TomlDocument, TomlFormat, stringify as tomlStringify } from '@decimalturn/toml-patch'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import { load as loadYaml, dump as dumpYaml } from 'js-yaml'
import lodash from 'lodash'

export type GuifierData = Record<string, unknown> | Array<unknown>
export type DataType = 'json' | 'yaml' | 'xml' | 'toml'

let currentTomlDocument: TomlDocument | null = null

export function encode(dataType: DataType, data: string): GuifierData {
  if (dataType === 'json') {
    return JSON.parse(data)
  } else if (dataType === 'yaml') {
    return loadYaml(data) as GuifierData
  } else if (dataType === 'toml') {
    currentTomlDocument = new TomlDocument(data)
    return currentTomlDocument.toJsObject as GuifierData
  } else if (dataType === 'xml') {
    const parsedData = new XMLParser().parse(data)
    const rootNodeName = Object.keys(parsedData)[0]
    return parsedData[rootNodeName] as GuifierData
  } else {
    throw new Error(`The (${dataType}) is not supported in guifier (encode) function`)
  }
}

export function decode(dataType: DataType, data: GuifierData): string {
  if (dataType === 'json') {
    return JSON.stringify(data, null, 2)
  } else if (dataType === 'yaml') {
    return dumpYaml(data)
  } else if (dataType === 'toml') {
    const processedData = lodash.cloneDeepWith(data, (value: unknown) => {
      if (value instanceof Date) {
        return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()))
      }
    })
    const format = TomlFormat.default()
    format.truncateZeroTimeInDates = true
    if (currentTomlDocument) {
      currentTomlDocument.patch(processedData, format)
      return currentTomlDocument.toTomlString
    } else {
      const tomlString = tomlStringify(processedData, format)
      currentTomlDocument = new TomlDocument(tomlString)
      return currentTomlDocument.toTomlString
    }
  } else if (dataType === 'xml') {
    const returnedObject = { root: data }
    return new XMLBuilder({
      format: true,
      indentBy: '  ',
      suppressEmptyNode: false,
    }).build(returnedObject)
  } else {
    throw new Error(`The (${dataType}) is not supported in guifier (decode) function`)
  }
}
