export async function getMembers(organization){
    let response = await fetch(`https://api.github.com/orgs/${organization}/members`);
    let members = await response.json();
    return members;
}

export async function getRepos(organization){
    let response = await fetch(`https://api.github.com/orgs/${organization}/repos`);
    let repos = await response.json();
    return repos;
}