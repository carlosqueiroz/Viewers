import { LayoutButton } from '@ohif/ui';
import OHIF from '@ohif/core';
import { connect } from 'react-redux';

const { setLayout } = OHIF.redux.actions;

const mapStateToProps = state => {
  return {
    currentLayout: state.viewports.layout,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO: Change if layout switched becomes more complex
    onChange: selectedCell => {
      let viewports = [];

      // viewports.push({
      //   top: 0,
      //   left: 0,
      //   height: '50%',
      //   width: '50%'
      // });
      // viewports.push({
      //   top: '50%',
      //   left: 0,
      //   height: '50%',
      //   width: '50%'
      // });
      // viewports.push({
      //   top: 0,
      //   left: '50%',
      //   height: '100%',
      //   width: '50%'
      // });

      // Versão usando position absolute
      const rows = selectedCell.row + 1;
      const columns = selectedCell.col + 1;
      const numViewports = rows * columns;
      for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
          const top = r * (100 / rows);
          const left = c * (100 / columns);
          viewports.push({
            top: top === 0 ? top : `${top}%`,
            left: left === 0 ? left : `${left}%`,
            height: `${100 / rows}%`,
            width: `${100 / columns}%`,
          });
        }
      }

      // Versão usando grid
      // const rows = selectedCell.row + 1;
      // const columns = selectedCell.col + 1;
      // const numViewports = rows * columns;
      // for(let r = 0; r < rows; r++) {
      //   for(let c = 0; c < columns; c++) {
      //     viewports.push({
      //       gridRow: r + 1,
      //       gridColumn: c + 1
      //     });
      //   }
      // }

      // Versão original usando %
      // const rows = selectedCell.row + 1;
      // const columns = selectedCell.col + 1;
      // const numViewports = rows * columns;
      // for (let i = 0; i < numViewports; i++) {
      //   viewports.push({
      //     height: `${100 / rows}%`,
      //     width: `${100 / columns}%`,
      //   });
      // }

      const layout = {
        viewports,
      };

      dispatch(setLayout(layout));
    },
  };
};

const ConnectedLayoutButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutButton);

export default ConnectedLayoutButton;
