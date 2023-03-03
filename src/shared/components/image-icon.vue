<script lang="tsx">
export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 20,
    },
  },
  setup(props) {
    const images = import.meta.glob<{ default: string }>(
      '@/assets/image/*.(png|jpg)',
      {
        eager: true,
      },
    )

    const icon = Object.entries(images).find(
      ([key, _]) =>
        key.endsWith(`/${props.name}`) ||
        key.endsWith(`/${props.name}.jpg`) ||
        key.endsWith(`/${props.name}.png`),
    )

    return () => {
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
    }
  },
})
</script>
