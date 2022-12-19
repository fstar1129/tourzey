import videos from './Theme.Main.commonVideos';

export default {
  video: {
    adventure: { id: 1, name: 'Adventure', src: videos.adventure, uri: require('../assets/videos/loaderVideos/adventure.mp4') },
    food: { id: 2, name: 'Food', src: videos.food, uri: require('../assets/videos/loaderVideos/food.mp4') },
    location: { id: 3, name: 'Local', src: videos.location, uri: require('../assets/videos/loaderVideos/location.mp4') },
    nightLife: { id: 4, name: 'NightLife', src: videos.nightLife, uri: require('../assets/videos/loaderVideos/nightLife.mp4') },
    other: { id: 5, name: 'Others', src: videos.other, uri: require('../assets/videos/loaderVideos/others.mp4') },
    sightSeeing: { id: 6, name: 'SightSeeing', src: videos.sightSeeing, uri: require('../assets/videos/loaderVideos/sightSeeing.mp4') },
    sports: { id: 7, name: 'Sports', src: videos.sports, uri: require('../assets/videos/loaderVideos/sportAnimation.mp4') },
  },
};
