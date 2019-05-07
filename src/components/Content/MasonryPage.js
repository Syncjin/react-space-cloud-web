import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import axios from 'axios';
import { DominoSpinner } from 'react-spinners-kit';
import MasonryContainer from '../../containers/MasonryContainer';

const Wrapper = styled.div`
  width: calc(100% - 10rem);
  // height: 800px;
  background: #f3f3f3;
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

  button {
    width: 100px;
    height: 50px;
  }
`;

const MasonryWrapper = styled.div`
  width: calc(100% - 20px);
  height: 100%;
  margin: 0 auto;
  padding: 10px;
`;

class MasonryPage extends Component {
 
  // state = {
  //   loading: false,
  //   responseList: [],
  //   responseItemCnt: 0,
  //   more: false
  // }

  constructor(props){
    console.log('masornypage')
    super(props);
    this.scrollThrottling = null;
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('should');
  //   console.log(nextProps, nextState);

  //   if(!nextProps.loading){
  //     return false;
  //   }
  //   return true;
  // }

  
  getApi = async (text, updown) => {
    console.log('log ' + text);
    if(this.state.loading) return;
    this.setState({loading: true});
    try {
      // let response = await axios.get('https://api.unsplash.com/photos/random?client_id=3e3e2a7b7de3858240006b98d9fcbe37671348d15e9844c421d4e66158325ac5&count=15');
      let response = await axios.get('http://localhost:3001/api?count=15');
      
      let newResponse;
      if(this.state.responseList.length > 25) {
        this.state.responseList = this.state.responseList.slice(5, 50);
        if(updown ==='next') {
          newResponse = response.data.concat(this.state.responseList);
        } else {
          newResponse = this.state.responseList.concat(response.data);
        }
      } else {
        if(updown ==='next') {
          newResponse = response.data.concat(this.state.responseList);
        } else {
          newResponse = this.state.responseList.concat(response.data);
        }
      }

      this.setState({ responseList: newResponse, loading: false, responseItemCnt: updown === 'prev' ? this.state.responseItemCnt - 5 : this.state.responseItemCnt + 5 });
      console.log(this.state);
      // console.log(response)
    } catch (e) {
      // console.log(e);
      this.setState({loading: false});
    }
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleOnScroll);
    this.props.getRequested();
  };

  handleOnScroll = () => {
    if(!this.scrollThrottling){
      this.scrollThrottling = setTimeout(() => {
        this.scrollThrottling = null;
        console.log('thrott')
        let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    
        let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        
        let clientHeight = document.documentElement.clientHeight || window.innerHeight;
        let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        
        console.log(scrollTop, scrollHeight, clientHeight, scrolledToBottom);
        if (scrolledToBottom && this.props.more && !this.props.loading) {
          this.props.getRequested();
        }
        
      }, 250)
    }
    
  }



  // querySearchResult = () => {
  //   if (this.state.requestSent) {
  //     return;
  //   }

  //   // enumerate a slow query
  //   setTimeout(this.getApi, 1000);

  //   // this.setState({requestSent: true});
  // }

  makeLoading = loading => {
    console.log('make loading', loading)
    if(loading){
      return (
      <RequestLoading>
        <DominoSpinner
          size={300}
          color="#0E3A53"
          loading={loading}
        />
      </RequestLoading>);
    } else {
      return null
    }

  }


  render() {
    const { more, moreTrue, loading } = this.props;
    return (
      <Wrapper>
        {/* <div style={{width: 300, height: 300, background: 'red'}} onClick={this.props.test}></div> */}
        {/* <Grid data={responseList} num={this.state.responseItemCnt}/>
        {more ? this.makeLoading() : (<MoreBox>
          <button onClick={() => { this.setState({more: true}) }}>more</button>
        </MoreBox>)} */}
        <MasonryWrapper>
          <MasonryContainer/>
        </MasonryWrapper>
        {more ? this.makeLoading(loading) : (<MoreBox>
          <button onClick={moreTrue}>more</button>
        </MoreBox>)}
      </Wrapper>
    )
  }

}

export default MasonryPage;
