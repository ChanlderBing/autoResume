<template>
  <template>
    <div>具体描述</div>
    <Toolbar
    style="border-bottom: 1px solid #ccc"
    :editor="editorRef"
    :defaultConfig="toolbarConfig"
  />
  <Editor
    style="height: 500px; overflow-y: hidden;"
    v-model="renderListDetail?.richText"
    :defaultConfig="editorConfig"
    @onCreated="handleCreated"
  />
  </template>

</template>