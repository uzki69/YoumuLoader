import axios from "axios";
import { YoumuCodes, YoumuError, type VideoData, type YoumuData } from "./type";

declare var browser: any;

export function getItem(): YoumuData | YoumuError{
    const data = localStorage.getItem("data");
    
    if (!data) {
        return new YoumuError(YoumuCodes.DATA_NOT_FOUND);
    }

    const splited = data.split("%?s");
    
    if (splited.length != 4)  {
        return new YoumuError(YoumuCodes.DATA_INCOMPLETE);
    }

    const item: YoumuData = {
        hostname: splited[0] as string,
        token: splited[1] as string,
        playlist: (splited[2] === "true"), 
        audio: (splited[3] === "true"),
    };

    return item;
}

export function setItem(data: YoumuData): void {
    localStorage.setItem("data", `${data.hostname}%?s${data.token}%?s${data.playlist}%?s${data.audio}`);
}

export async function downloadVideo(data: YoumuData, video: string): Promise<YoumuError | void> {

    const res = await axios.get(`${data.hostname}/youmu/download`,
        {
            params: {
                video: video,
                audio: data.audio,
                playlist: data.playlist
            },
            headers: {
                "Authorization": `MediaBrowser Token="${data.token}"`
            }
        }
    )
    if (res.status < 200 || 299 < res.status) {
        return new YoumuError(YoumuCodes.FETCH_NOT_OK, "bad response");
    }
}

export async function getVideoData(): Promise<VideoData | YoumuError>  {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    const tab = tabs[0];
    if (!tab) return new YoumuError(YoumuCodes.TABS_NOT_FOUND, "could not get your current tab"); // no tab
    if (!tab.url) return new YoumuError(YoumuCodes.URL_NOT_FOUND, "could not get tab url"); // url not found
    return {
        video_url: tab.url, // full youtube url? server side verification anyway
        thumb_url: getThumbnail(tab.url),
    };
}

function getThumbnail(url: string): string {
    const id = getVideoId(url) 
    
    if (id === '') {
        return ''
    }

    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg` 
}

function getVideoId(url: string): string {
    const isYoutube = url.includes("youtube");
    const isVideo = url.includes("watch?v=");
    if (!isYoutube || !isVideo) {
        return ''
    }
    const video_param_index = url.search(/\?v=/)
    const params = url.slice(video_param_index+3);
    const end_video_param = params.indexOf('&');
    if (end_video_param > 0) {
        return params.slice(0, end_video_param);
    }
    return params;
}