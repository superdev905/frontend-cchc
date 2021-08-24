import React from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

const IMAGES = [
  'https://source.unsplash.com/WLUHO9A_xik/1600x900',
  'https://source.unsplash.com/dpbXgTh0Lac/1600x900'
]

const ImageZoom = () => (
  <div>
    <div>
      <div>
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={1}
          defaultPositionY={1}
        >
          <TransformComponent>
            <img src={IMAGES[0]} style={{ width: '100%' }} />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>

    <div>
      <div>
        <h2>Zoomable image with custom controls</h2>
      </div>
      <div>
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={1}
          defaultPositionY={1}
        >
          {({ zoomIn, zoomOut }) => (
            <>
              <div>
                <button onClick={zoomIn}>Zoom In</button>
                <button onClick={zoomOut}>Zoom Out</button>
              </div>
              <TransformComponent>
                <img src={IMAGES[1]} style={{ width: '100%' }} />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  </div>
)

export default ImageZoom
