import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import { utils } from '@ohif/core';

import forEach from 'lodash.foreach';

import dose_test from './dose_test.json';

const BaseAnnotationTool = cornerstoneTools.import('base/BaseAnnotationTool');

export default class DrawDoseTool extends BaseAnnotationTool {
  constructor(props = {}) {
    const defaultProps = {
      name: 'DrawDoseTool',
      supportedInteractionTypes: [],
      configuration: {},
      // svgCursor: ellipticalRoiCursor,
    };

    super(props, defaultProps);

    this.id = new Date().getTime().toString(36) + Math.random().toString(36);

    this.state = {
      element: null,
    };

    this.images = {};
  }

  activeCallback(element, options) {
    // console.log('DrawDoseTool:activeCallback', this.id);
    this.images = {};
  }

  renderToolData(evt) {
    // console.log(evt);
    this.state.element = evt.target;

    const element = evt.target;
    const ctx = evt.detail.canvasContext;
    const img = evt.detail.image;

    const {
      currentImageIdIndex: imgIdx,
      studyInstanceUid,
      displaySetInstanceUid,
    } = this.getStackData();
    if (!studyInstanceUid || !imgIdx) return;

    let currentImg = this.images[imgIdx];
    if (!currentImg) {
      this.images[imgIdx] = {
        image: new Image(),
        loading: true,
      };
      currentImg = this.images[imgIdx];

      currentImg.image.onload = () => {
        const stackData = cornerstoneTools.getToolState(element, 'stack');
        if (!stackData || !stackData.data || !stackData.data.length) return;
        const { currentImageIdIndex } = stackData.data[0];

        currentImg.loading = false;
        if (currentImageIdIndex === imgIdx) cornerstone.updateImage(element);
      };
      currentImg.image.onerror = evt => {
        evt.preventDefault();
        evt.stopPropagation();
        currentImg.image = null;
        currentImg.loading = false;
        return false;
      };
      let src = `http://192.168.0.95:5000/imgs/pacs_1/fig_${imgIdx}.png`;
      if (
        studyInstanceUid ===
        '1.2.840.113729.1.709.11664.2018.11.21.17.9.7.379.2582'
      )
        src = `http://192.168.0.95:5000/imgs/pacs_2/fig_${imgIdx}.png`;

      currentImg.image.src = src;
    } else if (
      !this.images[imgIdx].loading &&
      this.images[imgIdx].image !== null
    ) {
      const currentWidth =
        currentImg.image.width + (window.imgOffsetWidth || 0);
      const currentHeight =
        currentImg.image.height + (window.imgOffsetHeight || 0);

      const { studyMetadataManager } = utils;
      const metadata = studyMetadataManager.get(studyInstanceUid);
      const series = metadata.getSeries();

      let displaySet;
      forEach(metadata.getDisplaySets(), d => {
        if (d.displaySetInstanceUid === displaySetInstanceUid) displaySet = d;
      });

      if (!displaySet || displaySet.modality !== 'CT') return;

      const { seriesInstanceUid } = displaySet;

      let ctPos = null;
      let ctPixelSpacing = null;
      let dosePos = null;
      forEach(series, serie => {
        const modality = serie.getDataProperty('modality');
        const seriesUid = serie.getDataProperty('seriesInstanceUid');
        if (modality === 'CT' && seriesInstanceUid === seriesUid) {
          ctPos = serie
            .getInstanceByIndex(imgIdx)
            .getDataProperty('imagePositionPatient')
            .split('\\');
          ctPixelSpacing = serie
            .getInstanceByIndex(imgIdx)
            .getDataProperty('pixelSpacing')
            .split('\\');
        } else if (modality === 'RTDOSE') {
          dosePos = serie
            .getFirstInstance()
            .getDataProperty('imagePositionPatient')
            .split('\\');
        }
      });

      //let x = img.width - currentWidth + (window.imgOffsetX || -10);
      //let y = img.height - currentHeight + (window.imgOffsetY || 50);
      // let x = (img.width - currentWidth) / 2;
      // let y = (img.height - currentHeight) / 2;
      let x =
        Math.abs(Math.abs(ctPos[0]) - Math.abs(dosePos[0])) /
          ctPixelSpacing[1] +
        (window.imgOffsetX || 0);
      let y =
        Math.abs(Math.abs(ctPos[1]) - Math.abs(dosePos[1])) /
          ctPixelSpacing[0] +
        (window.imgOffsetY || 0);

      console.log(
        'CT.width',
        img.width,
        '| CT.height',
        img.height,
        '| DOSE.width',
        currentImg.image.width,
        '| DOSE.height',
        currentImg.image.height,
        '| X',
        x,
        '| Y',
        y,
        '| X/2',
        x / 2,
        '| Y/2',
        y / 2,
        '| ctPos',
        ctPos,
        '| dosePos',
        dosePos,
        '| ctPixelSpacing',
        ctPixelSpacing
      );

      ctx.save();
      ctx.globalAlpha = 0.5;
      // ctx.drawImage(currentImg.image, x / 2, y / 2, currentImg.image.width, currentImg.image.height);
      ctx.drawImage(currentImg.image, x, y, currentWidth, currentHeight);
      ctx.restore();

      // Desenha linhas no meio do CT
      // ctx.beginPath();
      // ctx.strokeStyle = 'white';
      // ctx.lineWidth = 2;

      // ctx.moveTo(0, img.height / 2);
      // ctx.lineTo(img.width, img.height / 2);
      // ctx.moveTo(img.width / 2, 0);
      // ctx.lineTo(img.width / 2, img.height);
      // ctx.stroke();

      // const midHeight = img.height / 2;
      // for (let i = 0; i < img.width; i += 25) {
      //   ctx.moveTo(i, midHeight + 10);
      //   ctx.lineTo(i, midHeight - 10);
      // }
      // ctx.stroke();

      // Desenha linhas em volta da DOSE
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 0.5;

      // acima e abaixo
      ctx.moveTo(x, y);
      ctx.lineTo(x + currentWidth, y);
      ctx.moveTo(x, y + currentHeight);
      ctx.lineTo(x + currentWidth, y + currentHeight);
      ctx.stroke();

      // esquerda e direita
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + currentHeight);
      ctx.moveTo(x + currentWidth, y);
      ctx.lineTo(x + currentWidth, y + currentHeight);
      ctx.stroke();

      // Desenha linhas em volta do CT
      ctx.beginPath();
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;

      // acima e abaixo
      ctx.moveTo(0, 0);
      ctx.lineTo(img.width, 0);
      ctx.moveTo(0, img.height);
      ctx.lineTo(img.width, img.height);
      ctx.stroke();

      // esquerda e direita
      ctx.moveTo(0, 0);
      ctx.lineTo(0, img.height);
      ctx.moveTo(0 + img.width, 0);
      ctx.lineTo(0 + img.width, img.height);
      ctx.stroke();
    }
  }

  getStackData = () => {
    try {
      if (!this.state.element) return {};

      const stackData = cornerstoneTools.getToolState(
        this.state.element,
        'stack'
      );

      if (!stackData || !stackData.data || !stackData.data.length) return {};
      else return stackData.data[0];
    } catch (e) {
      console.warn('getStackData: ', e);
      return {};
    }
  };
}
