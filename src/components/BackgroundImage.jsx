import React from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const BackgroundImage = ({ url, width, height, x = 0, y = 0 }) => {
  const [image] = useImage(url, 'Anonymous');
  return image ? (
    <KonvaImage image={image} width={width} height={height} x={x} y={y} />
  ) : null;
};

export default BackgroundImage;

