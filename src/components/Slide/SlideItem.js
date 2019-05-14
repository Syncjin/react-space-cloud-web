import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import { device } from '../SizeCheck';

const View = styled.ul`
  width: 100%;
  height: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
`;

const Item = styled.li`
  width: 100%;
  height: 100%;
  // background: yellow;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  img {
    width: auto;
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
  }
  iframe {
    background: black;
    width: 100%;
    height: 100%;
  }
  transition: all 0.5s;
${props => css`
  transform: translateX(${props.transWidth}px);
`}
`;

class SlideItem extends Component {
  
  makeItem = (responseList, width, level) => {
    return responseList.map((o, i) => {
      if(o.urls === undefined){
        return <Item key={i} transWidth={width * (i - level)} />
      }
      return (
        <Item key={i} transWidth={width * (i - level)}>
          <img src={o.urls.small} onClick={() => window.open(o.urls.small)} alt={o.alt_description} />
        </Item>
      )
    })

  }
    
  constructor(props){
    super(props);
    this.myViewWidth = React.createRef(); 
    this.state = {
      width: null
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }
    
  componentDidMount(){
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions(){
    this.setState({
      width: this.myViewWidth.current.offsetWidth
    });
  }

  render() {
    const { loading, responseList, level } = this.props;
    const { width } = this.state;
    if(loading) {
      return <View><h1>Loading...</h1></View>
    }
    return (
      <View ref={this.myViewWidth}>
        {this.makeItem(responseList, width, level)}
      </View>
    )
  }
}

export default SlideItem;