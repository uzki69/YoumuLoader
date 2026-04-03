<script setup lang="ts">
import ButtonDownload from './components/ButtonDownload.vue';
import TextInput from './components/TextInput.vue';

</script>

<template>
  <div class="container">
    <!-- host -->
    <!-- <TextInput placeholder="https://www.example.com/" name="hostname" >Hostname:</TextInput> -->
    <!-- jellyfin token -->
    <!-- <TextInput name="token">Token:</TextInput> -->

    <!-- <ButtonDownload class="button-download"  >
      Download video
    </ButtonDownload> -->
  </div>
</template>

<style scoped>
.container {
  width: 30vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
/* .button-download {
  width: 40%;
  margin: 0 auto;

} */
</style>
