export const generateHTMLForCertificate = (certificate, canvasSize) => {
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Certificate</title>
      <style>
        body { margin: 0; padding: 20px; background: #eee; }
        .certificate-page {
          position: relative;
          width: ${canvasSize.width}px;
          height: ${canvasSize.height}px;
          margin: 20px auto;
          box-shadow: 0 0 10px rgba(0,0,0,0.15);
        }
        .certificate-page img,
        .certificate-page div {
          position: absolute;
        }
      </style>
    </head>
    <body>
    `;
  
    certificate.pages.forEach((page) => {
      html += `<div class="certificate-page" style="
        background-color: ${page.backgroundColor};
        ${page.backgroundImage ? `background-image: url('${page.backgroundImage}'); background-size: cover;` : ''}
      ">`;
  
      if (page.eSignature) {
        html += `<img src="${page.eSignature}" alt="E-Signature" style="
          width: 150px;
          height: 50px;
          left: ${canvasSize.width - 200}px;
          top: ${canvasSize.height - 100}px;
        "/>`;
      }
  
      page.texts.forEach((txt) => {
        html += `<div style="
          left: ${txt.x}px;
          top: ${txt.y}px;
          font-size: ${txt.fontSize}px;
          font-family: ${txt.fontFamily};
          color: ${txt.color};
          ${txt.fontStyle ? `font-style: ${txt.fontStyle};` : ''}
          ${txt.textDecoration ? `text-decoration: ${txt.textDecoration};` : ''}
        ">${txt.text}</div>`;
      });
  
      page.shapes.forEach((shape) => {
        if (shape.shapeType === 'rectangle') {
          html += `<div style="
            left: ${shape.x}px;
            top: ${shape.y}px;
            width: ${shape.width}px;
            height: ${shape.height}px;
            background-color: ${shape.fill};
            border: ${shape.strokeWidth}px solid ${shape.stroke};
            opacity: ${shape.opacity};
          "></div>`;
        } else if (shape.shapeType === 'circle') {
          html += `<div style="
            left: ${shape.x - shape.radius}px;
            top: ${shape.y - shape.radius}px;
            width: ${shape.radius * 2}px;
            height: ${shape.radius * 2}px;
            background-color: ${shape.fill};
            border: ${shape.strokeWidth}px solid ${shape.stroke};
            opacity: ${shape.opacity};
            border-radius: 50%;
          "></div>`;
        } else if (shape.shapeType === 'line') {
          const pointsStr = shape.points.join(' ');
          html += `<svg style="position: absolute; left: 0; top: 0; overflow: visible;">
            <polyline points="${pointsStr}" stroke="${shape.stroke}" stroke-width="${shape.strokeWidth}" opacity="${shape.opacity}" fill="none" />
          </svg>`;
        }
      });
  
      html += `</div>`;
    });
  
    html += `
    </body>
    </html>
    `;
    return html;
  };

  
  