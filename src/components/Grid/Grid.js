import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import GridItem from './GridItem';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: blue;
  display: grid;
  grid-gap: 20px 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
  grid-auto-rows: 0px;// 높이제한
  // grid-row-end : span 2; // 아이템별 높이 설정
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

  makeGrid = (data) => {
    const {rowHeight, rowGap} = this.state;
    return data.map((o,i) => {
      return <GridItem key={i} src={o.urls.small} onclick={() => console.log('t')} alt={o.alt_description} rowHeight={rowHeight} rowGap={rowGap} title={o.description !== null ? o.description : o.alt_description !== null ? o.alt_description : "Untitled"} date={o.created_at}
      like={o.likes} view={o.views} download={o.downloads}
      />
    })
  };

  render() {
    const {data} = this.props;
    // console.log('grid render', data)
    return (
      <Wrapper ref={this.myGrid}>
        {this.makeGrid(data)}
      </Wrapper>
    )
  }

  componentDidUpdate(prevProps, prevState){
    console.log('grid update', prevProps, prevState);
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

}

export default Grid;
