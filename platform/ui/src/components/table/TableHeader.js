import React from 'react';
import PropTypes from 'prop-types';
import { isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';

import CustomDateRangePicker from './CustomDateRangePicker.js';
import { Icon } from './../../elements/Icon';

const today = moment();
const lastWeek = moment().subtract(7, 'day');
const lastMonth = moment().subtract(1, 'month');

class TableHeader extends React.Component {
  static INPUT_TYPES = {
    NONE: 'none',
    TEXT: 'text',
    DATE_RANGE: 'date-range',
  };

  static datePresets = [
    {
      text: 'Today',
      start: today,
      end: today,
    },
    {
      text: 'Last 7 days',
      start: lastWeek,
      end: today,
    },
    {
      text: 'Last 30 days',
      start: lastMonth,
      end: today,
    },
  ];

  sortIcons = {
    default: 'sort',
    asc: 'sort-up',
    desc: 'sort-down',
  };

  state = {
    focusedInput: null,
  };

  onInputKeydown = async event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      if (this.props.onSearch) this.props.onSearch();
    }
  };

  getChangeHandler = field => {
    return event => {
      if (this.props.onSearch)
        this.props.onSearch({ field, value: event.target.value });
    };
  };

  getBlurHandler = field => {
    return event => {
      if (this.props.onSearch)
        this.props.onSearch({ field, value: event.target.value });
    };
  };

  onSortClick = field => {
    return () => {
      if (this.props.onSort) this.props.onSort(field);
    };
  };

  isOutsideRange = day => !isInclusivelyBeforeDay(day, moment());

  onDatesChange = ({ startDate, endDate, preset = false }) => {
    if (
      startDate &&
      endDate &&
      (this.state.focusedInput === 'endDate' || preset)
    ) {
      if (this.props.onSearch)
        this.props.onSearch({
          dateFrom: startDate.toDate(),
          dateTo: endDate.toDate(),
        });
      this.setState({ focusedInput: null });
    } else if (!startDate && !endDate) {
      if (this.props.onSearch)
        this.props.onSearch({
          dateFrom: null,
          dateTo: null,
        });
    }
  };

  onFocusChange = focusedInput => {
    this.setState({ focusedInput });
  };

  renderCell = ({
    field,
    title,
    inputType = TableHeader.INPUT_TYPES.TEXT,
    canSort = !!title,
  }) => {
    const { searchData } = this.props;

    let sortIcon = canSort ? this.sortIcons.default : null;
    if (canSort && searchData.sortData.field === field) {
      sortIcon =
        this.sortIcons[searchData.sortData.order] || this.sortIcons.default;
    }
    return (
      <th key={field} className={field}>
        <div
          className={`display-text ${!canSort ? 'default-cursor' : ''}`}
          onClick={canSort ? this.onSortClick(field) : null}
        >
          {title}
          {sortIcon !== null ? (
            <Icon name={sortIcon} style={styles.sortIcon} />
          ) : null}
        </div>
        {inputType === TableHeader.INPUT_TYPES.TEXT && (
          <input
            type="text"
            className="form-control table-header-search"
            id={`table_header_${field}`}
            // value={this.props.searchData[field]}
            onKeyDown={this.onInputKeydown}
            onChange={this.getChangeHandler(field)}
            onBlur={this.getBlurHandler(field)}
          />
        )}
        {inputType === TableHeader.INPUT_TYPES.DATE_RANGE && (
          <div style={styles.dateRangeDiv}>
            <CustomDateRangePicker
              presets={TableHeader.datePresets}
              showClearDates={true}
              startDateId="startDate"
              endDateId="endDate"
              startDate={this.defaultStartDate}
              endDate={this.defaultEndDate}
              hideKeyboardShortcutsPanel={true}
              anchorDirection="left"
              isOutsideRange={this.isOutsideRange}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.focusedInput}
              onFocusChange={this.onFocusChange}
            />
          </div>
        )}
      </th>
    );
  };

  render() {
    return (
      <thead>
        <tr>{this.props.renderHeader(this.renderCell)}</tr>
      </thead>
    );
  }
}

const styles = {
  sortIcon: { fontSize: '12px' },
  dateRangeDiv: { display: 'block' },
};

TableHeader.propTypes = {
  renderHeader: PropTypes.func.isRequired,
  searchData: PropTypes.shape({
    sortData: PropTypes.shape({
      field: PropTypes.string,
      order: PropTypes.oneOf(['desc', 'asc']),
    }),
  }).isRequired,
  defaultStartDate: PropTypes.object,
  defaultEndDate: PropTypes.object,
  onSearch: PropTypes.func,
  onSort: PropTypes.func,
};

export const INPUT_TYPES = TableHeader.INPUT_TYPES;
export default TableHeader;
