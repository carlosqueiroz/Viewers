import React from 'react';
import adjust from './icons/adjust.svg';
// Icons
import angleDoubleDown from './icons/angle-double-down.svg';
import angleDoubleUp from './icons/angle-double-up.svg';
import angleLeft from './icons/angle-left.svg';
import arrows from './icons/arrows.svg';
import arrowsAltH from './icons/arrows-alt-h.svg';
import arrowsAltV from './icons/arrows-alt-v.svg';
import bars from './icons/bars.svg';
import brain from './icons/brain.svg';
import caretDown from './icons/caret-down.svg';
import caretUp from './icons/caret-up.svg';
import check from './icons/check.svg';
import checkCircle from './icons/check-circle.svg';
import checkCircleO from './icons/check-circle-o.svg';
import chevronDown from './icons/chevron-down.svg';
import circle from './icons/circle.svg';
import circleNotch from './icons/circle-notch.svg';
import circleO from './icons/circle-o.svg';
import cog from './icons/cog.svg';
import createComment from './icons/create-comment.svg';
import createScreenCapture from './icons/create-screen-capture.svg';
import crosshairs from './icons/crosshairs.svg';
import cube from './icons/cube.svg';
import d3Rotate from './icons/3d-rotate.svg';
import database from './icons/database.svg';
import dotCircle from './icons/dot-circle.svg';
import edit from './icons/edit.svg';
import ellipseCircle from './icons/ellipse-circle.svg';
import ellipseH from './icons/ellipse-h.svg';
import ellipseV from './icons/ellipse-v.svg';
import exclamationCircle from './icons/exclamation-circle.svg';
import exclamationTriangle from './icons/exclamation-triangle.svg';
import fastBackward from './icons/fast-backward.svg';
import fastForward from './icons/fast-forward.svg';
import info from './icons/info.svg';
import inlineEdit from './icons/inline-edit.svg';
import level from './icons/level.svg';
import link from './icons/link.svg';
import linkCircles from './icons/link-circles.svg';
import list from './icons/list.svg';
import liver from './icons/liver.svg';
import lock from './icons/lock.svg';
import lockAlt from './icons/lock-alt.svg';
import lung from './icons/lung.svg';
import measureNonTarget from './icons/measure-non-target.svg';
import measureTarget from './icons/measure-target.svg';
import measureTargetCr from './icons/measure-target-cr.svg';
import measureTargetNe from './icons/measure-target-ne.svg';
import measureTargetUn from './icons/measure-target-un.svg';
import measureTemp from './icons/measure-temp.svg';
import objectGroup from './icons/object-group.svg';
import ohifLogo from './icons/ohif-logo.svg';
import oval from './icons/oval.svg';
import palette from './icons/palette.svg';
import play from './icons/play.svg';
import plus from './icons/plus.svg';
import powerOff from './icons/power-off.svg';
import reset from './icons/reset.svg';
import rotate from './icons/rotate.svg';
import rotateRight from './icons/rotate-right.svg';
import search from './icons/search.svg';
import searchPlus from './icons/search-plus.svg';
import softTissue from './icons/soft-tissue.svg';
import sort from './icons/sort.svg';
import sortDown from './icons/sort-down.svg';
import sortUp from './icons/sort-up.svg';
import squareO from './icons/square-o.svg';
import star from './icons/star.svg';
import stepBackward from './icons/step-backward.svg';
import stepForward from './icons/step-forward.svg';
import stop from './icons/stop.svg';
import sun from './icons/sun.svg';
import th from './icons/th.svg';
import thLarge from './icons/th-large.svg';
import thList from './icons/th-list.svg';
import times from './icons/times.svg';
import trash from './icons/trash.svg';
import user from './icons/user.svg';
import youtube from './icons/youtube.svg';

/* ADICIONADOS  */

import RT_Windowing from './icons/rt/RT_Windowing.svg';
import RT_Navigation from './icons/rt/RT_Navigation.svg';
import RT_Pan from './icons/rt/RT_Pan.svg';
import RT_Zoom from './icons/rt/RT_Zoom.svg';
import RT_Length from './icons/rt/RT_Length.svg';
import RT_Measurement from './icons/rt/RT_Measurement.svg';
import RT_Angle from './icons/rt/RT_Angle.svg';
import RT_EllipticalRoi from './icons/rt/RT_EllipticalRoi.svg';
import RT_RectangleRoi from './icons/rt/RT_RectangleRoi.svg';
//import RT_DragProbe from './icons/rt/RT_DragProbe.svg';
import RT_Cine from './icons/rt/RT_Cine.svg';
import RT_Layout from './icons/rt/RT_Layout.svg';
import RT_Default_Layouts from './icons/rt/RT_Default_Layouts.svg';
import RT_Default_Layout_1 from './icons/rt/RT_Default_Layout_1.svg';
import RT_Default_Layout_2 from './icons/rt/RT_Default_Layout_2.svg';
import RT_Default_Layout_3 from './icons/rt/RT_Default_Layout_3.svg';
import RT_Default_Layout_4 from './icons/rt/RT_Default_Layout_4.svg';
import RT_Default_Layout_5 from './icons/rt/RT_Default_Layout_5.svg';
import RT_Default_Layout_6 from './icons/rt/RT_Default_Layout_6.svg';
import RT_Default_Layout_7 from './icons/rt/RT_Default_Layout_7.svg';
import RT_Default_Layout_8 from './icons/rt/RT_Default_Layout_8.svg';
import RT_Default_Layout_9 from './icons/rt/RT_Default_Layout_9.svg';
import RT_RotateRight from './icons/rt/RT_RotateRight.svg';
import RT_FlipH from './icons/rt/RT_FlipH.svg';
import RT_FlipV from './icons/rt/RT_FlipV.svg';
import RT_Sort from './icons/rt/RT_Sort.svg';
import RT_Reset from './icons/rt/RT_Reset.svg';
import RT_CM from './icons/rt/RT_CM.svg';
import RT_PX from './icons/rt/RT_PX.svg';
import RT_Info from './icons/rt/RT_Info.svg';
import RT_Magnify from './icons/rt/RT_Magnify.svg';
import RT_WwwcRegion from './icons/rt/RT_WwwcRegion.svg';
import RT_Invert from './icons/rt/RT_Invert.svg';
import RT_MPR from './icons/rt/RT_MPR.svg';
import RT_Generate_Series from './icons/rt/RT_Generate_Series.svg';
import RT_Fusion from './icons/rt/RT_Fusion.svg';
import RT_RAM from './icons/rt/RT_RAM.svg';
import RT_Filters from './icons/rt/RT_Filters.svg';
import RT_3D from './icons/rt/RT_3D.svg';
import RT_Annotations from './icons/rt/RT_Annotations.svg';
import RT_Erase_Annotations from './icons/rt/RT_Erase_Annotations.svg';
import RT_Write_Report from './icons/rt/RT_Write_Report.svg';
import RT_Record_Report from './icons/rt/RT_Record_Report.svg';
import RT_Send_Report_PACS from './icons/rt/RT_Send_Report_PACS.svg';
import RT_Print_Report from './icons/rt/RT_Print_Report.svg';
import RT_Export from './icons/rt/RT_Export.svg';
import RT_Burn_CD from './icons/rt/RT_Burn_CD.svg';
import RT_Print_Add from './icons/rt/RT_Print_Add.svg';
import RT_Print_Clear from './icons/rt/RT_Print_Clear.svg';
import RT_Print from './icons/rt/RT_Print.svg';

/* ADICIONADOS */


const ICONS = {
  user,
  sort,
  th,
  star,
  'sort-up': sortUp,
  'sort-down': sortDown,
  info,
  cube,
  crosshairs,
  'dot-circle': dotCircle,
  'angle-left': angleLeft,
  '3d-rotate': d3Rotate,
  plus,
  'chevron-down': chevronDown,
  'angle-double-down': angleDoubleDown,
  'angle-double-up': angleDoubleUp,
  'arrows-alt-h': arrowsAltH,
  'arrows-alt-v': arrowsAltV,
  bars,
  'caret-down': caretDown,
  'caret-up': caretUp,
  'check-circle-o': checkCircleO,
  check,
  circle,
  'circle-o': circleO,
  times,
  'create-comment': createComment,
  'create-screen-capture': createScreenCapture,
  edit,
  'fast-backward': fastBackward,
  'fast-forward': fastForward,
  'object-group': objectGroup,
  search,
  'power-off': powerOff,
  'inline-edit': inlineEdit,
  list,
  'ohif-logo': ohifLogo,
  lock,
  play,
  database,
  cog,
  'circle-notch': circleNotch,
  'square-o': squareO,
  'check-circle': checkCircle,
  'lock-alt': lockAlt,
  'step-backward': stepBackward,
  'step-forward': stepForward,
  stop,
  'th-large': thLarge,
  'th-list': thList,
  sun,
  palette,
  youtube,
  oval,
  'ellipse-h': ellipseH,
  'ellipse-v': ellipseV,
  adjust,
  level,
  'link-circles': linkCircles,
  'search-plus': searchPlus,
  'measure-non-target': measureNonTarget,
  'measure-target': measureTarget,
  'measure-target-cr': measureTargetCr,
  'measure-target-un': measureTargetUn,
  'measure-target-ne': measureTargetNe,
  'measure-temp': measureTemp,
  'ellipse-circle': ellipseCircle,
  arrows,
  reset,
  rotate,
  'rotate-right': rotateRight,
  trash,
  'exclamation-circle': exclamationCircle,
  link,
  'exclamation-triangle': exclamationTriangle,
  brain,
  'soft-tissue': softTissue,
  lung,
  liver,
  'RT_Windowing': RT_Windowing,
  'RT_Navigation': RT_Navigation,
  'RT_Pan': RT_Pan,
  'RT_Zoom': RT_Zoom,
  'RT_Length': RT_Length,
  'RT_Measurement': RT_Measurement,
  'RT_Angle': RT_Angle,
  'RT_EllipticalRoi': RT_EllipticalRoi,
  'RT_RectangleRoi': RT_RectangleRoi,
//'RT_DragProbe': RT_DragProbe,
  'RT_Cine': RT_Cine,
  'RT_Layout': RT_Layout,
  'RT_Default_Layouts': RT_Default_Layouts,
  'RT_Default_Layout_1': RT_Default_Layout_1,
  'RT_Default_Layout_2': RT_Default_Layout_2,
  'RT_Default_Layout_3': RT_Default_Layout_3,
  'RT_Default_Layout_4': RT_Default_Layout_4,
  'RT_Default_Layout_5': RT_Default_Layout_5,
  'RT_Default_Layout_6': RT_Default_Layout_6,
  'RT_Default_Layout_7': RT_Default_Layout_7,
  'RT_Default_Layout_8': RT_Default_Layout_8,
  'RT_Default_Layout_9': RT_Default_Layout_9,
  'RT_RotateRight': RT_RotateRight,
  'RT_FlipH': RT_FlipH,
  'RT_FlipV': RT_FlipV,
  'RT_Sort': RT_Sort,
  'RT_Reset': RT_Reset,
  'RT_CM': RT_CM,
  'RT_PX': RT_PX,
  'RT_Info': RT_Info,
  'RT_Magnify': RT_Magnify,
  'RT_WwwcRegion': RT_WwwcRegion,
  'RT_Invert': RT_Invert,
  'RT_MPR': RT_MPR,
  'RT_Generate_Series': RT_Generate_Series,
  'RT_Fusion': RT_Fusion,
  'RT_RAM': RT_RAM,
  'RT_Filters': RT_Filters,
  'RT_3D': RT_3D,
  'RT_Annotations': RT_Annotations,
  'RT_Erase_Annotations': RT_Erase_Annotations,
  'RT_Write_Report': RT_Write_Report,
  'RT_Record_Report': RT_Record_Report,
  'RT_Send_Report_PACS': RT_Send_Report_PACS,
  'RT_Print_Report': RT_Print_Report,
  'RT_Export': RT_Export,
  'RT_Burn_CD': RT_Burn_CD,
  'RT_Print_Add':RT_Print_Add,
  'RT_Print_Clear':RT_Print_Clear,
  'RT_Print':RT_Print,


};

/**
 * Return the matching SVG Icon as a React Component.
 * Results in an inlined SVG Element. If there's no match,
 * return `null`
 */
export default function getIcon(key, props) {
  if (!key || !ICONS[key]) {
    return React.createElement('div', null, 'Missing Icon');
  }

  return React.createElement(ICONS[key], props);
}

export { ICONS };
