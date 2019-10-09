import './Table.styl';

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import debounce from 'lodash.debounce';

import { withTranslation } from '../../utils/LanguageProvider';
import { Icon } from './../../elements/Icon';
import TableHeader from './TableHeader.js';
import TableBody from './TableBody.js';
import PaginationArea from './PaginationArea.js';

const isNull = v => v !== null && v !== undefined;

class Table extends React.Component {
  constructor(props) {
    super(props);

    const sortData = {
      field: undefined,
      order: undefined,
    };

    // init from props
    if (props.defaultSort) {
      sortData.field = props.defaultSort.field;
      // todo: -1, 0, 1?
      sortData.order = props.defaultSort.order; // asc, desc
    }

    this.defaultStartDate = moment().subtract(props.dateFilterNumDays, 'days');
    this.defaultEndDate = moment();

    this.state = {
      loading: false,
      error: false,
      searchData: {
        sortData,
        currentPage: this.props.currentPage,
        rowsPerPage: this.props.rowsPerPage,
        dateFrom: this.defaultStartDate,
        dateTo: this.defaultEndDate,
      },
      highlightedItem: '',
    };

    this.delayedSearch = debounce(this.search, 250);
  }

  setSearchData(key, value, callback) {
    const searchData = this.state.searchData;
    if (searchData[key] != value) {
      searchData[key] = value;
      this.setState({ searchData }, callback);
    }
  }

  setSearchDataBatch(keyValues, callback) {
    const searchData = this.state.searchData;
    let changed = false;

    Object.keys(keyValues).forEach(key => {
      if (searchData[key] != keyValues[key]) {
        searchData[key] = keyValues[key];
        changed = true;
      }
    });
    if (changed) this.setState({ searchData }, callback);
  }

  async search() {
    try {
      this.setState({ loading: true, error: false });
      await this.props.onSearch(this.state.searchData);
    } catch (error) {
      this.setState({ error: true });
      throw new Error(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  onSearch = ({ field, value, ...values } = {}) => {
    this.delayedSearch.cancel();
    if (field) this.setSearchData(field, value, this.delayedSearch);
    else if (Object.keys(values).length >= 1)
      this.setSearchDataBatch(values, this.delayedSearch);
    else this.setSearchData('currentPage', 1, this.search); // Press of enter
  };

  onSort = field => {
    let order;
    const sort = this.state.searchData.sortData;
    const isSortedField = sort.field === field;

    if (isSortedField) {
      if (sort.order === 'asc') {
        order = 'desc';
      } else {
        order = undefined;
        field = undefined;
      }
    } else {
      order = 'asc';
    }

    this.delayedSearch.cancel();
    this.setSearchData('sortData', { field, order }, this.search);
  };

  nextPage = currentPage => {
    currentPage = currentPage + 1;
    this.delayedSearch.cancel();
    this.setSearchData('currentPage', currentPage, this.search);
  };

  prevPage = currentPage => {
    currentPage = currentPage - 1;
    this.delayedSearch.cancel();
    this.setSearchData('currentPage', currentPage, this.search);
  };

  onRowsPerPageChange = rowsPerPage => {
    this.delayedSearch.cancel();
    this.setSearchDataBatch({ rowsPerPage, currentPage: 1 }, this.search);
  };

  renderIsLoading = () => {
    if (this.state.loading) {
      if (this.props.renderIsLoading) return this.props.renderIsLoading();
      else
        return (
          <div className="loading">
            {this.props.t('Loading')}...{' '}
            <Icon name="circle-notch" animation="pulse" />
          </div>
        );
    }
  };

  renderHasError = () => {
    if (this.state.error) {
      if (this.props.renderHasError) return this.props.renderHasError();
      else
        return (
          <div className="notFound">
            {this.props.t('ErrorWhileFetchingData')}
          </div>
        );
    }
  };

  renderNoMachingResults = () => {
    if (!this.props.data.length && !this.state.error) {
      if (this.props.renderNoMachingResults)
        return this.props.renderNoMachingResults();
      else return <div className="notFound">{this.props.t('NoResults')}</div>;
    }
  };

  render() {
    return (
      <div className="tableContainer">
        <table className={`table noselect ${this.props.className}`}>
          <TableHeader
            renderHeader={this.props.renderHeader}
            searchData={this.state.searchData}
            defaultStartDate={this.defaultStartDate}
            defaultEndDate={this.defaultEndDate}
            onSearch={this.onSearch}
            onSort={this.onSort}
          />
          <TableBody
            renderBody={this.props.renderBody}
            onSelectRow={this.props.onSelectItem}
          />
        </table>

        {this.renderIsLoading()}
        {this.renderHasError()}
        {this.renderNoMachingResults()}

        {isNull(this.props.rowsPerPage) || isNull(this.props.currentPage) ? (
          <PaginationArea
            pageOptions={this.props.pageOptions}
            currentPage={this.state.searchData.currentPage}
            nextPageFunc={this.nextPage}
            prevPageFunc={this.prevPage}
            onRowsPerPageChange={this.onRowsPerPageChange}
            rowsPerPage={this.state.searchData.rowsPerPage}
            recordCount={this.props.data.length}
          />
        ) : null}
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.array,
  renderHeader: PropTypes.func.isRequired,
  renderBody: PropTypes.func.isRequired,
  className: PropTypes.string,
  renderIsLoading: PropTypes.func,
  renderHasError: PropTypes.func,
  renderNoMachingResults: PropTypes.func,

  onSelectItem: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  rowsPerPage: PropTypes.number,
  dateFilterNumDays: PropTypes.number,
  defaultSort: PropTypes.shape({
    field: PropTypes.string.isRequired,
    order: PropTypes.oneOf(['desc', 'asc']).isRequired,
  }),
  pageOptions: PropTypes.array,
};

Table.defaultProps = {
  data: [],
  className: '',

  dateFilterNumDays: 7,
};

const connectedComponent = withTranslation('Common')(Table);
export { connectedComponent as Table };
