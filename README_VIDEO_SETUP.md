# Video Setup Instructions

## eInvite Video Setup

The eInvite video file `Aayush Digital Invitation Card 01.mp4` is excluded from this repository due to GitHub's 100MB file size limit.

### To include the video in your deployment:

1. **For Vercel**: Place the video file in `src/assets/couple/` directory
2. **For Netlify**: Ensure the video file is in the correct path relative to your build
3. **For local development**: The video file should be in `src/assets/couple/`

### Alternative Solutions:

1. **Use a CDN**: Upload to Vimeo, YouTube, or AWS S3 and update the import URL
2. **Compress the video**: Reduce file size to under 100MB using tools like HandBrake
3. **Use Git LFS**: Install Git Large File Storage for projects with large assets

### Current Implementation:

The video player in `MusicPlayer.tsx` will gracefully handle missing video files by showing "Your browser does not support the video tag" message if the file is not found.

### Recommended Video Specifications for Wedding Invites:

- **Format**: MP4 with H.264 codec
- **Resolution**: 1080p or 720p
- **Duration**: 2-3 minutes maximum
- **File size**: Under 50MB for web optimization
- **Audio**: AAC encoding for broad browser support
