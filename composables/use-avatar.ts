import { adventurer } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { nanoid } from 'nanoid'
import type { AdventurerProperties, AdventurerPropertiesType, Avatar, AvatarOption, SelectedType } from '~/types/avatar'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const adventurerProperties = adventurer.schema.properties as AdventurerProperties | undefined

const selectedOptions: Ref<SelectedType> = ref({
  size: 200,
  seed: 1,
})

const currentStep = ref(0)

const possibleOptions = computed(() => {
  const options: AdventurerPropertiesType[] = []
  if (!adventurerProperties) return options
  for (const key in adventurerProperties)
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    if (!key.includes('Probability') && !key.includes('base')) options.push(key as AdventurerPropertiesType)
  return options
})

function hasProbability (option: AdventurerPropertiesType) {
  return Object.prototype.hasOwnProperty.call(adventurerProperties, `${option}Probability`)
}

function generateAvatarForOption (option: AdventurerPropertiesType, value: string) {
  const options = { ...selectedOptions.value }
  if (hasProbability(option)) options[`${option}Probability`] = 100
  options[option] = [value]
  return createAvatar(adventurer, options).toDataUriSync()
}
function generateProbalityAvatar (option: AdventurerPropertiesType) {
  const options = { ...selectedOptions.value }
  if (hasProbability(option)) options[`${option}Probability`] = ['0']
  return createAvatar(adventurer, options).toDataUriSync()
}

function possibleValues (option: AdventurerPropertiesType) {
  const values: string[] = []
  if (!adventurerProperties) return values
  const property = adventurerProperties[option]
  if('enum' in property.items) values.push(...property.items.enum)
  else values.push(...property.default)
  return values
}

const generatedOptions = computed(() => {
  let step = 0
  const options: AvatarOption[] = []
  if (!adventurerProperties) return options
  possibleOptions.value.forEach(option => {
    const values = possibleValues(option)
    const avatars: Avatar[] = []
    if (hasProbability(option)) avatars.push({
      id: nanoid(),
      uri: generateProbalityAvatar(option),
      name: 'variant00',
      values: { [`${option}Probability`]: ['0'] },
    })
    values.forEach(value => {
      const currentValues = hasProbability(option) ? { [`${option}Probability`]: ['100'] } : {}
      avatars.push({
        id: nanoid(),
        uri: generateAvatarForOption(option, value),
        name: value,
        values: { ...currentValues, [option]: [value] },
      })
    })
    options.push({ avatars, name: option, step })
    step += 1
  })
  return options
})

const currentOption = computed(() => generatedOptions.value[currentStep.value])

const currentAvatar = computed (() => createAvatar(adventurer, selectedOptions.value).toDataUriSync())

function updateSelectedOptions (values: SelectedType) {
  const options = { ...selectedOptions.value, ...values }
  selectedOptions.value = options
}

function nextStep () {
  currentStep.value += 1
}

function previousStep () {
  currentStep.value -= 1
}

export function useAvatar () {
  return {
    properties: adventurerProperties,
    currentStep,
    currentOption,
    currentAvatar,
    generatedOptions,
    updateSelectedOptions,
    nextStep,
    previousStep,
  }
}
