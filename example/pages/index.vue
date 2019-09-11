<template>
  <pre>
{{ JSON.stringify($prefs, 0, 2) }}
  </pre>
</template>

<script>
export default {
  head () {
    return {
      bodyAttrs: {
        style: `background: ${this.$prefs.background}; font-size: ${this.$prefs.fontSize}px`
      }
    }
  }
}
</script>
