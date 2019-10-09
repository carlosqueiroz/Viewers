import React from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash.foreach';

import './styles.css';
import GraphOverlay from './GraphOverlay';

class Graph extends React.Component {
	constructor(props) {
		super(props);

    this.observer = null;
    this.mutationsTimeout = null;

    const id = props.suffixId || new Date().getTime().toString(36);
		this.state = {
			graph: null,
      graphId: `g_${id}`,
      legendId: `l_${id}`,
      overlayId: `o_${id}`,
		};
	}

	componentDidMount() {
		if(this.props.data)
			setTimeout(() => {
        this.plot(this.props.data['Fase 1'])
      }, 0);
	}

	componentDidUpdate(prevProps) {
		if(prevProps.data !== this.props.data) {
      if(this.state.graph) {
        this.removeEvents();
        this.state.graph.destroy();
      }
			setTimeout(() => {
        this.plot(this.props.data['Fase 1'])
      }, 0);
    }
	}

	plot = (data) => {
    data.options.legendFormatter = this.legendFormatter;
    data.options.underlayCallback = this.updateGraph;
    data.options.labelsDiv = this.state.legendId;
    data.options.highlightCallback = this.onHighlight;

		var start = new Date();
    const graph = new window.Dygraph(
      document.getElementById(this.state.graphId),
      data.data,
      data.options
    );
    var end = new Date();

    this.setState({
    	graph
    });
    this.addEvents();

    console.log('Grafico criado em ' + (end - start) + 'ms');
	}

  onHighlight = (event, x, points, row, seriesName) => {
    // console.log(event);
    const el = document.getElementById(this.state.overlayId);
    if(el) {
      const {display} = el.style;
      if(!display || display === 'none')
        el.style.display = 'block';
      el.style.top = (event.y - 40) + 'px';
      el.style.left = (event.x + 10) + 'px';
    }
  }

  getColorBrightness = color => {
    // https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
    let r, g, b, rgb;
    if(color.indexOf('rgb') === 0) {
      rgb = color.match(/\d+/g);
      r = rgb[0];
      g = rgb[1];
      b = rgb[2];
    } else if(color.indexOf('#') === 0) {
      let c = color.substring(1);      // strip #
      rgb = parseInt(c, 16);   // convert rrggbb to decimal
      r = (rgb >> 16) & 0xff;  // extract red
      g = (rgb >>  8) & 0xff;  // extract green
      b = (rgb >>  0) & 0xff;  // extract blue
    }

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

	legendFormatter = data => {
    // console.log(data.series);
    let html = '';
    let overlayHtml = '';
    let color = '#9c9';

    let xVal = +data.xHTML;
    if (Number.isNaN(xVal)) xVal = data.xHTML;
    else xVal = xVal.toFixed(2);
    xVal += " " + this.props.dose_unit;

    overlayHtml += data.dygraph.getLabels()[0] + ": " + xVal;
    overlayHtml += '<br/>';
    data.series.forEach((series, i) => {
      let labelHTML = series.labelHTML;
      if(series.isHighlighted)
        labelHTML = '<b>' + labelHTML + '</b>';
      html += '<span data-id="'+i+'" data-visible="'+series.isVisible+'">' +
                series.dashHTML+" "+labelHTML+
              '</span>';

      if (series.isHighlighted) {
        overlayHtml += series.labelHTML + ": " +
          series.yHTML + " " + this.props.vol_unit;
        color = series.color;
      }
    });
    const el = document.getElementById(this.state.overlayId);
    if(el) {
      el.innerHTML = overlayHtml;
      el.style.background = color;

      const brightness = this.getColorBrightness(color);
      // console.log('brightness', brightness);
      if(brightness < 100) {
        el.style.color = 'white';
      } else {
        el.style.color = 'black';
      }
    }

    return html;
  }

  updateGraph = (context) => {
    // console.log('update graph');
  }

  setGraphVisibility = (id, val) => {
    if(!this.state.graph) return;
    val = !val ? false : true;
    this.state.graph.setVisibility(id, val);
  }

  onLegendClick = (e) => {
    const {target} = e;
    const {graph} = this.state;

    const id = target.dataset.id;
    const visibility = graph.visibility();

    this.setGraphVisibility(id, !visibility[id]);
    graph.updateOptions({});
  }

  onMouseLeaveGraph = (e) => {
    const el = document.getElementById(this.state.overlayId);
    el.style.display = 'none';
  }

  addEvents = () => {
    const { graphId, legendId } = this.state;

    let el = document.getElementById(legendId);
    el.addEventListener('click', this.onLegendClick);

    el = document.querySelector(`#${graphId} > div`);
    el.addEventListener('mouseleave', this.onMouseLeaveGraph);

    this.observer = new MutationObserver((mutations) => {
      // console.log('mutations init');
      if(this.state.graph) {
        if(this.mutationsTimeout)
          clearTimeout(this.mutationsTimeout);

        this.mutationsTimeout = setTimeout(() => {
          // console.log('mutations end');
          this.state.graph.resize();
          this.mutationsTimeout = null;
        }, 100);
      }
    });

    let target = document.querySelector('.LayoutManager');
    this.observer.observe(target, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    target = document.querySelectorAll('.FlexboxLayout .sidepanel')
    this.observer.observe(target[0], {
      attributes: true,
      childList: true,
    });
    this.observer.observe(target[1], {
      attributes: true,
      childList: true,
    });
  }

  removeEvents = () => {
    const { graphId, legendId } = this.state;

    let el = document.getElementById(legendId);
    el.removeEventListener('click', this.onLegendClick);

    el = document.querySelector(`#${graphId} > div`);
    el.removeEventListener('mouseleave', this.onMouseLeaveGraph);

    if(this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

	render() {
    const {graphId, legendId, overlayId} = this.state;
		return (
			<React.Fragment>
			  <div className="graph_container" id={graphId}></div>
        <div className="legend_container" id={legendId}></div>
        <GraphOverlay>
          <div className="legend_overlay" id={overlayId}></div>
        </GraphOverlay>
			</React.Fragment>
		);
	}
};

Graph.propTypes = {
  data: PropTypes.shape({
    'Fase 1': PropTypes.shape({
      data: PropTypes.array,
      options: PropTypes.object
    })
  }),
  dose_unit: PropTypes.string,
  vol_unit: PropTypes.string,
  suffixId: PropTypes.string,
};

export default Graph;