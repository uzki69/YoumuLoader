<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ButtonDownload from './components/ButtonDownload.vue';
import CheckBox from './components/CheckBox.vue';
import TextInput from './components/TextInput.vue';
import VideoThumb from './components/VideoThumb.vue';
import * as api from '@/lib/api'
import * as type from "@/lib/type"
const audioChecked = ref<boolean>(false);
const playlistChecked = ref<boolean>(false);
const hostname = ref('');
const token = ref('');
const downloadState = ref(type.DownloadState.NORMAL);
const thumb = ref('');
const video_url = ref('');

onMounted(async () => {
  const video = await api.getVideoData();
  if (video) {
    thumb.value = video.thumb;
    video_url.value = video.url;
  }
})

function setItem() {
  api.setItem({
    hostname: hostname.value,
    token: token.value,
    audio: audioChecked.value,
    playlist: playlistChecked.value
  })
}

async function handleDownloadButton() {
  setItem();
  if (!data) {
    downloadState.value = type.DownloadState.BAD;
    return;
  }

  const res = await api.downloadVideo(data, video_url.value);
  if (res.ok) {
    downloadState.value = type.DownloadState.GOOD;
    return;
  }
  downloadState.value = type.DownloadState.BAD;
}


</script>

<template>
  <div class="container">
    <!-- host -->
    <TextInput v-model="hostname" placeholder="https://www.example.com/" name="hostname">Hostname:</TextInput>
    <!-- jellyfin token -->
    <TextInput v-model="token" name="token">Token:</TextInput>
    <div class="checkbox">
      <CheckBox v-model="playlistChecked">Playlist</CheckBox>
      <CheckBox v-model="audioChecked">Audio Only</CheckBox>
    </div>
    <VideoThumb :src="thumb" />

    <ButtonDownload :state="downloadState" class="button-download" @click="handleDownloadButton">
      Download video
    </ButtonDownload >
  </div>
</template>

<style scoped>
.container {
  max-width: 80vw;
  display: flex;
  overflow: hidden;
  justify-content: center;
  flex-direction: column;
}

.button-download {
  margin: 0 auto;
}


.checkbox {
  display: flex;
  align-items: center;
  column-gap: 16px;
  justify-content: center;
  padding: 1ch;
}
</style>
