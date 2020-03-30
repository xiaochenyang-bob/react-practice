import React from 'react';
import './App.css';
import Loading from './Loading';
import { getMembers, getRepos } from './GitHubApi';
import GitHubReposList from './GitHubReposList';
import GitHubMembersList from './GitHubMembersList';
import SearchForm from './SearchForm';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      repos: [],
      members: [],
      loading: false,
    };
  }
  //methods
  handleSearch = async (searchValue)=>{
    this.setState({loading: true});

    let [members, repos] = await Promise.all([
      getMembers(searchValue),
      getRepos(searchValue)
    ]);

    this.setState({members: members, repos: repos, loading: false});
  }

  render(){
    return (
      <div>
        <SearchForm onSearch={this.handleSearch}/>
         {this.state.loading && <Loading />}
        <div>

        </div>
        <div>
          <GitHubReposList repositories={this.state.repos} />
          <GitHubMembersList members={this.state.members} />
        </div>
      </div>
    );
  }
}

export default App;
