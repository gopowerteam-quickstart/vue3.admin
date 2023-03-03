<script lang="tsx">
import type { VNode } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: false,
      default: 12,
    },
    color: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props: any) {
    const svgs = import.meta.glob<{ render: () => VNode }>(
      '@/assets/svg/*.svg',
      {
        eager: true,
      },
    )

    const icon = Object.entries(svgs).find(
      ([key, _]) =>
        key.endsWith(`/${props.name}`) || key.endsWith(`/${props.name}.svg`),
    )

    return () => {
      if (!icon) {
        return
      }

      const [_, { render }] = icon
      const svg = render()

      if (svg && svg.props && props.size) {
        svg.props.width = props.size
        svg.props.height = props.size
      }

      if (svg && svg.props && props.color) {
        svg.props.fill = props.color
      }

      return svg
    }
  },
})
</script>
