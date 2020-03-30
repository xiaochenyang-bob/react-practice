import React from 'react';

export default function GitHubRepoCard(props){
    let repo = props.repo;

    return (
        <div className="repo-card">
            <p>{repo.name}</p>
            <p>{repo.description}</p>
            <p>{repo.archived? 'Archived' : 'Active'}</p>
        </div>
    );
}