export function getYoutubeId(url) {
    // Extract video ID from YouTube URL
    const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
}

export function getVimeoId(url) {
    // Extract video ID from Vimeo URL
    const regex = /(?:vimeo\.com\/)(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
}
