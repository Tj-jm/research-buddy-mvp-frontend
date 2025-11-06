// utils/categoryInfo.js

import { Computer, Chat,  CameraAlt, Android, Functions } from '@mui/icons-material';

export const categoryInfo = {
  'cs.CV': {
    name: 'Computer Vision',
    description: 'Focuses on image recognition, object detection, segmentation, etc.',
    icon: <CameraAlt sx={{ fontSize: 36, color: '#1976d2' }} />,
  },
  'cs.CL': {
    name: 'Natural Language Processing',
    description: 'Works on text, language modeling, and LLMs.',
    icon: <Chat sx={{ fontSize: 36, color: '#9c27b0' }} />,
  },
  'cs.IT math.IT': {
    name: 'Information Theory',
    description: 'Studies signal processing, coding theory, and entropy.',
    icon: <Functions sx={{ fontSize: 36, color: '#ff9800' }} />,
  },
  'cs.LG': {
    name: 'Machine Learning',
    description: 'Covers ML algorithms, neural networks, and learning theory.',
    icon: <Computer sx={{ fontSize: 36, color: '#4caf50' }} />,
  },
  'cs.RO': {
    name: 'Robotics',
    description: 'Involves motion planning, control systems, and automation.',
    icon: <Android sx={{ fontSize: 36, color: '#f44336' }} />,
  },
};
