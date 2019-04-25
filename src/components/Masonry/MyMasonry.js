import React from 'react';
import { List } from 'immutable';
import { CellMeasurer, CellMeasurerCache, createMasonryCellPositioner, Masonry, AutoSizer, WindowScroller } from 'react-virtualized';
import styled from 'styled-components';
class MyMasonry extends React.PureComponent {
  // static contextTypes = {
  //   list: PropTypes.instanceOf(Immutable.List).isRequired,
  // };
  static defaultProps = {
    dataSet: List([])
  }

  constructor(props, context) {
    super(props, context);
    console.log('masonry',this.props);
    this._columnCount = 0;

    this._cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 200,
      fixedWidth: true,
    });

    this.state = {
      columnWidth: 200,
      height: 300,
      gutterSize: 10,
      overscanByPixels: 0,
      windowScrollerEnabled: false,
    };

    this._cellRenderer = this._cellRenderer.bind(this);
    this._onResize = this._onResize.bind(this);
    this._renderAutoSizer = this._renderAutoSizer.bind(this);
    this._renderMasonry = this._renderMasonry.bind(this);
    this._setMasonryRef = this._setMasonryRef.bind(this);

  }

  render() {
    const {columnWidth, height, gutterSize, overscanByPixels, windowScrollerEnabled} = this.state;
    // const {dataSet} = this.props;
    let child;

    if( windowScrollerEnabled ) {
      child = (
        <WindowScroller overscanByPixels={overscanByPixels}>
          {this._renderAutoSizer}
        </WindowScroller>
      );
    } else {
      child = this._renderAutoSizer({height});
    }
    console.log('render', this)
    return (
      <div>
        <input 
        type="checkbox"
        checked={windowScrollerEnabled} 
        onChange={event => {
          this._cache.clearAll();
          this.setState({windowScrollerEnabled: event.target.checked});
        }}/>
        use windowScrollerEnabled?

        <button onClick={this._resetList}>Reset List Data</button>
        {child}
      </div>
    )
  }

  _calculateColumnCount() {
    const {columnWidth, gutterSize} = this.state;

    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
  }

  _cellRenderer({index, key, parent, style}) {
    // const {list} = this.context;
    const list = this.props.dataSet;
    // 데이터
    const {columnWidth} = this.state;
    const CellWrapper = styled.div`
      display: flex;
      flex-direction: column;
      border-radius: .5rem;
      padding: 0.5rem;
      background-color: #f7f7f7;
      word-break: break-all;
    `;
    // const datum = list.get(index % list.size);
    const datum = list[index];
    console.log('datum', datum, index);
    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        <CellWrapper
          style={{
            ...style,
            width: columnWidth,
          }}>
          <div
            style={{
              backgroundColor: datum.color,
              borderRadius: '0.5rem',
              height: datum.size * 3,
              marginBottom: '0.5rem',
              width: '100%',
              fontSize: 20,
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {index}
          </div>
          {datum.random}
        </CellWrapper>
      </CellMeasurer>
    );
  }

  _initCellPositioner() {
    if (typeof this._cellPositioner === 'undefined') {
      const {columnWidth, gutterSize} = this.state;

      this._cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize,
      });
    }
  }

  _onResize({width}) {
    this._width = width;

    this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.recomputeCellPositions();
  }

  _renderAutoSizer({height, scrollTop}) {
    this._height = height;
    this._scrollTop = scrollTop;

    const {overscanByPixels} = this.state;
    if(this.props.dataSet.length !== 0){

      return (
        <AutoSizer
          disableHeight
          height={height}
          onResize={this._onResize}
          overscanByPixels={overscanByPixels}
          scrollTop={this._scrollTop}>
          {this._renderMasonry}
        </AutoSizer>
      );
    }
  }

  _renderMasonry({width}){
    const {dataSet} = this.props;
    this._width = width;

    this._calculateColumnCount();
    this._initCellPositioner();

    const {height, overscanByPixels, windowScrollerEnabled} = this.state;

    return (
      <Masonry
        autoHeight={windowScrollerEnabled}
        cellCount={dataSet.length}
        cellMeasurerCache={this._cache}
        cellPositioner={this._cellPositioner}
        cellRenderer={this._cellRenderer}
        height={windowScrollerEnabled ? this._height : height}
        overscanByPixels={overscanByPixels}
        ref={this._setMasonryRef}
        scrollTop={this._scrollTop}
        width={width}
      />
    );
  }

  _resetList = () => {
    // const ROW_HEIGHTS = [25, 50, 75, 100];

    // const {list} = this.context;
    // list.forEach(datum => {
    //   datum.size = ROW_HEIGHTS[Math.floor(Math.random() * ROW_HEIGHTS.length)];
    // });

    console.log('resetList',this.props.masonryListPlus)
    this.props.masonryListPlus();
    console.log('after',this.props.dataSet)
    // this.props.dataSet = this.props.dataSet.concat(this.props.dataSet)
    this._cache.clearAll();
    this._resetCellPositioner();
    this._masonry.clearCellPositions();
  };

  _resetCellPositioner() {
    const {columnWidth, gutterSize} = this.state;

    this._cellPositioner.reset({
      columnCount: this._columnCount,
      columnWidth,
      spacer: gutterSize,
    });
  }

  _setMasonryRef(ref) {
    this._masonry = ref;
  }
}



export default MyMasonry;