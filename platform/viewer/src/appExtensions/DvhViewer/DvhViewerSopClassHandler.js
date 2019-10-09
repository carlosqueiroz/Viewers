import OHIF from '@ohif/core';

const { utils } = OHIF;

// http://dicom.nema.org/dicom/2013/output/chtml/part04/sect_B.5.html
// https://www.dicomlibrary.com/dicom/modality/
const SOP_CLASS_UIDS = {
  RT_Structure_Set_Storage: '1.2.840.10008.5.1.4.1.1.481.3',
  RT_Dose_Storage: '1.2.840.10008.5.1.4.1.1.481.2',
  // RT_Plan_Storage: '1.2.840.10008.5.1.4.1.1.481.5',
};
const sopClassUids = Object.values(SOP_CLASS_UIDS);

const DicomRTDoseSopClassHandler = {
  id: 'DvhViewerSopClassHandlerPlugin',
  sopClassUids,
  getDisplaySetFromSeries(series, study, dicomWebClient) {
    const instance = series.getFirstInstance();

    return {
      plugin: 'dvh-viewer-extension',
      modality: series.getDataProperty('modality'),
      displayName: 'DVH',
      displaySetInstanceUid: utils.guid(),
      dicomWebClient,
      sopInstanceUid: instance.getSOPInstanceUID(),
      seriesInstanceUid: series.getSeriesInstanceUID(),
      studyInstanceUid: study.getStudyInstanceUID(),
    };
  },
};

export default DicomRTDoseSopClassHandler;
