import React from 'react';
import './App.css';
import Loading from './Loading';
import { getMembers, getRepos } from './GitHubApi';
import GitHubReposList from './GitHubReposList';
import GitHubMembersList from './GitHubMembersList';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      repos: [],
      members: [],
      loading: false,
      searchValue: ''
    };

    this.handleClickReposButton = this.fetchRepos.bind(this);
    this.handleClickMembersButton = this.fetchMembers.bind(this);
  }
  //methods
  
  //a syntax to remember 'this', experimental
  // fetchRepos = async () => {
  //   this.setState({loading: true});
  //   let repos = await getRepos('emberjs');
  //   this.setState({repos: repos, loading: false});
  // }

  async fetchRepos() {
    this.setState({loading: true});
    let repos = await getRepos('emberjs');
    this.setState({repos: repos, loading: false, members:[]});
  }

  async fetchMembers(){
    this.setState({loading: true});
    let members = await getMembers('emberjs');
    this.setState({members: members, loading: false, repos:[]});
  }

  handleSearchInputChange = (event)=>{
    this.setState({
      searchValue: event.target.value
    });
  }

  handleSearch = async (event)=>{
    event.preventDefault();
    console.log(this.state.searchValue);
    this.setState({loading: true});

    let [members, repos] = await Promise.all([
      getMembers(this.state.searchValue),
      getRepos(this.state.searchValue)
    ]);

    this.setState({members: members, repos: repos, loading: false});
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input 
              type="text" 
              value={this.state.searchValue}
              onChange={this.handleSearchInputChange}
          />
          <button type="submit">Search</button>
        </form>
         {/* {this.state.loading ? <Loading />: ""} */}
         {this.state.loading && <Loading />}
         <button onClick={this.handleClickReposButton}>Repos</button>
         <button onClick={this.handleClickMembersButton}>Members</button>
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
