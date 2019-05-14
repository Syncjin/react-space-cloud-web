import React, {Component} from 'react';
import { CellMeasurer, CellMeasurerCache, createMasonryCellPositioner, Masonry, AutoSizer, WindowScroller } from 'react-virtualized';
import ImageMeasurer from 'react-virtualized-image-measurer';
import MasonryItem from './MasonryItem';

class MyMasonry extends Component {

  constructor(props) {
    super(props);
    this._columnCount = 3;
    this._columnWidth = 320;
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

  MasonryComponent = ({itemsWithSizes, setRef, width, itemLength}) => {
    const cellRenderer = ({index, parent, style, key }) => {
      const { item, size } = itemsWithSizes[index];
      const height = this._columnWidth * (size.height / size.width) || this._defaultHeight;

      return (
        <CellMeasurer cache={this._cache} index={index} key={item.key} parent={parent}>
        <div style={style}>
          <MasonryItem CellHeight={height} CellWidth={this._columnWidth} item={item} num={index} itemLength={itemLength}/>
        </div>
        </CellMeasurer>
      )
    }

    const { overscanByPixels } = this.props.config;
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
    this._columnCount = Math.floor(width / (this._columnWidth + this._spacer));
  }

  _calculateMarsonryWidth = () => {
    return this._columnCount * (this._columnWidth + this._spacer) - this._spacer
  }

  _renderAutoSizer = ({ height, scrollTop}) => {
    // console.log('_renderAutoSizer')
    this._height = height;
    this._scrollTop = scrollTop;
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
    // console.log('_renderImageMeasurer', this._width, width)
    return (<ImageMeasurer 
      items={items}
      image={item => item.urls.small}
      keyMapper={this._keyMapper}
      onError={(error, item, src) => {
        console.error("Cannot load image", src, "for item", item, "error", error);
      }}
      defaultHeight={this._defaultHeight}
      defaultWidth={this._defaultWidth}
      style={{width: fullWidth + 'px'}}
    >
      {({itemsWithSizes}) => 
        this.MasonryComponent({itemsWithSizes, setRef: this.setMasonry, width, itemLength: items.length})
      }
    </ImageMeasurer>)
  }

  render() {
    const {columnWidth, height, gutterSize, overscanByPixels, windowScrollerEnabled} = this.props.config;

    let child;

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
        {child}
      </div>
    )
  }
  
}



export default MyMasonry;