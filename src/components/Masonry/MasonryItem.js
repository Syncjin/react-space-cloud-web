import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import {Color, ellipse} from '../../styles/utils';
import moment from 'moment';
import {Motion, spring} from 'react-motion';
import * as Md from 'react-icons/md';


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
  // width: 100%;
  // height: auto;
  ${props => props.CellWidth && 
    css`width: ${props.CellWidth}px;`
  }
  ${props => props.CellHeight && 
    css`height: ${props.CellHeight}px;`
  }
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
  height: calc(100% - 20px);
  // background: black;
  overflow: hidden;
  width: calc(100% - 20px);
  margin: 0 auto;
  position:relative;
  cursor: pointer;
  border-radius: 15px;
  -webkit-border-radius: 15px;
  transition: all 0.5s;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  box-shadow: 0 5px 5px rgba(0,0,0,0.19), 0 5px 5px rgba(0,0,0,0.23);
  &:hover {
    box-shadow: 0 9px 9px rgba(0,0,0,0.30), 0 12px 10px rgba(0,0,0,0.22);
  }

  &:hover ${ImageContainer} img {
    transform: scale(1.2);
  }
  
`;
// 10 20 19 38  6 6 15 12

// const Wrapper = styled.div`
//   height: 100%;
//   widht: 100%;
//   ${props => props.CellWidth && 
//     css`width: ${props.CellWidth};`
//   }
//   ${props => props.CellHeight && 
//     css`height: ${props.CellHeight};`
//   }
//   display:block;
// `;
const ContentDiv = styled.div`
  display: block;
  position:relative;
`;

class MasonryItem extends Component {
 
  constructor(props){
    super(props);
    this.state = {open: false}
  }

  _dateReturn = date => {
    let d = new Date(date);
    const monthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return {
      day: d.getDay(),
      month: monthArray[d.getMonth()],
      year: d.getFullYear()
    }
  }

  _numReturn = (num, title) => {
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

  _animationCalculator = flag => {
    // const xSimbol = Math.floor(Math.random() * 2) + 1;
    // const ySimbol = Math.floor(Math.random() * 2) + 1;
    // const x = xSimbol == 1 ? Math.floor(Math.random() * 100) + 1 : (Math.floor(Math.random() * 100) + 1) * (-1);
    // const y = ySimbol == 1 ? Math.floor(Math.random() * 100) + 1 : (Math.floor(Math.random() * 100) + 1) * (-1);
    
    let result;

    result = !flag ? {x:spring(0),y: spring(0)}: {x: spring(1), y: spring(1)}
    return result;

  }
  
  render() {
    // const {src, onclick, alt, date, title, like, view, download } = this.props;
    const {CellHeight, CellWidth, item, num} = this.props;
    // console.log(CellHeight)
    const {likes, views, downloads, urls, alt_description, description, created_at} = item;
    const title = description !== null ? description : alt_description !== null ? alt_description : 'Untitled';
    return (
      // <Motion style={this._animationCalculator(this.state.open)}>
      //   {({x, y}) => 
      //     <div style={{
      //       // WebkitTransform:`translate3d(${x}px,${y}px,0)`, 
      //       height: '100%',
      //       opacity: `${x}`
      //       }}
      //       >
          <Wrapper CellHeight={CellHeight} CellWidth={CellWidth} onClick={() => {console.log(item);}}>
            <DateCard color={Color[this._dateReturn(created_at).month.toLowerCase()]}>
              <span className="day">{this._dateReturn(created_at).day}</span>
              <span className="month">{this._dateReturn(created_at).month}</span>
              <span className="year">{this._dateReturn(created_at).year}</span>
              <span>{num}</span>
            </DateCard>
            <ContentDiv ref={this.myGridItemContent}>
              <ImageContainer CellHeight={CellHeight} CellWidth={CellWidth}>
                <ImageBlackContainer>
                  <IconInfo>
                    <Md.MdFavoriteBorder />
                    <span>{this._numReturn(likes, 'like')}</span>
                  </IconInfo>
                  <IconInfo>
                    <Md.MdRemoveRedEye />
                    <span>{this._numReturn(views, 'view')}</span>
                  </IconInfo>
                  <IconInfo>
                    <Md.MdArrowDownward />
                    <span>{this._numReturn(downloads, 'download')}</span>
                  </IconInfo>
                </ImageBlackContainer>
                <img src={urls.small} onClick={onclick} alt={alt_description} 
                // onLoad={() => {this.setState({imageStatus: 'loaded'}, () => this.getBound())}}
                />
              </ImageContainer>
              <InfoCard>
                <div className="content">
                  <h3 className="title">{title}</h3>
                </div>
              </InfoCard>
            </ContentDiv>
          </Wrapper>
      //     </div>
      //   }
      // </Motion>
    )
  }

  // componentDidMount(){
  //   this.setState({open: true}, () => console.log('??'))
  // }

}

export default MasonryItem;
