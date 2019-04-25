import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import GridItem from './GridItem';
// import MyMasonry from '../Masonry/MyMasonry.bck';
// import MyMasonry2 from '../Masonry/MyMasonry';
import MasonryContainer from '../../containers/MasonryContainer';

const Wrapper = styled.div`
  width: calc(100% - 20px);
  height: 100%;
  margin: 0 auto;
  padding: 10px;
  // display: grid;
  // grid-gap: 20px 10px;
  // grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
  // grid-auto-rows: 0px;// 높이제한
`;

class Grid extends Component {
 
  constructor(props){
    super(props);
    this.myGrid = React.createRef();

    this.state = {
      rowHeight: null,
      rowGap: null,
    }
  }


  makeGrid = (data, num) => {
    const {rowHeight, rowGap} = this.state;
    return data.map((o,i) => {
      return <GridItem key={i} num ={i + num} src={o.urls.small} onclick={() => console.log('t')} alt={o.alt_description} rowHeight={rowHeight} rowGap={rowGap} title={o.description !== null ? o.description : o.alt_description !== null ? o.alt_description : "Untitled"} date={o.created_at}
      like={o.likes} view={o.views} download={o.downloads}
      />
    })
  };

  

  render() {
    const {data, num} = this.props;
    console.log('grid render', data)
    return (
      <Wrapper ref={this.myGrid}>
        {/* {this.makeGrid(data, num)} */}
        {/* <MyMasonry /> */}
        <MasonryContainer dataSet={data}/>
      </Wrapper>
    )
  }

  componentDidUpdate(prevProps, prevState){
    // console.log('grid update', prevProps, prevState);
  }

  getResizeGridItem = (item) => {
    const grid = window.getComputedStyle(this.myGrid.current);
    const rowHeight = parseInt(grid.getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(grid.getPropertyValue('grid-row-gap'));
    this.setState({
      rowHeight, rowGap
    })
  }

  componentDidMount(){
    this.getResizeGridItem();
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('should grid');
    // console.log(nextProps, nextState)
    
    return true;
  }
}

export default Grid;
