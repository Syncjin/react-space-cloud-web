import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import {Color, ellipse} from '../../styles/utils';
import moment from 'moment';
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
  // height: 100%;
  // background: black;
  overflow: hidden;
  width: 100%;
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
  
`;

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
    // const {src, onclick, alt, date, title, like, view, download } = this.props;
    const {CellHeight, CellWidth, item, num} = this.props;
    // console.log(CellHeight)
    const {likes, views, downloads, urls, alt_description, description, created_at} = item;
    const title = description !== null ? description : alt_description !== null ? alt_description : 'Untitled';
    return (
      <Wrapper CellHeight={CellHeight} CellWidth={CellWidth}>
        {/* <DateCard color={Color[this.dateReturn(created_at).month.toLowerCase()]}>
          <span className="day">{this.dateReturn(created_at).day}</span>
          <span className="month">{this.dateReturn(created_at).month}</span>
          <span className="year">{this.dateReturn(created_at).year}</span>
          <span>{num}</span>
        </DateCard> */}
        <ContentDiv ref={this.myGridItemContent}>
          <ImageContainer CellHeight={CellHeight} CellWidth={CellWidth}>
            <ImageBlackContainer>
              <IconInfo>
                <Md.MdFavoriteBorder />
                <span>{this.numReturn(likes, 'like')}</span>
              </IconInfo>
              <IconInfo>
                <Md.MdRemoveRedEye />
                <span>{this.numReturn(views, 'view')}</span>
              </IconInfo>
              <IconInfo>
                <Md.MdArrowDownward />
                <span>{this.numReturn(downloads, 'download')}</span>
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
    )
  }

}

export default MasonryItem;
