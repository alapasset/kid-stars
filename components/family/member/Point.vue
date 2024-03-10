<script setup lang="ts">
import type {FamilyMember} from "~/types/family";
import { useGetLastTransaction } from "~/composables/point";

const props = defineProps<{
  member: FamilyMember
  lastTransaction: boolean
}>()

const { data: point } = useGetPoint(props.member.id);
const { data: transaction, refetch } = useGetLastTransaction(props.member.id);

const points = computed(() => point.value?.at(0)?.sum ? point.value[0].sum : 0);
const lastTransaction = computed(() => transaction.value?.at(0)?.points ? transaction.value[0].points : 0);

const arrow = computed(() => lastTransaction.value > 0 ? '↗︎' : '↘︎');
const isPositive = computed(() => lastTransaction.value > 0);
const percent = computed(() => {
  const previousPoints = points.value - lastTransaction.value;
  return previousPoints != 0 ? (lastTransaction.value / previousPoints) * 100 : 0;
});

watch(point, () => {
  refetch();
});
</script>

<template>
  <div class="stat text-right absolute top-0 right-0 pt-1 pr-2">
    <div class="stat-value">{{ points }}</div>
    <div
      class="stat-desc"
      :class="isPositive ? 'text-success' : 'text-error'"
      v-if="props.lastTransaction"
    >
      {{arrow}} {{ lastTransaction }} ({{percent.toFixed()}}%)
    </div>
  </div>
</template>
