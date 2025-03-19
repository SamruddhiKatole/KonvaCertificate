import React from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import BackgroundImage from './BackgroundImage';

const PageThumbnail = ({ page, canvasSize, scale = 0.2 }) => (
  <Stage
    width={canvasSize.width * scale}
    height={canvasSize.height * scale}
    scaleX={scale}
    scaleY={scale}
  >
    <Layer>
      <Rect
        x={0}
        y={0}
        width={canvasSize.width}
        height={canvasSize.height}
        fill={page.backgroundColor}
      />
      {page.backgroundImage && (
        <BackgroundImage
          url={page.backgroundImage}
          width={canvasSize.width}
          height={canvasSize.height}
        />
      )}
      {page.eSignature && (
        <BackgroundImage
          url={page.eSignature}
          width={150}
          height={50}
          x={canvasSize.width - 200}
          y={canvasSize.height - 100}
        />
      )}
      {page.texts.map((txt) => (
        <Text
          key={txt.id}
          text={txt.text}
          fontSize={txt.fontSize}
          fontFamily={txt.fontFamily}
          fill={txt.color}
          x={txt.x}
          y={txt.y}
        />
      ))}
      {page.shapes.map((shape) => {
        if (shape.shapeType === 'rectangle')
          return (
            <Rect
              key={shape.id}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              fill={shape.fill}
              stroke={shape.stroke}
              strokeWidth={shape.strokeWidth}
              opacity={shape.opacity}
            />
          );
        if (shape.shapeType === 'circle')
          return (
            <Circle
              key={shape.id}
              x={shape.x}
              y={shape.y}
              radius={shape.radius}
              fill={shape.fill}
              stroke={shape.stroke}
              strokeWidth={shape.strokeWidth}
              opacity={shape.opacity}
            />
          );
        if (shape.shapeType === 'line')
          return (
            <Line
              key={shape.id}
              points={shape.points}
              stroke={shape.stroke}
              strokeWidth={shape.strokeWidth}
              opacity={shape.opacity}
            />
          );
        return null;
      })}
    </Layer>
  </Stage>
);

export default PageThumbnail;



