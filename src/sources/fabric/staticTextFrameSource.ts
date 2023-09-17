// @ts-nocheck
import { fabric } from "fabric"
import { TextLayer } from "../../interfaces/common"

async function staticTextFrameSource({ layer, options }: { layer: TextLayer; options: any }) {
  // const metadata = layer.metadata
  const { textAlign, fontFamily, fontSize, fontWeight, charSpacing, lineHeight, text, left } = layer
  const textOptions = {
    ...layer,
    text: text ? text : "Default Text",
    ...(textAlign && { textAlign }),
    ...(fontFamily && { fontFamily }),
    ...(fontSize && { fontSize }),
    ...(fontWeight && { fontWeight }),
    ...(charSpacing && { charSpacing }),
    ...(lineHeight && { lineHeight }),
  }
  let firstTime = false;
  let currentLeft = textOptions.left;
  let originaleft = textOptions.left;
  const element = new fabric.StaticText(textOptions)
  async function onRender(progress: number, canvas: fabric.StaticCanvas) {
    if(!firstTime){
      firstTime = true;
      element.left = layer?.animationEnter?.valueFrom
      element.animate("left",  originaleft, {
        onChange: function(e) {
          currentLeft = e;
          element.left =e;
        },
        duration: layer?.animationEnter?.duration ,
        onComplete: function() {

        },
        easing : fabric.util.ease['easeOutBounce']
      })
    }
    canvas.add(element)
  }

  return { onRender }
}

export default staticTextFrameSource
