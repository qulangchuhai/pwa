<script setup lang="ts">
import { onMounted } from "vue";



onMounted(() => {
  window.addEventListener('beforeinstallprompt', () => {
    // event.preventDefault();
  });
  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('Received message from Service Worker:', event.data);
    handleMessage(event.data)
  });

  // window.addEventListener('message', (event) => {
  //   console.log('Message received in iframe:', event.data);
  //   navigator.serviceWorker.controller?.postMessage(event.data);
  // });

  window.addEventListener('message', (event) => {
    // // 验证消息来源
    // if (event.origin !== 'https://example.com') return;

    console.log('收到来自父页面的消息:', event.data);

    // 如果需要，可以将消息转发给顶级页面
    window.parent.postMessage(
      { type: 'messageFromIframe', data: event.data },
      '*'
    );
  });
});

const handleMessage = (message:any) => {
  window.parent.postMessage(message, '*')
}

</script>

<template>
  <div @click="handleMessage">hello</div>
</template>

<style scoped lang="less">

</style>
