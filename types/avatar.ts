
export interface ItemsEnum {
  enum: string[]
  type: string
}

export interface ItemsPattern {
  pattern: string
  type: string
}

export interface PropertyPattern {
  default: string[]
  items: ItemsPattern
  type: string
}

export interface PropertyEnum {
  default: string[]
  items: ItemsEnum
  type: string
}

export interface PropertyProbability {
  default: number
  maximum: number
  minimum: number
  type: string
}

export interface AdventurerProperties {
  base: PropertyEnum
  earrings: PropertyEnum
  earringsProbability: PropertyProbability
  eyebrows: PropertyEnum
  eyes: PropertyEnum
  features: PropertyEnum
  featuresProbability: PropertyProbability
  glasses: PropertyEnum
  glassesProbability: PropertyProbability
  hair: PropertyEnum
  hairColor: PropertyPattern
  hairProbability: PropertyProbability
  mouth: PropertyEnum
  skinColor: PropertyPattern
}

export type AdventurerPropertiesType = 'base' | 'earrings' | 'eyebrows' | 'eyes' | 'features' | 'glasses' | 'hair' | 'hairColor' | 'mouth' | 'skinColor'

export type SelectedValueType = string[] | boolean | number | string

export type SelectedType = Record<string, SelectedValueType>

export type Avatar = {
  id: string
  name: string
  uri: string
  values: SelectedType
}

export type AvatarOption = {
  avatars: Avatar[]
  name: string
  step: number
}
