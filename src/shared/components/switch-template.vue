<script lang="ts">
import { ComponentInternalInstance } from 'vue'

const SwitchComponent = (
  props: { value: string },
  context: ComponentInternalInstance
) => {
  const { value } = props
  const slotFn =
    value in context.slots
      ? context.slots[value]
      : context.slots.default

  return slotFn ? slotFn(context.attrs) : null
}

SwitchComponent.props = ['value']

export default SwitchComponent
</script>
