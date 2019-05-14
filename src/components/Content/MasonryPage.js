import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import { blue, normal, white, ActBlue } from '../../styles/utils';
import { DominoSpinner } from 'react-spinners-kit';
import MasonryContainer from '../../containers/MasonryContainer';
import FloatingButton from './FloatingButton';


const Wrapper = styled.div`
  width: 100%;
  margin: 50px auto;
`;

const RequestLoading = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoreBox = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MasonryWrapper = styled.div`
  width: calc(100% - 20px);
  height: 100%;
  margin: 0 auto;
  padding: 10px;
`;

const MoreButton = styled.div`
  width: 300px;
  height: 50px;
  position: relative;
  border-radius: 15px;
  background: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${blue};
  color: ${normal};
  -webkit-transition: all 1s ease;
	-moz-transition: all 1s ease;
	-o-transition: all 1s ease;
  transition: all 1s ease;
  overflow: hidden;
  
  span {
    z-index:1;
    color: ${blue};
  }

  &: hover>span {
    color: ${white};
  }

  &: hover:after {
    
    height: 450%;
    border: 1px solid ${blue};
    background: ${blue};
  }
  &: after {
    content: "";
    position: absolute;
    height: 0%;
    left: 50%;
    top: 50%;
    width: 150%;
    z-index: 0;
    -webkit-transition: all 0.75s ease 0s;
    -moz-transition: all 0.75s ease 0s;
    -o-transition: all 0.75s ease 0s;
    transition: all 0.75s ease 0s;
    -moz-transform: translateX(-50%) translateY(-50%) rotate(-25deg);
    -ms-transform: translateX(-50%) translateY(-50%) rotate(-25deg);
    -webkit-transform: translateX(-50%) translateY(-50%) rotate(-25deg);
    transform: translateX(-50%) translateY(-50%) rotate(-25deg);
  }
`;



class MasonryPage extends Component {
 

  constructor(props){
    // console.log('masornypage')
    super(props);
    this.scrollThrottling = null;
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleOnScroll, false);
    this.props.getRequested(this.props.requestedNum);
  };

  componentWillUnmount(){
    clearTimeout(this.scrollThrottling);
    window.removeEventListener('scroll', this.handleOnScroll, false);
  };

  handleOnScroll = () => {
    if(!this.scrollThrottling){
      this.scrollThrottling = setTimeout(() => {
        this.scrollThrottling = null;
        let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        let clientHeight = document.documentElement.clientHeight || window.innerHeight;
        let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        let scrolledToTop = scrollTop <= 200;
        
        // console.log(scrollTop, scrollHeight, clientHeight, scrolledToBottom, scrolledToTop);
        const {floating, more, loading, floatingHide, floatingShow, getRequested, requestedNum } = this.props;
        
        if (scrolledToTop && floating && more) {
          floatingHide();
        } else if(!scrolledToTop && !floating && more){
          floatingShow();
        }

        if (scrolledToBottom && more && !loading) {
          getRequested(requestedNum);
        }

      }, 250)
    }
  }

  _makeLoading = loading => {
    if(loading){
      return (
      <RequestLoading>
        <DominoSpinner
          size={300}
          color={`${ActBlue}`}
          loading={loading}
        />
      </RequestLoading>);
    } else {
      return null;
    }
  }

  _makeFloating = floating => {
    return <FloatingButton ani={floating}/>
  }

  render() {
    const { more, moreTrue, loading, floating } = this.props;
    return (
      <Wrapper>
        <MasonryWrapper>
          <MasonryContainer/>
        </MasonryWrapper>
        {loading ? this._makeLoading(loading) : null}
        {more ? null : 
          (<MoreBox>
            <MoreButton onClick={moreTrue}><span>More</span></MoreButton>
          </MoreBox>)}
        {more ? this._makeFloating(floating) : null}
      </Wrapper>
    )
  }

}

export default MasonryPage;
