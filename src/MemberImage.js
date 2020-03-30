import React from 'react';
export default function MemberImage(props){
    let member = props.member;
    return <img src={member.avatar_url} alt={member.login} width='150'/>
}