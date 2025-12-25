<script setup lang="ts">
import AppErrorDevSection from './AppErrorDevSection.vue'

const router = useRouter()

const errorStore = useErrorStore()
const error = ref(errorStore.activeError)

const customCode = ref(0)
const message = ref('')
const statusCode = ref(0)
const hint = ref('')
const details = ref('')
const code = ref('')

if (error.value && !('code' in error.value)) {
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
}

if (error.value && 'code' in error.value) {
  code.value = error.value.code
  hint.value = error.value.hint
  details.value = error.value.details
  statusCode.value = error.value.statusCode ?? 0
}

router.afterEach(() => {
  errorStore.activeError = null
})
</script>

<template>
  <section class="error">
    <AppErrorDevSection :message :hint :customCode :statusCode :details :code />
  </section>
</template>

<style scoped>
@reference "@/style.css";

.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

:deep(.error__icon) {
  @apply text-7xl text-destructive;
}

:deep(.error__code) {
  @apply font-extrabold text-7xl text-secondary;
}

:deep(.error__msg) {
  @apply text-3xl font-extrabold text-primary;
}

:deep(.error-footer) {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

:deep(.error-footer__text) {
  @apply text-lg text-muted-foreground;
}

:deep(p) {
  @apply my-2;
}
</style>
