import React from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import BackgroundImage from './BackgroundImage';

const CertificateCanvas = ({
  currentPage,
  canvasSize,
  zoom,
  stageRef,
  updateText,
  updateShape,
  setActiveTextId,
  setTextSettings
}) => {
  return (
    <Stage
    ref={stageRef}
    width={canvasSize.width}
    height={canvasSize.height}
    scaleX={zoom}
    scaleY={zoom}
    offsetX={canvasSize.width / 2}
    offsetY={canvasSize.height / 2}
    x={canvasSize.width / 2}
    y={canvasSize.height / 2}
    >
      <Layer>
        <Rect
          x={0}
          y={0}
          width={canvasSize.width}
          height={canvasSize.height}
          fill={currentPage.backgroundColor}
        />
        {currentPage.backgroundImage && (
          <BackgroundImage
            url={currentPage.backgroundImage}
            width={canvasSize.width}
            height={canvasSize.height}
          />
        )}
        {currentPage.eSignature && (
          <BackgroundImage
            url={currentPage.eSignature}
            width={150}
            height={50}
            x={canvasSize.width - 200}
            y={canvasSize.height - 100}
          />
        )}
        {currentPage.texts.map((txt) => (
          <Text
            key={txt.id}
            text={txt.text}
            fontSize={txt.fontSize}
            fontFamily={txt.fontFamily}
            fill={txt.color}
            fontStyle={txt.fontStyle}
            textDecoration={txt.textDecoration}
            align={txt.align || 'left'}
            x={txt.x}
            y={txt.y}
            draggable
            onDragEnd={(e) =>
              updateText(txt.id, { x: e.target.x(), y: e.target.y() })
            }
            onDblClick={(e) => {
              const stage = e.target.getStage();
              const container = stage.container();
              const textarea = document.createElement('textarea');
              container.appendChild(textarea);
              textarea.value = txt.text;
              textarea.style.position = 'absolute';
              textarea.style.top = `${e.evt.clientY}px`;
              textarea.style.left = `${e.evt.clientX}px`;
              textarea.style.fontSize = `${txt.fontSize}px`;
              textarea.style.fontFamily = txt.fontFamily;
              textarea.style.color = txt.color;
              textarea.addEventListener('pointerdown', (ev) => ev.stopPropagation());
              const removeTextarea = () => {
                updateText(txt.id, { text: textarea.value });
                container.removeChild(textarea);
                window.removeEventListener('pointerdown', removeTextarea);
              };
              window.addEventListener('pointerdown', removeTextarea);
              textarea.focus();
              setActiveTextId(txt.id);
              setTextSettings({
                text: txt.text,
                fontSize: txt.fontSize,
                fontFamily: txt.fontFamily,
                color: txt.color,
                isBold: txt.fontStyle?.includes('bold') || false,
                isItalic: txt.fontStyle?.includes('italic') || false,
                isUnderline: txt.textDecoration?.includes('underline') || false,
                align: txt.align || 'left'
              });
            }}
          />
        ))}
        {currentPage.shapes.map((shape) => {
          if (shape.shapeType === 'rectangle') {
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
                draggable
                onDragEnd={(e) =>
                  updateShape(shape.id, { x: e.target.x(), y: e.target.y() })
                }
              />
            );
          }
          if (shape.shapeType === 'circle') {
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
                draggable
                onDragEnd={(e) =>
                  updateShape(shape.id, { x: e.target.x(), y: e.target.y() })
                }
              />
            );
          }
          if (shape.shapeType === 'line') {
            return (
              <Line
                key={shape.id}
                points={shape.points}
                stroke={shape.stroke}
                strokeWidth={shape.strokeWidth}
                opacity={shape.opacity}
                draggable
                onDragEnd={(e) =>
                  updateShape(shape.id, { x: e.target.x(), y: e.target.y() })
                }
              />
            );
          }
          return null;
        })}
      </Layer>
    </Stage>
  );
};

export default CertificateCanvas;



