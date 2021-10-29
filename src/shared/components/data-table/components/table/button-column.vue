<script lang="tsx">
import { PropType } from 'vue'
import { ColumnRenderButtonConfig, RowParams } from '../..'

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<ColumnRenderButtonConfig[]>,
      required: true
    },
    params: {
      type: Object as PropType<RowParams>,
      required: true
    }
  },
  setup(props) {
    const onLoadData = inject('on-load-data') as () => void
    // 生成Confirm
    const generateConfirm = (
      button: JSX.Element,
      action: () => void
    ) => (
      <a-popconfirm
        title="是否确定执行该操作?"
        ok-text="确定"
        cancel-text="取消"
        onConfirm={() => {
          action()
        }}
      >
        {button}
      </a-popconfirm>
    )

    const generateButtons = () =>
      props.config.map(button => {
        // 按钮操作
        const buttonAction = () => {
          button.click(props.params.record, {
            reload: onLoadData
          })
        }

        // 按钮组件
        const buttonComponent = (
          <a-button
            type="link"
            onClick={() => {
              if (button.confirm) return

              buttonAction()
            }}
          >
            {button.text}
          </a-button>
        )

        return button.confirm
          ? generateConfirm(buttonComponent, buttonAction)
          : buttonComponent
      })

    return generateButtons
  }
})
</script>
