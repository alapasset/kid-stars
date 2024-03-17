<script setup lang="ts">
import type { Activity } from '~/types/activity.js'

const props = defineProps<{ activity:Activity }>()
const activity = toRef(props, 'activity')

const { t } = useI18n()

</script>

<template>
  <div>
      <div class="flex h-full rounded-lg border-2 p-4 hover:cursor-pointer">
        <div class="ml-2 w-full">
          <div class="flex w-full justify-between pb-2">
            <h4
              class="text-base font-semibold tracking-normal underline"
            >
              {{ activity.name }}
            </h4>
            <h5 class="font-bold">{{ activity.points }} {{ t('task.item.point') }}</h5>
          </div>
          <div class="flex w-full justify-between pb-2 font-bold">
            <p class="text-sm font-normal tracking-normal">{{ activity.description }}</p>
          </div>
        </div>
      </div>
   </div>
</template>
