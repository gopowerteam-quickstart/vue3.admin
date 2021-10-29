<script lang="tsx">
export default defineComponent({
  props: {
    columns: {
      type: Array
    }
  },
  setup(props) {
    const generateColumn = (column: any) => {
      return (
        <a-descriptions-item label={column.title}>
          {column.value ?? column.render()}
        </a-descriptions-item>
      )
    }

    return () => (
      <div class="data-table-view-container py-3">
        <a-descriptions layout="vertical" bordered>
          {props.columns?.map(generateColumn)}
        </a-descriptions>
      </div>
    )
  }
})
</script>
