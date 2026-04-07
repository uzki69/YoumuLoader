<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import ButtonDownload from './components/ButtonDownload.vue';
import CheckBox from './components/CheckBox.vue';
import TextInput from './components/TextInput.vue';
import VideoThumb from './components/VideoThumb.vue';
import * as api from '@/lib/api'
import { DownloadState, YoumuCodes, YoumuError, type AppData } from './lib/type';
// const audioChecked = ref<boolean>(false);
// const playlistChecked = ref<boolean>(false);
// const hostname = ref('');
// const token = ref('');
// const downloadState = ref(type.DownloadState.NORMAL);
// const thumb = ref('');
// const video_url = ref('');

const app_data: AppData = reactive<AppData>({
  audio: false,
  playlist: false,
  hostname: '',
  downloadState: DownloadState.NORMAL,
  thumb_url: '',
  token: '',
  video_url: ''
})



onMounted(async () => {
  const video = await api.getVideoData();

  if (video instanceof YoumuError) {
    console.error(video);
    return;
  }

  app_data.video_url = video.video_url;
  app_data.thumb_url = video.thumb_url

  const data = api.getItem();

  if (data instanceof YoumuError) {
    return;
  }

  app_data.hostname = data.hostname
  app_data.token = data.token
  app_data.playlist = data.playlist
  app_data.audio = data.audio
})

async function handleDownloadButton() {
  const handle = api.downloadVideo(app_data, app_data.video_url);
  app_data.downloadState = DownloadState.WAITING;
  api.setItem(app_data);
  const error = await handle;

  if (error instanceof YoumuError) {
    switch (error.code) {
      case YoumuCodes.FETCH_NOT_OK:
      default:
        app_data.downloadState = DownloadState.BAD;
    }
    return;
  }

  app_data.downloadState = DownloadState.GOOD;
}


const buttonMessage = computed(() => {
  const map: Record<DownloadState, string> = {
    [DownloadState.BAD] : "Failed to download",
    [DownloadState.GOOD] : "Downloaded",
    [DownloadState.NORMAL]: "Download video",
    [DownloadState.WAITING]: "Waiting..."
  }
  return map[app_data.downloadState];
})


</script>

<template>
  <div class="container">
    <!-- host -->
    <TextInput class="text-input" v-model="app_data.hostname" placeholder="https://www.example.com/" name="hostname">Hostname:</TextInput>
    <!-- jellyfin token -->
    <TextInput type="password" class="text-input" v-model="app_data.token" name="token">Token:</TextInput>
    <div class="checkbox">
      <CheckBox v-model="app_data.playlist">Playlist</CheckBox>
      <CheckBox v-model="app_data.audio">Audio Only</CheckBox>
    </div>
    <VideoThumb :src="app_data.thumb_url" />

    <ButtonDownload :state="app_data.downloadState" class="button-download" @click="handleDownloadButton">
      {{ buttonMessage }}
    </ButtonDownload>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.button-download {
  /* margin: 0 auto; */
  width: 100%;
  height: 5em;
}


.checkbox {
  display: flex;
  align-items: center;
  column-gap: 16px;
  justify-content: start;
  padding: 1ch;
}

.text-input {
  max-width: 80%;
}
</style>
