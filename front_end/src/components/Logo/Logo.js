import React from 'react' ; 
import './Logo.css' ; 
import brain from './brain_logo.png';
const Logo= () => {
    return (
        <div  className='logo ma4 mt0 white ' options={{ max : 25 }} style={{height: 90 , width: 150 }} > 
<div  > <img src={brain} alt='logo' /> </div>
        </div>
    ) ; 
} 
export default Logo ; 