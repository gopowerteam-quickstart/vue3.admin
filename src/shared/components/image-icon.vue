<script setup lang="tsx">
const props = defineProps<{
  name: string
  size?: number
}>()

const images = import.meta.glob<{ default: string }>(
  '@/assets/image/*.(png|jpg)',
  {
    eager: true,
  },
)

const icon = Object.entries(images).find(([key, _]) =>
  key.endsWith(`/${props.name}`),
)

defineRender(() => {
  if (!icon) {
    return
  }

  const [_, { default: url }] = icon

  return (
    <img
      src={url}
      width={props.size}
      height={props.size}
    />
  )
})
</script>
