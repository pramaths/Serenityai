import { useState, useEffect } from 'react';
import axios from 'axios';

const VideoRecommendations = ({ dashboard: dassReport }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      const topics = [];
      if (dassReport.depressionSeverity === 'Severe' || dassReport.depressionSeverity === 'Extremely Severe') {
        topics.push('overcoming depression');
      }
      if (dassReport.anxietySeverity === 'Severe' || dassReport.anxietySeverity === 'Extremely Severe') {
        topics.push('managing anxiety');
      }
      if (dassReport.stressSeverity === 'Severe' || dassReport.stressSeverity === 'Extremely Severe') {
        topics.push('stress relief');
      }
      const searchQueries = topics.length > 0 ? topics : ['mental wellness']; 
      try {
        const videoData = [];

        for (const query of searchQueries) {
          const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
              part: 'snippet',
              q: query,
              type: 'video',
              maxResults: 2, // Adjust as needed
              key: 'AIzaSyAh_G1A2bht-XtQA34oyVBjiUGAo13ZuCA', // Ensure to replace this with your actual API key
            },
          });

          videoData.push(...response.data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.default.url,
          })));
        }

        setVideos(videoData);
      } catch (error) {
        console.error('Error fetching recommended videos:', error);
      }
    };

    if (dassReport) {
      fetchRecommendedVideos();
    }
  }, [dassReport]);

  return (
    <div>
      <h2 style={{color:"grey"}}>May be these would help</h2>
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
