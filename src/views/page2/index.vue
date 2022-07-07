<template>
  <page-container title="111">
    <a-input placeholder="page2"></a-input>
  </page-container>
</template>

<route lang="yaml">
name: page2
meta:
  layout: workspace
  auth:
    roles:
      - ADMIN
  menu:
    key: root2.test.page2
    icon: xxx
    title: Page2
</route>
