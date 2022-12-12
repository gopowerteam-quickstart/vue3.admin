<script setup lang="tsx">
import type { VNode } from 'vue'

const props = defineProps<{
  name: string
  size?: number
  color?: string
}>()

const svgs = import.meta.glob<{ render: () => VNode }>('@/assets/svg/*.svg', {
  eager: true,
})

const icon = Object.entries(svgs).find(([key, _]) =>
  key.endsWith(`/${props.name}`),
)

defineRender(() => {
  if (!icon) {
    return
  }

  const [_, { render }] = icon
  const svg = render()

  if (svg && svg.props) {
    svg.props.width = props.size
    svg.props.height = props.size
    svg.props.fill = props.color
  }

  return svg
})
</script>
