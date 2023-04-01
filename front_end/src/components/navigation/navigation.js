import React from 'react' ; 
const Navigation = ({ onroutechange , isSignedIn }) => {

    if (isSignedIn) {
        return(
    <nav 
    style={{display: 'flex' , 
    justifyContent: 'flex-end'}}>
        <p  className='f3 link dim white underline pa3 pointer ' onClick={() => onroutechange('signout') } > Sign out </p>
    </nav> ) ;  }
    else {
        return(
 <nav 
    style={{display: 'flex' ,  justifyContent: 'flex-end'}}>
        <p  className='f3 link dim white underline pa3 pointer ' onClick={() => onroutechange('Signin') } > Sign in </p>
                <p  className='f3 link dim white underline pa3 pointer ' onClick={() => onroutechange('Register') } > Register </p>
    </nav> 
        ) ;   
    }


}
export default Navigation ; 