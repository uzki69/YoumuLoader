<script setup>
import axios from 'axios'
import { ref } from 'vue'

const hostnameRef = ref('')
const imageSrcRef = ref('');
const videoNameRef = ref('');
const tokenRef = ref('');
const buttonStatusRef = ref('Download Video');
const isAudioRef = ref('');

function getVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null;
}

async function getCurrentYTUrl() {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    if (!tabs[0]?.url) {
        console.log("active tab not found")
        return
    }
    const currentUrl = tabs[0].url;

    const regex = /^https:\/\/www.youtube.com\/watch/;

    if (currentUrl.search(regex) == -1) {
        console.error(currentUrl, " is not video")
        return;
    }
    return { url: currentUrl, yttab: tabs[0] }
}

document.addEventListener('DOMContentLoaded', async () => {
    const ytObj = await getCurrentYTUrl();
    const videoId = getVideoId(ytObj.url);

    const title =  ytObj.yttab.title.trim();
    const cookie = await browser.storage.local.get(["hostname", "token", "isAudio"]);
    imageSrcRef.value = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    videoNameRef.value = title ? title : "Not available";
    tokenRef.value = cookie.token ? cookie.token : "";
    isAudioRef.value = cookie.isAudio ? cookie.isAudio : false;
    hostnameRef.value = cookie.hostname ? cookie.hostname : "";
})

async function downloadVideo() {
    const btn = document.querySelector("#download-button");
    const url =  (await getCurrentYTUrl()).url;
    buttonStatusRef.value = "Downloading..."
    btn.style.backgroundColor = "#777"
    btn.style.borderColor = "#777"
    const lastUrl = (await browser.storage.local.get("lastVideo")).lastVideo
    if (lastUrl === url) {
        buttonStatusRef.value = "Video Already Downloaded..."
        btn.style.backgroundColor = "yellow"
        btn.style.borderColor = "#777"
        return
    }
    browser.storage.local.set({ token: tokenRef.value, hostname: hostnameRef.value, isAudio: isAudioRef.value})
    axios.get(`${hostnameRef.value}youmu/download`, {
        params: {
            video: url,
            audio: isAudioRef.value ? true : false
        },
        headers: {
            Authorization: `MediaBrowser Token="${tokenRef.value}"`
        }
    })
        .then(() => {
            buttonStatusRef.value = "Video Downloaded!";
            btn.style.backgroundColor = "green"
            btn.style.borderColor = "green"
            browser.storage.local.set({ lastVideo:  url})
        })
        .catch(() => {
            buttonStatusRef.value = "Something Wrong?";
            btn.style.backgroundColor = "red"
            btn.style.borderColor = "red"
        })
}
</script>

<template>
    <div id="popup-content">
        <div>
            <label for="host">Hostname:</label>
            <input type="text" id="host" v-model="hostnameRef" placeholder="https://example.com/">
        </div>
        <div>
            <label for="passwd">Token:</label>
            <input id="passwd" type="password" v-model="tokenRef">
            <p>{{ tokenRef.slice(0, 3) }}...{{ tokenRef.slice(-3) }}</p>
        </div>
        <div>
            <label for="audio-box">Audio: </label>
            <input type="checkbox" name="" id="audio-box" v-model="isAudioRef">
        </div>
        <div id="download-container">
            <img :src="imageSrcRef" alt="Video thumb" id="video-image">
            <p id="video-name">{{ videoNameRef }}</p>
            <button id="download-button" @click="downloadVideo()">{{ buttonStatusRef }}</button>
        </div>
    </div>
</template>

<style scoped>
#download-button {
    padding: 3rem;
}

#download-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#host, #passwd {
    margin-left: 0.5rem;
}

#video-image {
    max-width: 70%;
}
</style>