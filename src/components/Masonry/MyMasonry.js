import React, {Component} from 'react';
import { CellMeasurer, CellMeasurerCache, createMasonryCellPositioner, Masonry, AutoSizer, WindowScroller } from 'react-virtualized';
import styled from 'styled-components';
import ImageMeasurer from 'react-virtualized-image-measurer';
import MasonryItem from './MasonryItem';

class MyMasonry extends Component {

  constructor(props) {
    super(props);
    this._columnCount = 3;
    this._columnWidth = 270;
    this._defaultWidth = this._columnWidth;
    this._defaultHeight = 250;
    this._spacer = 0;

    this._cache = new CellMeasurerCache({
      defaultHeight: this._defaultHeight,
      defaultWidth: this._defaultWidth,
      fixedWidth: true,
    });

    this._cellPositionerConfig = {
      cellMeasurerCache: this._cache,
      columnCount: this._columnCount,
      columnWidth: this._columnWidth,
      spacer: this._spacer
    };

    this._cellPositioner = createMasonryCellPositioner(this._cellPositionerConfig);

  }

  _keyMapper = (item, index) => {
    // console.log('keymapper', item, index)

    return item.key || index;
  }

  _masonryKeyMapper = (index) => {
    // console.log('masonry keymapper', index)
    return index;
  }

  MasonryComponent = ({itemsWithSizes, setRef, width}) => {
    const cellRenderer = ({index, parent, style, key }) => {
      const { item, size } = itemsWithSizes[index];
      const height = this._columnWidth * (size.height / size.width) || this._defaultHeight;

      // console.log(item.key)
      return (
        <CellMeasurer cache={this._cache} index={index} key={item.key} parent={parent}>
        <div style={style}>
          {/* <div>{index}</div>
          <div>{item.key}</div> */}
          <MasonryItem CellHeight={height} CellWidth={this._columnWidth} item={item} num={index}/>
        </div>
        </CellMeasurer>
      )
    }

    // console.log('dddd',itemsWithSizes)
    const {height, overscanByPixels, windowScrollerEnabled} = this.props.config;
    return (
      <Masonry 
        autoHeight={true}
        cellCount={itemsWithSizes.length}
        cellMeasurerCache={this._cache}
        cellPositioner={this._cellPositioner}
        cellRenderer={cellRenderer}
        overscanByPixels={overscanByPixels}
        height={this._height}
        scrollTop={this._scrollTop}
        width={width}
        // keyMapper={this._masonryKeyMapper}
        ref={setRef}
        style={{margin: '0 auto', outline: 'none'}}
      />
    );
  }

  shorten = () => {
    // console.log('shorten', this.props.dataSet)
    this._cache.clearAll();
    this._cellPositioner.reset(this._cellPositionerConfig);
    this.masonryRef.clearCellPositions();
    this.props.getRequested();
  }

  componentDidUpdate(){
    console.log('update', this.props.dataSet)
  }

  setMasonry = node => (this.masonryRef = node);

  _onResize = ({width}) => {
    // console.log('onresize', width)
    this._calculateColumnCount(width);
    // // console.log('column', this._columnCount)
    this._resetCellPositioner();
    this.masonryRef.recomputeCellPositions();
  }

  _sizeCheck = width => {
    // console.log('width', width)
    this._calculateColumnCount(width);
    return this._calculateMarsonryWidth();
  }

  _resetCellPositioner = () => {
    // console.log('_resetCellPositioner', this._cellPositionerConfig)
    this._cellPositionerConfigSet()
    this._cellPositioner.reset(this._cellPositionerConfig);
  }

  _cellPositionerConfigSet = () => {
    this._cellPositionerConfig = {
      cellMeasurerCache: this._cache,
      columnCount: this._columnCount,
      columnWidth: this._columnWidth,
      spacer: this._spacer
    };
  }
  _calculateColumnCount = width => {
    // console.log('_calculateColumnCount');

    // const {columnWidth, gutterSize} = this.props.config;
    // this._columnCount = Math.floor(width / (columnWidth + gutterSize));

    this._columnCount = Math.floor(width / (this._columnWidth + this._spacer));
    // console.log(this._columnCount);
  }
  _calculateMarsonryWidth = () => {
    return this._columnCount * (this._columnWidth + this._spacer) - this._spacer
  }

  _renderAutoSizer = ({ height, scrollTop}) => {
    // console.log('_renderAutoSizer')
    this._height = height;
    this._scrollTop = scrollTop;
    const {overscanByPixels} = this.props.config;
    return (
      <AutoSizer 
        disableHeight
        height={height}
        onResize={this._onResize}
      >
        {({width}) => (
          this._renderImageMeasurer(this.props.dataSet, this._sizeCheck(width), width)
        )}
      </AutoSizer>
    )
  }

  _renderImageMeasurer = (items, width, fullWidth) => {
    // this._width = width;
    // console.log('_renderImageMeasurer', this._width, width)
    return (<ImageMeasurer 
      items={items}
      image={item => item.urls.small}
      keyMapper={this._keyMapper}
      onError={(error, item, src) => {
        console.error(
          "Cannot load image",
          src,
          "for item",
          item,
          "error",
          error
        );
      }}
      defaultHeight={this._defaultHeight}
      defaultWidth={this._defaultWidth}
      style={{width: fullWidth + 'px'}}
    >
      {({itemsWithSizes}) => 
        this.MasonryComponent({itemsWithSizes, setRef: this.setMasonry, width})
      }
    </ImageMeasurer>)
  }

  render() {
    const {columnWidth, height, gutterSize, overscanByPixels, windowScrollerEnabled} = this.props.config;

    let child;

    // if( windowScrollerEnabled ) {
    //   child = (
    //     <WindowScroller overscanByPixels={overscanByPixels}>
    //       {this._renderAutoSizer()}
    //     </WindowScroller>
    //   )
    // } else {
    //   child = this._renderAutoSizer();
    // }
    child = (
      <WindowScroller 
        overscanByPixels={overscanByPixels}
        isScrolling={false}
      >
        {({height, isScrolling, onChildScroll, scrollTop, width }) =>
          this._renderAutoSizer({height, isScrolling, onChildScroll, scrollTop, width })
        }
      </WindowScroller>
    )
    return (
      <div>
        <button onClick={this.shorten}>Resize</button>
        {child}
      </div>
    )
  }

  
  
}



export default MyMasonry;