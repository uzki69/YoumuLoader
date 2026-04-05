interface YoumuData {
    hostname: string,
    token: string,
    playlist: boolean,
    audio: boolean
};

interface VideoData {
    url: string,
    thumb: string
}

declare var browser: any;

export function getItem(): YoumuData | null{
    const data = localStorage.getItem("data");
    
    if (!data) {
        return null
    }

    const splited = data.split("%?s");
    
    if (splited.length != 4)  {
        return null;
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

export async function downloadVideo(data: YoumuData, video: string): Promise<Response> {
    return await fetch(`${data.hostname}/youmu/download?video=${video}&audio=${data.audio}&playlist=${data.playlist}`, {
        headers: {
            "Authorization:": `MediaBrowser Token="${data.token}"`
        }
    })
}

export async function getVideoData() {
    const tab = await browser.tabs.getCurrent();
    if (!tab) return null; // no tab
    if (!tab.url) return null; // url not found
    return {
        url: tab.url,
        thumb: getThumbnail(tab.url),
    };
}

export function getThumbnail(url: string): string {
    const video_param_index = url.search(/\?v=/)
    const params = url.slice(video_param_index+3);
    const end_video_param = params.indexOf('&');
    if (end_video_param > 0) {
        return params.slice(0, end_video_param);
    }
    return params;
}