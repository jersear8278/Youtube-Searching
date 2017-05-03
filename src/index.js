import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar'; 
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY ='AIzaSyD0rOzp-sDOoGfySQnAqvK8DsQEA4XqB-0';

//Create a new component. This component ahould produce some HTML
class App extends Component {
    constructor(props){
        super(props);


        this.state = {
            videos:[],
            selectedVideo:null    
        };
        this.videoSearch('Adele');
    }




    videoSearch(term){
                YTSearch({key: API_KEY, term: term}, (videos)=> {
          this.setState({ 
            videos:videos,
            selectedVideo:videos[0]
        });
           //=this.setState({ videos: videos }) =this.setState({videos })
           //only used when two name are same
        });
    }



    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term)},300);

      return (
        <div>
          <SearchBar onSearchTermChange={videoSearch} /><br/><br/>
          <VideoDetail video={this.state.selectedVideo}/>
          <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo:selectedVideo})}
          videos={this.state.videos} />
        </div>
      );
    }

}



//Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));