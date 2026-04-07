export enum DownloadState {
    NORMAL,
    BAD,
    WAITING,
    GOOD,
}

export interface YoumuData {
    hostname: string,
    token: string,
    playlist: boolean,
    audio: boolean
};

export interface VideoData {
    video_url: string,
    thumb_url: string
}

export interface AppData extends YoumuData, VideoData {
    downloadState: DownloadState
};


export enum YoumuCodes {
    TABS_NOT_FOUND,
    URL_NOT_FOUND,
    DATA_NOT_FOUND,
    DATA_INCOMPLETE,
    FETCH_NOT_OK
}

export class YoumuError extends Error {
    code: YoumuCodes;

    constructor(code: YoumuCodes, message?:string) {
        super(`[ERROR] ${message}`);
        this.code = code;
    }
}