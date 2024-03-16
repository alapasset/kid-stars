<script setup lang="ts">
import type { FamilyForm } from '~/types/family'

const { t } = useI18n()
const { handleSubmit, setFieldValue } = useForm<FamilyForm>({
  initialValues: {
    code: '',
    name: '',
    pseudo: '',
    role: 'tutor',
  },
})

const user = useSupabaseUser()

const familyId = computed(() => String(user.value?.user_metadata.family))

const { data, isFetched } = useFetchFamily(familyId)
const { mutateAsync: createFamily } = useCreateFamily()
const { mutateAsync: joinFamily } = useJoinFamily(familyId)

const { errorMessage: errorMessageName, value: name } = useField<string>(
  'name',
  inputValue => {
    if(inputValue.length === 0) return t('form.error.family-name.required')
    return true
  },
  {
    initialValue: data.value?.name,
  },
)

const { errorMessage: errorMessagePseudo, value: pseudo } = useField<string>(
  'pseudo',
  inputValue => {
    if(inputValue && inputValue.length === 0) return t('form.error.pseudo.required')
    return true
  },
)

const { errorMessage: errorMessageCode, value: code } = useField<string>(
  'code',
  inputValue => {
    if(!/^\d{6}$/u.test(inputValue)) return t('form.error.code.length')
    return true
  },
)

const isInvitation = computed(() => Boolean(data.value?.name))
const showModal = computed(() => isFetched.value || !isInvitation.value)
const pageTitle = computed(() => isInvitation.value ? t('family.join.title') : t('family.add.title'))
const buttonText = computed(() => isInvitation.value ? t('common.join') : t('common.create'))

const onSubmit = handleSubmit(async values => {
  if(isInvitation.value) await joinFamily(values)
  await createFamily(values)
})

watch(isFetched, () => {
  setFieldValue('name', data.value?.name ?? '')
})
</script>

<template>
  <div
    v-if="showModal"
    class="card w-80 border bg-base-100 shadow-xl"
  >
    <div class="card-body">
      <h2 class="card-title">
        {{ pageTitle }}
      </h2>

      <form
        class="flex flex-col gap-3"
        novalidate
        @submit.prevent="onSubmit"
      >
        <CoreInputText
          v-model="name"
          :disabled="isInvitation"
          :error-messages="errorMessageName"
          icon="material-symbols:home"
          :label="t('form.label.family-name')"
          :placeholder="t('form.label.family-name')"
          required
        />
        <CoreInputText
          v-model="pseudo"
          :error-messages="errorMessagePseudo"
          icon="material-symbols:person"
          :label="t('form.label.pseudo')"
          :placeholder="t('form.label.pseudo')"
          required
        />
        <CoreInputText
          v-model="code"
          :error-messages="errorMessageCode"
          :hint="t('form.hint.code')"
          icon="material-symbols:lock"
          :label="t('form.label.code')"
          :placeholder="t('form.label.code')"
          required
          type="password"
        />
        <div class="flex flex-row-reverse">
          <button
            class="btn btn-primary"
            type="submit"
          >
            {{ buttonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
  <div v-else>
    <div class="flex w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full" />
        <div class="skeleton h-4 w-28" />
        <div class="skeleton h-4 w-full" />
        <div class="skeleton h-4 w-full" />
      </div>
  </div>
</template>
