import { api } from 'dicomweb-client';
import DICOMWeb from '../../../DICOMWeb/';

class MyDICOMWebClient extends api.DICOMwebClient {
  constructor(options) {
    super(options);
  }

  searchForPatients(options = {}) {
    console.log("search for patients");
    let url = `${this.qidoURL}/patients`;
    if ("queryParams" in options) {
      url += api.DICOMwebClient._parseQueryParameters(options.queryParams);
    }
    return this._httpGetApplicationJson(url);
  }
};

/**
 * Creates a QIDO date string for a date range query
 * Assumes the year is positive, at most 4 digits long.
 *
 * @param date The Date object to be formatted
 * @returns {string} The formatted date string
 */
function dateToString(date) {
  if (!date) return '';
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  year = '0'.repeat(4 - year.length).concat(year);
  month = '0'.repeat(2 - month.length).concat(month);
  day = '0'.repeat(2 - day.length).concat(day);
  return ''.concat(year, month, day);
}

/**
 * Produces a QIDO URL given server details and a set of specified search filter
 * items
 *
 * @param filter
 * @param serverSupportsQIDOIncludeField
 * @returns {string} The URL with encoded filter query data
 */
function getQIDOQueryParams(filter, serverSupportsQIDOIncludeField) {
  const commaSeparatedFields = [
    'PatientID',
    // Add more fields here if you want them in the result
  ].join(',');

  const parameters = {
    PatientName: filter.patientName,
    PatientID: filter.patientId,
    AccessionNumber: filter.accessionNumber,
    StudyDescription: filter.studyDescription,
    ModalitiesInStudy: filter.modalitiesInStudy,
    limit: filter.limit,
    offset: filter.offset,
    fuzzymatching: filter.fuzzymatching,
    includefield: serverSupportsQIDOIncludeField ? commaSeparatedFields : 'all',
  };

  // build the StudyDate range parameter
  if (filter.studyDateFrom || filter.studyDateTo) {
    const dateFrom = dateToString(new Date(filter.studyDateFrom));
    const dateTo = dateToString(new Date(filter.studyDateTo));
    parameters.StudyDate = `${dateFrom}-${dateTo}`;
  }

  // Build the StudyInstanceUID parameter
  if (filter.studyInstanceUid) {
    let studyUids = filter.studyInstanceUid;
    studyUids = Array.isArray(studyUids) ? studyUids.join() : studyUids;
    studyUids = studyUids.replace(/[^0-9.]+/g, '\\');
    parameters.StudyInstanceUID = studyUids;
  }

  // Clean query params of undefined values.
  const params = {};
  Object.keys(parameters).forEach(key => {
    if (parameters[key] !== undefined && parameters[key] !== '') {
      params[key] = parameters[key];
    }
  });

  return params;
}

/**
 * Parses resulting data from a QIDO call into a set of Study MetaData
 *
 * @param resultData
 * @returns {Array} An array of Study MetaData objects
 */
function resultDataToPatients(resultData) {
  const studies = [];

  if (!resultData || !resultData.length) return;

  resultData.forEach(study =>
    studies.push({
      patientName: DICOMWeb.getName(study['00100010']),
      patientId: DICOMWeb.getString(study['00100020']),
      patientBirthdate: DICOMWeb.getString(study['00100030']),
      patientSex: DICOMWeb.getString(study['00100040']),
    })
  );

  return studies;
}

export default function Patients(server, filter) {
  const config = {
    url: server.qidoRoot,
    headers: DICOMWeb.getAuthorizationHeader(server),
  };

  const dicomWeb = new MyDICOMWebClient(config);
  server.qidoSupportsIncludeField =
    server.qidoSupportsIncludeField === undefined
      ? true
      : server.qidoSupportsIncludeField;
  const queryParams = getQIDOQueryParams(
    filter,
    server.qidoSupportsIncludeField
  );
  const options = {
    queryParams,
  };

  // let url = `${config.url}/patients`;
  // url += api.DICOMwebClient._parseQueryParameters(queryParams);

  // return fetch(url, { headers: config.headers })
  //   .then(r => r.json())
  //   .then(resultDataToPatients);

  return dicomWeb.searchForPatients(options).then(resultDataToPatients);
}
