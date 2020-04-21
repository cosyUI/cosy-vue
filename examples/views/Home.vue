<template>
  <div class="home">
    <button @click="popupShow=!popupShow">按钮</button>
    <div>
      <cy-popup v-model="popupShow" @click="handleClickPopup" :overlay="popupOverlay1">
        <div style="width: 100px; height: 100px; background: #fff;">
          <div @click.stop="popupShow2=!popupShow2">按钮2</div>
        </div>
      </cy-popup>
    </div>
    <div>
      <cy-popup v-model="popupShow2" position="left" :overlay="popupOverlay2">
        <div style="width: 200px; height: 100%; background: #fff;">123</div>
      </cy-popup>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {},
    data () {
      return {
        popupShow: false,
        popupOverlay1: true,
        popupShow2: false,
        popupOverlay2: true
      }
    },
    methods: {
      handleClickPopup (event) {
        console.log(event)
      }
    },
    mounted () {
    }
  }
</script>
