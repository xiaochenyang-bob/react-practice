import React from 'react';
import './App.css';
import MemberImage from './MemberImage';
import Loading from './Loading';
import { getMembers, getRepos } from './GitHubApi';
import GitHubRepoCard from './GitHubRepoCard';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      members: [],
      repos: [],
      loading: true,
    };
  }
  //methods
  async componentDidMount(){
    // let members = await getMembers('emberjs');
    // let repos = await getRepos('emberjs');
    let [members, repos] = await Promise.all([
      getMembers('emberjs'),
      getRepos('emberjs')
    ]);

    this.setState({members: members, repos: repos, loading: false});
  }
  render(){
    return (
      //JSX goes here
      //use curly braces for dynamic variables
      <div>
        <p>{this.state.members.length} Members of Ember.js</p>
        <div>
          {this.state.loading ? <Loading /> : this.state.members.map((member)=>{
            return <MemberImage member={member} key={member.id} />
          })}
        </div>
        <div>
          {this.state.loading ? <Loading /> : this.state.repos.map((repo)=>{
            return <GitHubRepoCard repo={repo} key={repo.id} />
          })}
        </div>
      </div>
    );
  }
}

export default App;
