<script setup lang="ts">
const props = defineProps<{
  isLastTransaction: boolean
  memberId: string
}>()

const memberId = toRef(props, 'memberId')
const isLastTransaction = toRef(props, 'isLastTransaction')

const { data: point } = useGetPoints(memberId)
const doGetLastTransaction = computed(() => isLastTransaction.value && Boolean(point.value))
const { data: transaction } = useGetLastTransaction(memberId, doGetLastTransaction)

const points = computed(() => point.value?.at(0)?.sum ?? 0)
const lastTransaction = computed(() => transaction.value?.at(0)?.points ?? 0)

const arrow = computed(() => lastTransaction.value > 0 ? '↗︎' : '↘︎')
const isPositive = computed(() => lastTransaction.value > 0)
const percentValue = computed(() => {
  const previousPoints = points.value - lastTransaction.value
  if (previousPoints === 0) return 0
  const percent = 100
  return (lastTransaction.value / previousPoints) * percent
})
</script>

<template>
  <div>
    <div class="stat-value text-xl md:text-4xl">
      {{ points }}
    </div>
    <div
      v-if="isLastTransaction"
      class="stat-desc"
      :class="isPositive ? 'text-success' : 'text-error'"
    >
      {{ arrow }} {{ lastTransaction }} ({{ percentValue.toFixed() }}%)
    </div>
  </div>
</template>
