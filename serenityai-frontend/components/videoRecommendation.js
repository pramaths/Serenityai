import { useState, useEffect } from 'react';
import axios from 'axios';

const VideoRecommendations = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      try {
        // Make an API request to YouTube Data API
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            q: 'How to overcome Depression ?', // Adjust the search query based on your criteria or genre
            type: 'video',
            maxResults: 2, // Maximum number of videos to fetch
            key: 'AIzaSyAh_G1A2bht-XtQA34oyVBjiUGAo13ZuCA', // Your YouTube Data API key
          },
        });

        // Extract video data from the response
        const videoData = response.data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url,
        }));

        // Set the fetched videos in state
        setVideos(videoData);
      } catch (error) {
        console.error('Error fetching recommended videos:', error);
      }
    };

    fetchRecommendedVideos();
  }, []);

  return (
    <div>
      <h2>May be these would help</h2>
      <div className="video-list">
        {videos.map(video => (
          <div key={video.id} className="video-item">
            <h3>{video.title}</h3>
            <iframe
              title={video.title}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoRecommendations;
