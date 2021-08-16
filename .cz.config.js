module.exports = {
  types: [
    {
      value: 'feat',
      name: '✨功能:     提交新功能'
    },
    {
      value: 'fix',
      name: '🐛修复:     提交问题修复'
    },
    {
      value: 'docs',
      name: '📖文档:     提交文档更新'
    },
    {
      value: 'refactor',
      name: '📦重构:     提交代码重构'
    },
    {
      value: 'perf',
      name: '🚀性能:     优化代码性能'
    },
    {
      value: 'test',
      name: '🚨测试:     添加或更新测试'
    },
    {
      value: 'build',
      name: '👷构建:     更新构建逻辑'
    },
    {
      value: 'revert',
      name: '回滚:       进行代码回滚'
    }
  ],
  allowBreakingChanges: [
    'feat',
    'fix',
    'refactor',
    'perf',
    'build',
    'revert'
  ]
}
