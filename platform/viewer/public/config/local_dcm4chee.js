window.config = {
  // default: '/'
  routerBasename: '/',
  // default: ''
  relativeWebWorkerScriptsPath: 'assets/viewer/',
  showStudyList: true,
  servers: {
    dicomWeb: [
      {
        name: 'DCM4CHEE',
        wadoUriRoot: 'https://192.168.0.95/dcm4chee-arc/aets/DCM4CHEE/wado',
        qidoRoot: 'https://192.168.0.95/dcm4chee-arc/aets/DCM4CHEE/rs',
        wadoRoot: 'https://192.168.0.95/dcm4chee-arc/aets/DCM4CHEE/rs',
        qidoSupportsIncludeField: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        requestOptions: {
          requestFromBrowser: true,
          auth: 'admin:admin',
        },
      },
    ],
  },
  studyListFunctionsEnabled: true,
}
