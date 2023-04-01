import React from 'react' ; 
const FaceRecognition = ({imageUrl  }) => {
return (
 <div className='center' options={{ max : 25 }} style={{height: 250 , width: 150 }} >
    <img alt='imageCeleb' src={imageUrl}/>  
 </div>
);
}
export default FaceRecognition ; 