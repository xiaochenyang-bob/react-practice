import React from 'react';
import MemberImage from './MemberImage';

export default function GitHubMembersLIst(props){
    return (
        <div>
            { props.members.map((member)=>{
                return <MemberImage member={member} key={member.id} />
            })}
        </div>
    );
}