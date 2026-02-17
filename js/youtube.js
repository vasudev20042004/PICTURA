const YOUTUBE_config = {
    channelID: 'UCik8vybT0H_WhuV7wSB7laA', // Pictura Creations Channel ID
    maxVideosHome: 3,
    maxVideosGallery: 7
};

// Function to fetch RSS feed
async function fetchYouTubeVideos() {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_config.channelID}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'ok') {
            return data.items;
        } else {
            console.error('Failed to fetch YouTube feed:', data.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching YouTube feed:', error);
        return [];
    }
}

// Function to render Featured Videos on Home Page
function renderFeaturedVideo(videos) {
    const container = document.getElementById('featured-video-container');
    if (!container || videos.length === 0) return;

    // Remove existing content/placeholders
    container.innerHTML = '';

    // Create a grid container for the featured items
    container.className = 'work-grid'; // Use existing grid class

    // Take up to maxVideosHome (3)
    const featuredVideos = videos.slice(0, YOUTUBE_config.maxVideosHome);

    const html = featuredVideos.map(video => {
        const videoId = video.guid.split(':')[2];
        const subscribeUrl = `https://www.youtube.com/channel/${YOUTUBE_config.channelID}?sub_confirmation=1`;

        // Using Facade pattern (thumbnail click) for performance
        const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

        return `
        <div class="work-item">
             <div class="card-thumbnail" onclick="loadVideo(this, '${videoId}')" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding-bottom: 0;">
                 <img src="${thumbnail}" alt="${video.title}" loading="lazy" onerror="this.src='https://i.ytimg.com/vi/${videoId}/hqdefault.jpg'">
                 <div class="play-button"><i class="fas fa-play"></i></div>
            </div>
            <div class="work-overlay" style="pointer-events:none;"> 
                <!-- Simple overlay for title on hover -->
                <h3 style="font-size:1.2rem; margin-bottom:0.5rem;">${video.title}</h3>
                <p>${new Date(video.pubDate).toLocaleDateString()}</p>
            </div>
        </div>
        `;
    }).join('');

    container.innerHTML = html;
}

// Function to load iframe on click (Facade Pattern)
window.loadVideo = function (element, videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    element.innerHTML = `<iframe width="100%" height="100%" src="${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    element.classList.add('video-loaded');
};

// Function to render Gallery Grid
function renderGalleryVideos(videos) {
    const container = document.getElementById('youtube-gallery-grid');
    const section = document.getElementById('youtube-section-gallery');

    if (!container || videos.length === 0) return;

    // Show section if it exists
    if (section) section.style.display = 'block';

    // Use max configured videos, starting from the beginning (include featured)
    const displayVideos = videos.slice(0, YOUTUBE_config.maxVideosGallery);

    container.innerHTML = displayVideos.map(video => {
        const videoId = video.guid.split(':')[2];
        const subscribeUrl = `https://www.youtube.com/channel/${YOUTUBE_config.channelID}?sub_confirmation=1`;
        const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

        return `
            <div class="youtube-card">
                <div class="card-thumbnail" onclick="loadVideo(this, '${videoId}')">
                     <img src="${thumbnail}" alt="${video.title}" loading="lazy" onerror="this.src='https://i.ytimg.com/vi/${videoId}/hqdefault.jpg'">
                     <div class="play-button"><i class="fas fa-play"></i></div>
                </div>
                <div class="card-info">
                    <h5>${video.title}</h5>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem;">
                        <span>${new Date(video.pubDate).toLocaleDateString()}</span>
                        <a href="${subscribeUrl}" target="_blank" style="color:#FF0000; font-size:1.2rem;"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Only fetch if we have containers to fill
    const hasHomeContainer = document.getElementById('featured-video-container');
    const hasGalleryContainer = document.getElementById('youtube-gallery-grid');

    if (hasHomeContainer || hasGalleryContainer) {
        const videos = await fetchYouTubeVideos();

        if (hasHomeContainer) renderFeaturedVideo(videos);
        if (hasGalleryContainer) renderGalleryVideos(videos);
    }
});
