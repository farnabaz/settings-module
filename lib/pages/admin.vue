<template>
  <div>
    <div id="pref-header">
      <button @click="update">
        Save Change
      </button>
    </div>
    <textarea id="pref-editor" v-model="prefs" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      prefs: JSON.stringify(this.$prefs, 0, 2)
    }
  },
  head () {
    return {
      bodyAttrs: {
        class: 'pref-body'
      }
    }
  },
  methods: {
    update () {
      if (this.isInvalidJson()) {
        return
      }
      fetch('/preferences/sync/make-me-strong', {
        method: 'POST',
        body: this.prefs
      })
    },
    isInvalidJson () {
      try {
        JSON.parse(this.prefs)
        return false
      } catch (e) {
        alert(e.message)
        return true
      }
    }
  }
}
</script>

<style>
.pref-body {
  margin: 0;
}
#pref-header {
  height: 40px;
}
#pref-editor {
  width: 100%;
  height: calc(100vh - 40px);
  font-size: 14px;
  font-family: monospace;
}
</style>
