import Hammer from 'hammerjs';
import cornerstone from 'cornerstone-core';
import cornerstoneMath from 'cornerstone-math';
import cornerstoneTools from 'cornerstone-tools';

import DrawContourTool from './appTools/DrawContourTool';
import DrawDoseTool from './appTools/DrawDoseTool';
import DrawBeamLinesTool from './appTools/DrawBeamLinesTool';
import DrawFusionTool from './appTools/DrawFusionTool';
import { FusionPanTool, FusionZoomTool } from './appTools/FusionTools';

export default function(store, configuration = {}) {
  // For debugging
  window.cornerstoneTools = cornerstoneTools;

  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.Hammer = Hammer;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.init(configuration);

  // Set the tool font and font size
  // context.font = "[style] [variant] [weight] [size]/[line height] [font family]";
  const fontFamily =
    'Roboto, OpenSans, HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif';
  cornerstoneTools.textStyle.setFont(`16px ${fontFamily}`);

  // Tool styles/colors
  cornerstoneTools.toolStyle.setToolWidth(2);
  cornerstoneTools.toolColors.setToolColor('rgb(255, 255, 0)');
  cornerstoneTools.toolColors.setActiveColor('rgb(0, 255, 0)');

  cornerstoneTools.store.state.touchProximity = 40;

  cornerstoneTools.addTool(DrawContourTool);
  cornerstoneTools.setToolActive('DrawContourTool');

  cornerstoneTools.addTool(DrawDoseTool);
  // cornerstoneTools.setToolActive('DrawDoseTool');

  cornerstoneTools.addTool(DrawBeamLinesTool);
  cornerstoneTools.setToolActive('DrawBeamLinesTool');

  cornerstoneTools.addTool(DrawFusionTool);
  cornerstoneTools.setToolActive('DrawFusionTool');

  cornerstoneTools.addTool(FusionPanTool);
  cornerstoneTools.addTool(FusionZoomTool);
}
