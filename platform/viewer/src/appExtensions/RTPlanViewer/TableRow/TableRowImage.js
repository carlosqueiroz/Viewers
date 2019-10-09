import React from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash.foreach';

class TableRowImage extends React.Component {
  renderData() {
    const { title, data, colorsObj, shouldShowCol } = this.props;
    const ret = [];
    const { hostname } = window.location;
    const baseurl = `https://${hostname}`;

    forEach(data, (val, key) => {
      if (!shouldShowCol || shouldShowCol(key))
        ret.push(
          <td key={`${title}_${key}`} className={colorsObj[key]}>
            <img src={`${baseurl}${val}`} alt={title} />
          </td>
        );
    });

    return ret;
  }

  render() {
    const { title, dataKey, data } = this.props;
    if (!data) return null;
    return (
      <tr>
        <th className="border-th" data-key={dataKey}>
          {title}
        </th>
        {this.renderData()}
      </tr>
    );
  }
}

TableRowImage.propTypes = {
  title: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  data: PropTypes.object,
  colorsObj: PropTypes.object.isRequired,
  shouldShowCol: PropTypes.func,
};

export default TableRowImage;
