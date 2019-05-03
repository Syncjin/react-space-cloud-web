import React, {Component} from 'react';
import { CellMeasurer, CellMeasurerCache, createMasonryCellPositioner, Masonry, AutoSizer, WindowScroller } from 'react-virtualized';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';
// import ImageMeasurer from 'react-virtualized-image-measurer';

class MyMasonry extends Component {

  constructor(props) {
    super(props);
    console.log('masonry',this.props);
    this._columnCount = 0;

    this._cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 200,
      fixedWidth: true,
    });
    // 항목 측정 값을 캐시.
    // CellMeasurerCache.clear() - 특정 셀에 대해 캐시된 측정 값을 재설정한다. 동적 내용을 처리하기 위해 셀을 다시 측정해야하는 경우. (로드 표시기를 로드된 내용으로 바꾸거나 상태 저장 셀의 상태 변경에 반응하는 경우)
    // clearAll() - 모든 셀에 대해 캐시된 측정 값을 재설정한다. 이 방법은 Grid, List, Table 에서 반응 레이아웃의 크기 조정 이벤트가 있을때 마다 호출되야 한다. (창 폭의 크기 조절은 cell의 높이에 영향을 미칠 수 있다.)

    // this.state = {
    //   columnWidth: 200,
    //   height: 300,
    //   gutterSize: 10,
    //   overscanByPixels: 0,
    //   windowScrollerEnabled: false,
    // };
    this._keyMapper = (item, index) => item.key || index;

    this._cellRenderer = this._cellRenderer.bind(this);
    this._onResize = this._onResize.bind(this);
    this._renderAutoSizer = this._renderAutoSizer.bind(this);
    this._renderMasonry = this._renderMasonry.bind(this);
    this._setMasonryRef = this._setMasonryRef.bind(this);

  }

  // componentDidUpdate(prevProps){
  //   console.log('update?')
  //   if(prevProps.dataSet !== this.props.dataSet){

  //     this._resetList()
  //   }
  // }

  // shouldComponentUpdate(nextProps){
  //     if(this.props.dataSet !== nextProps.dataSet){
  //       this._resetList()
  //     }
  //     return true;
  // }

  render() {
    const {columnWidth, height, gutterSize, overscanByPixels, windowScrollerEnabled} = this.props.config;

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

    return (
      <div>
        <input 
        type="checkbox"
        checked={windowScrollerEnabled} 
        onChange={event => {
          this._cache.clearAll();
          // this.setState({windowScrollerEnabled: event.target.checked});
          // windowScroller
        }}/>
        use windowScrollerEnabled?

        <button onClick={this._resetList}>Reset List Data</button>
        {child}
      </div>
    )
  }

  _calculateColumnCount() {
    // const {columnWidth, gutterSize} = this.state;
    console.log('_calculateColumnCount')
    const {columnWidth, gutterSize} = this.props.config;

    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
  }
  // 컬럼 개수 세기

    _cellRenderer({ index, key, parent, style}) {
    // const {list} = this.context;
    const list = this.props.dataSet;
    // console.log('_cellRenderer', list)
    // 데이터
    // const {columnWidth} = this.state;
    const {columnWidth} = this.props.config;
    const CellWrapper = styled.div`
      display: flex;
      flex-direction: column;
      border-radius: .5rem;
      padding: 0.5rem;
      background-color: #f7f7f7;
      word-break: break-all;
    `;

    const datum = list[index];
    console.log(index)
    
    let resutlHeight
    
    if(this._cache.defaultWidth <= datum.width && this._cache.defaultHeight < datum.height){
      resutlHeight = this._cache.defaultWidth * datum.height / datum.width;
    } else if(this._cache.defaultWidth > datum.width && this._cache.defaultHeight < datum.height){
      resutlHeight = datum.height;
    } else if(this._cache.defaultWidth <= datum.width && this._cache.defaultHeight >= datum.height){
      resutlHeight = this._cache.defaultWidth * datum.height / datum.width;
    } else if(this._cache.defaultWidth > datum.width && this._cache.defaultHeight >= datum.height){
      resutlHeight = datum.height;
    } else {
      resutlHeight = this._cache.defaultHeight
    }

    // console.log('result', resutlHeight)
    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        <CellWrapper
          style={{
            ...style,
            width: columnWidth,
          }}>
          <div
            style={{
              backgroundColor: 'yellow',
              borderRadius: '0.5rem',
              height: resutlHeight,
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
          {}
        </CellWrapper>
      </CellMeasurer>
    );
  }
  // 계산된 값들 CellMeasurer에 넣기.

  _initCellPositioner() {
    console.log('_initCellPositioner')
    if (typeof this._cellPositioner === 'undefined') {
      console.log('_initCellPositioner udefined')
      // const {columnWidth, gutterSize} = this.state;
      const {columnWidth, gutterSize} = this.props.config;

      this._cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize,
      });
      
      // 레이아웃을 위한 포지셔너.
      // 캐시, 컬럼개수, 너비, gutterSize 를 필요로 한다.
    }
  }

  _onResize({width}) {
    console.log('onResize')
    this._width = width;
    this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.recomputeCellPositions();
  }

  _renderAutoSizer({height, scrollTop}) {
    console.log('_renderAutoSizer')
    this._height = height;
    this._scrollTop = scrollTop;

    const {overscanByPixels} = this.props.config;

    if(this.props.dataSet.length !== 0){
      console.log('AutoSizer', this)
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
    console.log('_renderMasonry')
    const {dataSet} = this.props;
    this._width = width;

    this._calculateColumnCount();
    this._initCellPositioner();

    const {height, overscanByPixels, windowScrollerEnabled} = this.props.config;

    console.log('masonry render', dataSet)
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
        keyMapper={this._keyMapper}
      />
    );
  }
  // 컬럼계산, 셀 포지셔너, return Masonry

  _resetList = () => {
    console.log('_resetList')
    // const ROW_HEIGHTS = [25, 50, 75, 100];

    // const {list} = this.context;
    // list.forEach(datum => {
    //   datum.size = ROW_HEIGHTS[Math.floor(Math.random() * ROW_HEIGHTS.length)];
    // });

    // this.props.dataSet = this.props.dataSet.concat(this.props.dataSet)
    // console.log(this.props.dataSet)
    console.log(this._masonry)
    
    this._cache.clearAll();
    // this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.clearCellPositions();
  };

  //리셋 리스트. cache 전체 클리어, CellPositioner의 reset

  _resetCellPositioner() {
    console.log('_resetCellPositioner')
    const {columnWidth, gutterSize} = this.props.config;

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