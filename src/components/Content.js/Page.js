import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import { device } from '../SizeCheck';
import { blue, ActBlue } from '../../styles/utils';
import { BrowserRouter as Router , Route, Link} from 'react-router-dom';
import Grid from '../Grid/Grid';
import axios from 'axios';
import { DominoSpinner } from 'react-spinners-kit';

const Wrapper = styled.div`
  width: calc(100% - 10rem);
  // height: 800px;
  background: green;
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

class Page extends Component {
 
  state = {
    loading: false,
    responseList: [],
    more: false
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('should');
    console.log(nextProps, nextState)
    
    return true;
  }

  
  getApi = async (text) => {
    console.log('log ' + text);
    if(this.state.loading) return;
    this.setState({loading: true});
    try {
      // let response = await axios.get('https://api.unsplash.com/photos/random?client_id=3e3e2a7b7de3858240006b98d9fcbe37671348d15e9844c421d4e66158325ac5&count=15');
      let response = await axios.get('http://localhost:3001/api');
      this.setState({ responseList: this.state.responseList.concat(response.data), loading: false });

      console.log(response)
    } catch (e) {
      console.log(e);
      this.setState({loading: false});
    }
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleOnScroll);
    this.getApi('didmount');
  };

  handleOnScroll = () => {
    let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    
    let clientHeight = document.documentElement.clientHeight || window.innerHeight;
    let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    // console.log(scrollTop, scrollHeight, clientHeight, scrolledToBottom);
    if (scrolledToBottom && this.state.more && !this.state.loading) {
      // this.querySearchResult();
      console.log('bottom scroll', scrollTop, scrollHeight, clientHeight)
      this.getApi('scrollbottom');
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

  makeLoading = () => {
    if(this.state.loading){
      return (
      <RequestLoading>  
        <DominoSpinner
          size={300}
          color="#0E3A53"
          loading={this.state.loading}
        />
      </RequestLoading>);
    } else {
      return null
    }
  }

  render() {
    const {responseList, more} = this.state;
    console.log('render page')
    return (
      <Wrapper>
        <Grid data={responseList}/>
        {more ? this.makeLoading() : (<MoreBox>
          <button onClick={() => { this.setState({more: true}) }}>more</button>
        </MoreBox>)}
      </Wrapper>
    )
  }

}

export default Page;