<template lang="pug">
li.artistClass
    h2: a(
        :href="artistData.url"
        target="_blank"
        ) {{artistData.name}}
    img(
        :src="artistData.image[2]['#text']"
        )
</template>

<script>
export default {
    name:'artistSection', //Mismo nombre del tag en app.vue
    props:['artistData']
  }
</script>
<style lang="stylus" scoped>
    li.artistClass
        display block
        margin 10px 0
</style>
