<template>
<div class="my-bot">
  <div class="top-tool-bar">

  </div>

  <div class="bot-info-content">

    <bot-runtime-display-card/>
    <bot-runtime-display-card/>
    <bot-runtime-display-card/>
  </div>
</div>

</template>

<script>

import BotRuntimeDisplayCard from '@/views/custom/bot/my-bot/components/bot-runtime-display-card.vue'

export default {
  name: 'MyBot',
  components: { BotRuntimeDisplayCard }
}
</script>

<style scoped>
.my-bot{
  margin-top: 10px;
  background-color: #121826;

  padding: 32px;
}

.top-tool-bar{
  height: 44px;
  padding: 16px;
}

.bot-info-content {
display: flex;
  justify-items: flex-start;
}
</style>
