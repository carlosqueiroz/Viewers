import React from 'react';
import PropTypes from 'prop-types';

class TableBody extends React.Component {
  state = {
    highlightedRow: null,
  };

  onHighlightRow(id) {
    this.setState({ highlightedRow: id });
  }

  getRowClickHandler = id => () => {
    this.onHighlightRow(id);
    if (this.props.onSelectRow) this.props.onSelectRow(id);
  };

  TableRow = ({ id, children }) => {
    return (
      <tr
        className={
          this.state.highlightedRow === id
            ? 'table-row noselect active'
            : 'table-row noselect'
        }
        onClick={this.getRowClickHandler(id)}
      >
        {children}
      </tr>
    );
  };

  render() {
    return <tbody>{this.props.renderBody(this.TableRow)}</tbody>;
  }
}

TableBody.propTypes = {
  renderBody: PropTypes.func.isRequired,
  onSelectRow: PropTypes.func,
};

export default TableBody;
