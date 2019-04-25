import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import {Color, ellipse} from '../../styles/utils';
import moment from 'moment';
import * as Md from 'react-icons/md';



// ${props => props.rowSpan && css`grid-row-end: span ${props.rowSpan};`}

const DateCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: red;
  color: white;
  ${props => props.color &&
    css`background-color:${props.color};`
  }
  z-index: 10;
  padding: 0.8em;
  span {
    display: block;
    text-align: center;
  }
  .day {
    font-weight: 700;
    font-size: 24px;
    text-shadow: 2px 3px 2px rgba(0,0,0, 0.18);
  }
  .month {
    text-transform: uppercase;
  }
  .month,
  .year {
    font-size: 12px;
  }
`;

const InfoCard = styled.div`
  position: relative;
  width: 100%;
  .content {
    padding: 1em 0;
    h3 {
      margin: 0;
      margin: 10px;
    }
    .title {
      color: gray;
      ${ellipse(2, 1.2)}
    }
    
  }
  transition: all 0.3s;
  z-index:1;
  background: white;
`;

const ImageBlackContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: white;
`;

const IconInfo = styled.div`
  padding: 0.5em;
  justify-content: center;
  align-items: base-line;
  display: none;
  span {
    font-size: 1em;
    margin-left: 5px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  position:relative;
  overflow: hidden;
  &:hover ${ImageBlackContainer} {
    background: rgba(0,0,0,0.5);
  }
  &:hover ${IconInfo} {
    display: flex;
  }
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: all 0.3s;
  }
  
`;
const Wrapper = styled.div`
  height: auto;
  // background: black;
  overflow: hidden;
  position:relative;
  cursor: pointer;
  border-radius: 15px;
  -webkit-border-radius: 15px;
  transition: boxshadow 0.5s;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  &:hover {
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  }
  &:hover ${ImageContainer} img {
    transform: scale(1.2);
  }

  ${props => props.rowSpan && 
    css`grid-row-end: ${props.rowSpan};`
  }
  
`;

const ContentDiv = styled.div`
`;

class GridItem extends Component {
 
  constructor(props){
    super(props);
    this.myGridItem = React.createRef();
    this.myGridItemContent = React.createRef();
    this.resizeEnd = null;
    this.state = {
      rowSpan: null,
      getBoundHeight: null,
      imageStatus: null
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    // if(this.state.rowSpan !== nextState.rowSpan){
    //   this.getRowSpan();
    //   return true;
    // }
    // console.log('item should')
    return true;
  }

  dateReturn = date => {
    let d = new Date(date);
    const monthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return {
      day: d.getDay(),
      month: monthArray[d.getMonth()],
      year: d.getFullYear()
    }
  }

  numReturn = (num, title) => {
    let data = Number(num);
    let result;
    if(data > 1000000){
      result = (data / 1000000).toFixed(1) + " m"
      return result
    }
    if(data > 1000){
      result = (data / 1000).toFixed(1) + " k"
      return result
    }
    return data;
  }

  render() {
    const {src, onclick, alt, date, title, like, view, download } = this.props;
    return (
      <Wrapper ref={this.myGridItem} rowSpan={this.state.rowSpan}>
        <DateCard color={Color[this.dateReturn(date).month.toLowerCase()]}>
          <span className="day">{this.dateReturn(date).day}</span>
          <span className="month">{this.dateReturn(date).month}</span>
          <span className="year">{this.dateReturn(date).year}</span>
          <span>{this.props.num}</span>
        </DateCard>
        <ContentDiv ref={this.myGridItemContent}>
          <ImageContainer>
            <ImageBlackContainer>
              <IconInfo>
                <Md.MdFavoriteBorder />
                <span>{this.numReturn(like, 'like')}</span>
              </IconInfo>
              <IconInfo>
                <Md.MdRemoveRedEye />
                <span>{this.numReturn(view, 'view')}</span>
              </IconInfo>
              <IconInfo>
                <Md.MdArrowDownward />
                <span>{this.numReturn(download, 'download')}</span>
              </IconInfo>
            </ImageBlackContainer>
            <img  src={src} onClick={onclick} alt={alt} onLoad={() => {this.setState({imageStatus: 'loaded'}, () => this.getBound())}}/>
          </ImageContainer>
          <InfoCard>
            <div className="content">
              <h3 className="title">{title}</h3>
            </div>
          </InfoCard>
        </ContentDiv>
      </Wrapper>
    )
  }

  getBound = () => {
    this.setState({
      getBoundHeight: this.myGridItemContent.current.getBoundingClientRect().height
    }, this.getRowSpan)
  }

  getRowSpan = () => {
    console.log('getRowSpan')
    const {rowGap, rowHeight} = this.props;
    const {getBoundHeight} = this.state;
    const rowSpan = Math.floor((rowGap + getBoundHeight)/(rowHeight + rowGap));
    // console.log(`rowGap, ${rowGap} rowHeight, ${rowHeight} rowSpan, ${rowSpan} getBoundHeight, ${getBoundHeight}`)
    this.setState({
      rowSpan: "span " + rowSpan
    })
  }

  componentDidMount(){
    
    window.addEventListener('resize', this.updateDimensions);
  
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () =>{
    if(this.resizeEnd){
      clearTimeout(this.resizeEnd);
    }
    this.resizeEnd = setTimeout(() => {
      // console.log('resize end!')
      this.getBound();
    }, 1000);
  }


  /* 
  $(document).ready(function(){
  
  var $win = $(window);
  var $left_panel = $('.left-panel');
  var $right_panel = $('.right-panel');
  
  function display_info($div) {
    $div.append($win.width() + ' x ' + $win.height() +  '<br>');
  }
                
  $(window).on('resize', function(){
    display_info($left_panel);
  });
  
  $(window).on('resize', _.debounce(function() {
    display_info($right_panel);
  }, 400));
});
  */
}

export default GridItem;
