/**
 * Site videos are hosted on Cloudinary (cloud `racs6pqd`) to keep the repo small.
 * To change a video: upload it to Cloudinary and use its public ID here (the file name without ".mp4").
 */
const cloudinaryVideo = (publicId: string) => `https://res.cloudinary.com/racs6pqd/video/upload/${publicId}.mp4`;

export const heroVideos = {
  home: cloudinaryVideo("home-hero"),
  about: cloudinaryVideo("about-hero"),
  packages: cloudinaryVideo("packages-hero"),
};

/** Gallery videos, in the order they are listed. */
export const galleryVideos = [
  "gallery-video-16",
  "gallery-video-15",
  "gallery-video-11",
  "gallery-video-10",
  "gallery-video-13",
  "gallery-video-09",
  "gallery-video-04",
  "gallery-video-08",
  "gallery-video-06",
  "gallery-video-05",
  "gallery-video-03",
  "gallery-video-02",
  "gallery-video-01",
  "gallery-video-07",
].map(cloudinaryVideo);
