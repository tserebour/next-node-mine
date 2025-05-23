'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material/styles';
import { Play as PlayIcon } from '@phosphor-icons/react/dist/ssr/Play';
import { VideoCamera as VideoCameraIcon } from '@phosphor-icons/react/dist/ssr/VideoCamera';

/**
 * Props interface for the CameraFeedCard component.
 */
export interface CameraFeedCardProps {
  /**
   * The URL for the video thumbnail image.
   */
  thumbnailSrc: string;
  /**
   * The main title for the feed (e.g., "Feed from outside door").
   */
  title: string;
  /**
   * The camera identifier (e.g., "Camera 002").
   */
  cameraName: string;
  /**
   * The location of the camera (e.g., "outside door").
   */
  cameraLocation: string;
  /**
   * The timestamp or duration (e.g., "03:32").
   */
  timestamp: string;
  /**
   * Whether the feed is currently live.
   */
  isLive: boolean;
  /**
   * Optional Material UI system properties for custom styling.
   */
  sx?: SxProps;
}

/**
 * CameraFeedCard component displays a video feed preview with a thumbnail,
 * title, camera details, and live status.
 */
export function CameraFeedCard({
  thumbnailSrc,
  title,
  cameraName,
  cameraLocation,
  timestamp,
  isLive,
  sx,
}: CameraFeedCardProps): React.JSX.Element {
  return (
    <Card sx={{ ...sx, borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2, '&:last-child': { pb: 2 } }}>
        {/* Thumbnail with Play Button */}
        <Box
          sx={{
            position: 'relative',
            width: '100px', // Fixed width for the thumbnail
            height: '80px', // Fixed height for the thumbnail
            borderRadius: '8px',
            overflow: 'hidden',
            flexShrink: 0,
            mr: 2, // Margin to the right of the thumbnail
            backgroundImage: `url(${thumbnailSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#E0E0E0', // Fallback background color
          }}
        >
          {/* Play icon overlay */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              bgcolor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for play button
              color: '#FF7043', // Orange play icon
            }}
          >
            <PlayIcon fontSize="var(--icon-fontSize-lg)" weight="fill" />
          </Box>
        </Box>

        {/* Text Content */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#424242', mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#757575' }}>
            {cameraName} | {cameraLocation} | {timestamp}
          </Typography>
        </Box>

        {/* Go Live Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 2 }}>
          <VideoCameraIcon fontSize="var(--icon-fontSize-lg)" color={isLive ? '#4CAF50' : '#BDBDBD'} />
          <Typography variant="caption" sx={{ color: isLive ? '#4CAF50' : '#BDBDBD', fontWeight: 500, mt: 0.5 }}>
            Go Live
            {isLive && (
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  bgcolor: '#4CAF50',
                  ml: 0.5,
                  verticalAlign: 'middle',
                }}
              />
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

// Example usage of the CameraFeedCard component
export function App() {
  return (
    <Box sx={{ p: 3, maxWidth: '600px', mx: 'auto' }}>
      <CameraFeedCard
        thumbnailSrc="https://placehold.co/100x80/E0E0E0/424242?text=Video" // Placeholder image
        title="Feed from outside door"
        cameraName="Camera 002"
        cameraLocation="outside door"
        timestamp="03:32"
        isLive={true}
      />
      <Box sx={{ mt: 2 }}>
        <CameraFeedCard
          thumbnailSrc="https://placehold.co/100x80/BDBDBD/FFFFFF?text=Offline" // Another placeholder
          title="Feed from backyard"
          cameraName="Camera 003"
          cameraLocation="backyard"
          timestamp="12:15"
          isLive={false}
        />
      </Box>
    </Box>
  );
}
