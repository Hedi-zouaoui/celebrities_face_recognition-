import './index.css';
import React, { Component  } from 'react' ; 
import Navigation  from './components/navigation/navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Logo  from './components/Logo/Logo';
import Rank  from './components/Rank/Rank';
import FaceRecognition  from './components/FaceRecognition/FaceRecognition';
import Signin  from './components/Signin/Signin';
import Register  from './components/Register/Register';
class App extends Component {
  constructor() {
    super() ; 
    this.state= {
      input: '' , 
      imageUrl: '' , 
      route: 'signin' , 
      isSignedIn : false , 
      celebrities: "" , 
      user: {
         id : '' , 
            name : '' , 
            mail: '' , 
        
            joined : ''
      }
      
    }
  }
loadUser = (data) => {
  this.setState({user: {
     id : data.id  , 
            name : data.name , 
            mail: data.mail , 
            joined : data.joined
 } })
}
componentDidMount(){
  fetch('http://localhost:3000/')
  .then(response => response.json())
  .then(console.log)
}
  onInputChange = (event) => {
    this.setState({input: event.target.value} ) ; 
   

  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
     const IMAGE_URL = this.state.input;
    const raw = JSON.stringify({
  "user_app_id": {
    "user_id": "clarifai",
    "app_id": "main"
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": IMAGE_URL
              }
          }
      }
  ]
});
const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + 'a516e3af5f424e4584af32f399999212'
    },
    body: raw
};

fetch(`https://api.clarifai.com/v2/models/celebrity-face-recognition/versions/0676ebddd5d6413ebdaa101570295a39/outputs`, requestOptions)
    .then(response => response.text())
    .then(response => {
      const parser = JSON.parse(response) ;
   
    this.setState(Object.assign(this.state.celebrities, { celebrities:  parser.outputs[0].data.concepts[0].name}
      ) 
    ) 
  ;
}
     )
   .then(response => {

   })
    .catch(error => console.log('error', error));


  }
    onroutechange = (route) => {
      if (route === 'signout') {
        this.setState({isSignedIn: false})
      } else if (route === 'home') {
        this.setState({isSignedIn: true })
      }
    this.setState({route: route}) ; 
  }
   render() {
    return (
      <div className='App'>

        <Navigation isSignedIn={this.state.isSignedIn} onroutechange={this.onroutechange} /> 
        { this.state.route === 'home'
        ? <div>
         <Logo /> 
        <Rank /> 
       
      <ImageLinkForm 
      onInputChange= {this.onInputChange} onButtonSubmit={this.onButtonSubmit} /> 
 <h1>{this.state.celebrities}</h1>;
      <FaceRecognition imageUrl={this.state.imageUrl} /> 
      </div>
         :  ( this.state.route === 'Signin' 
         ? <Signin onroutechange={this.onroutechange} /> 
         : <Register loadUser={this.loadUser } onroutechange={this.onroutechange} /> 

         )     
 } 

      </div>
     
    );

   }
}

export default App;
