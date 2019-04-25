import React from 'react';
import { CellMeasurer, CellMeasurerCache, createMasonryCellPositioner, Masonry } from 'react-virtualized';
import ImageMeasurer from 'react-virtualized-image-measurer';
import styled, {css} from 'styled-components';

const list = [
  {
    image: 'http://localhost:3001/api/test/what-does-it-mean-when-cat-wags-tail.jpg',
    title: "-03-06T23:24:201931-05:00"
  },
  {
    image: 'http://localhost:3001/api/test/This-Is-Why-Cats-Are-Afraid-of-Cucumbers-760x506.jpg',
    title: "-03-06T23:24:201931-05:00"
  },
  {
    image: 'http://localhost:3001/api/test/what-does-it-mean-when-cat-wags-tail.jpg',
    title: "-03-06T23:24:201931-05:00"
  },
  {
    image: 'http://localhost:3001/api/test/This-Is-Why-Cats-Are-Afraid-of-Cucumbers-760x506.jpg',
    title: "-03-06T23:24:201931-05:00"
  },
  {
    image: 'http://localhost:3001/api/test/what-does-it-mean-when-cat-wags-tail.jpg',
    title: "-03-06T23:24:201931-05:00"
  },
  {
    image: 'http://localhost:3001/api/test/This-Is-Why-Cats-Are-Afraid-of-Cucumbers-760x506.jpg',
    title: "-03-06T23:24:201931-05:00"
  },
  {
    image: 'http://localhost:3001/api/test/what-does-it-mean-when-cat-wags-tail.jpg',
    title: "-03-06T23:24:201931-05:00"
  },
  {
    image: 'http://localhost:3001/api/test/This-Is-Why-Cats-Are-Afraid-of-Cucumbers-760x506.jpg',
    title: "-03-06T23:24:201931-05:00"
  },
  {
    image: 'http://localhost:3001/api/test/what-does-it-mean-when-cat-wags-tail.jpg',
    title: "-03-06T23:24:201931-05:00"
  },
  {
    image: 'http://localhost:3001/api/test/This-Is-Why-Cats-Are-Afraid-of-Cucumbers-760x506.jpg',
    title: "-03-06T23:24:201931-05:00"
  },
  {
    image: 'http://localhost:3001/api/test/what-does-it-mean-when-cat-wags-tail.jpg',
    title: "-03-06T23:24:201931-05:00"
  },
  {
    image: 'http://localhost:3001/api/test/This-Is-Why-Cats-Are-Afraid-of-Cucumbers-760x506.jpg',
    title: "-03-06T23:24:201931-05:00"
  },
]
// We need to make sure images are loaded from scratch every time for this demo
const noCacheList = list.map((item, index) => ({
  title: index + ". " + item.title,
  image: item.image + (item.image ? "?noCache=" + Math.random() : "")
}));

const keyMapper = (item, index) => item.image || index;

const columnWidth = 200;
const defaultHeight = 250;
const defaultWidth = columnWidth;

const cache = new CellMeasurerCache({
  defaultHeight,
  defaultWidth,
  fixedWidth: true
});

const cellPositionerConfig = {
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth,
  spacer: 20
};

const cellPositioner = createMasonryCellPositioner(cellPositionerConfig);

const MasonryItem = ({itemsWithSizes, setRef, dynamicWidth, dynamicHeight}) => {
  
  const cellRenderer = ({ index, key, parent, style }) => {
    const { item, size } = itemsWithSizes[index];
    const height = columnWidth * (size.height/size.width) || defaultHeight;

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          <div>{item.title}</div>
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              style={{
                height: height,
                width: columnWidth,
                display: "block"
              }}
            />
          )}
        </div>
      </CellMeasurer>
    )
  };

  return (
    <Masonry
      cellCount={itemsWithSizes.length}
      cellMeasurerCache={cache}
      cellPositioner={cellPositioner}
      cellRenderer={cellRenderer}
      height={dynamicHeight}
      width={dynamicWidth}
      keyMapper={keyMapper}
      ref={setRef}
      style={{margin:'0 auto;'}}
    />
  )
};

const Wrapper = styled.div`
  // width: calc(100% - 20px);
  // height: 100%;
  // margin: 0 auto;
  // padding: 10px;
`;

class MyMasonry extends React.Component{
  
  state = { images: noCacheList, dynamicWidth: 600, dynamicHeight: 800 };
  constructor(props){
    super(props)
    // this._columnCount = 0;
    // this._cache = new CellMeasurerCache({
    //   defaultHeight: 250,
    //   defaultWidth: 200,
    //   fixedWidth: true,
    // });

    
  }
  masonryRef = null;

  shorten = () => {
    cache.clearAll();
    cellPositioner.reset(cellPositionerConfig);
    this.masonryRef.clearCellPositions();
    // this.setState({ images: [...this.state.images.slice(1)] });
    this.setState({ images: [...this.state.images.concat(this.state.images)] });
  };
  
  setMasonry = node => (this.masonryRef = node);
  
  render() {
    // console.log('render', ({itemsWithSizes}))
    const {dynamicWidth, dynamicHeight} = this.state;
    return (
      <Wrapper>
        <button onClick={this.shorten}>Resize</button>
        <ImageMeasurer
          items={this.state.images}
          image={item => item.image}
          keyMapper={keyMapper}
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
          defaultHeight={defaultHeight}
          defaultWidth={defaultWidth}
        >
          {({ itemsWithSizes }) => (
            <MasonryItem
              setRef={this.setMasonry}
              itemsWithSizes={itemsWithSizes}
              dynamicWidth={dynamicWidth}
              dynamicHeight={dynamicHeight}
            />
          )}
        </ImageMeasurer>
      </Wrapper>
    )
  }
}

export default MyMasonry;