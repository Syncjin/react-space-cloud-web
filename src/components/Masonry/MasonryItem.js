import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import {Color, ellipse} from '../../styles/utils';
import {Link} from 'react-router-dom';
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
  -webkit-backface-visibility: hidden;
  box-shadow: 0 5px 5px rgba(0,0,0,0.19), 0 5px 5px rgba(0,0,0,0.23);
  &:hover {
    box-shadow: 0 9px 9px rgba(0,0,0,0.30), 0 12px 10px rgba(0,0,0,0.22);
  }

  &:hover ${ImageContainer} img {
    transform: scale(1.2);
  }
  
`;

const ContentDiv = styled.div`
  display: block;
  position:relative;
`;

const LazyPreImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.5s;
  -webkit-filter: blur(5px);
    filter: blur(5px);
  ${props => props.loaded &&
    css`
    -webkit-filter: blur(0px);
    filter: blur(0px);
    position: absolute;
    `
  }
`;

const LazyImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.5s;
  position: absolute;
  -webkit-filter: blur(5px);
    filter: blur(5px);
  ${props => props.loaded &&
    css`
    position: relative;
    -webkit-filter: blur(0px);
    filter: blur(0px);
    `
  }
`;

const LinkA = styled(Link)`
  text-decoration: none;
`;


class MasonryItem extends Component {
 
  constructor(props){
    super(props);
    this.state = {
      open: false,
      loaded: false,
    }
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

  _numReturn = num => {
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


  _transInterpolation = flag => {
    if(!this._animateFlag()){
      return 0;
    }

    const xSimbol = Math.floor(Math.random() * 2) + 1;
    const x = xSimbol == 1 ? Math.floor(Math.random() * 300) + 1 : (Math.floor(Math.random() * 300) + 1) * (-1);
    
    let result;

    result = flag ? 0 : x;
    return result;
  }

  
  _animateFlag = () => {
    const { itemLength, num } = this.props;
    if(itemLength <= 5) {
      return false
    }
    let animated = (itemLength - num) <= 5;
    return animated;
  }



  componentDidMount(){

    if(this._animateFlag()){
      this.setState({
        open: true,
      })
    } else {
      this.setState({
        loaded: true,
      })
    }
  }



  render() {
    const {CellHeight, CellWidth, item, num} = this.props;
    const {likes, views, downloads, urls, alt_description, description, created_at} = item;
    const title = description !== null ? description : alt_description !== null ? alt_description : 'Untitled';
    const {loaded} = this.state;

    return (
      <Motion style={{
          transX: spring(this._transInterpolation(this.state.open), {
            stiffness: 170, damping: 50
          }),
          transY: spring(this._transInterpolation(this.state.open), {
            stiffness: 170, damping: 50
          })
        }}>
        {({transX, transY}) => 
          <LinkA to={`/cat/${item.key}`}>
          <Wrapper CellHeight={CellHeight} CellWidth={CellWidth} style={{
            WebkitTransform: `translate3d(${transX}px, ${transY}px, 0)`,
            transform: `translate3d(${transX}px, ${transY}px, 0)`,
          }}>
            <DateCard color={Color[this._dateReturn(created_at).month.toLowerCase()]}>
              <span className="day">{this._dateReturn(created_at).day}</span>
              <span className="month">{this._dateReturn(created_at).month}</span>
              <span className="year">{this._dateReturn(created_at).year}</span>
              <span>{num}</span>
            </DateCard>
            <ContentDiv>
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
                {!loaded && <LazyPreImage src={urls.preLoad} onClick={onclick} alt={alt_description} loaded={loaded}/>}
                <LazyImage src={urls.small} onClick={onclick} alt={alt_description} loaded={loaded}
                onLoad={() => {
                  this.setState({
                    loaded: true
                  })
                }}
                />
              </ImageContainer>
              <InfoCard>
                <div className="content">
                  <h3 className="title">{title}</h3>
                </div>
              </InfoCard>
            </ContentDiv>
          </Wrapper>
          </LinkA>
        }
      </Motion>
    )
  }

  

}

export default MasonryItem;
