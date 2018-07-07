
const defaultText = 'Type in the box! ';
const defaultPig = translatePigLatin(defaultText);



 //Pig Latin
 function wordLogic(str){
	  const vowelkey = ["a", "e", "i", "o", "u"];
	  let i=0;
	  while(vowelkey.indexOf(str[i])===-1 && i<str.length) {
	    i++;
	  }
	  
	  if (i !== 0) {
		  let con = str.substr(0,i);
		  let vow = str.substr(i,str.length);
		  str = vow + con + "ay";
	  } else {
	    str += "way";
	  }
	 
	  return str;
	}
function translatePigLatin(string) {
	
		

	let arr = string.split(/\s+/);
	arr = arr.filter(function(s){
		return /\S/.test(s);
	});
	console.log(arr);
	let pigArr = [];
	for (let j = 0; j<arr.length; j++){
		pigArr[j] = wordLogic(arr[j]);
	}
	let pigStr = pigArr.join(' ');
	return pigStr;
	
	}


// Parent Component
class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      input: defaultText,
      pig: defaultPig
    }
 	this.clearText = this.clearText.bind(this);
 	this.unclearText = this.unclearText.bind(this);
    this.handleChange = this.handleChange.bind(this);
 	this.removeHidden = this.removeHidden.bind(this);
 	this.addHidden = this.addHidden.bind(this);
 	
  }
 

  //Clears Default Text From Input Box
  clearText(){
  	if(this.state.input == defaultText){
  		this.setState({input:'', pig:''});
  	}
  }
  //Returns Default Text to Input Box if Empty Input Value
  unclearText(){
  	if(this.state.input == ''){
  		this.setState({input:defaultText, pig:defaultPig});
  	} else {
  		let piggy = translatePigLatin(this.state.input);
  		this.setState({input:text, pig: piggy});
  	}
  }

  
  //Updates State While typing
  handleChange(e){
	  let text = e.target.value;
	  let piggy = translatePigLatin(this.state.input);
   	  this.setState({input:text, pig: piggy});
  }

  removeHidden(){
  	document.getElementById('info').classList.remove('hidden');
  }
  addHidden(){
  	document.getElementById('info').classList.add('hidden');
  }

  
  

  render(){
    return (
	    <div id = "main">
	    	<Nav 
	    		removeHidden = {this.removeHidden}
	    		addHidden = {this.addHidden}/>
	    	<Form 
	    		input = {this.state.input} 
	    		handleChange = {this.handleChange} 
	    		clearText = {this.clearText}
	    		unclearText = {this.unclearText}/>

	    	<h3 id = 'pig-text'>{this.state.pig}</h3>
	    
	    	<Farm/>
	     </div>
  )}
}

// Input Form Child Component
class Form extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <textarea
          value={this.props.input}
          onChange={this.props.handleChange}
          onFocus={this.props.clearText}
          onBlur={this.props.unclearText} /> 
      </div>
    )
  }
}
//Navbar component
class Nav extends React.Component {
	constructor(props){
		super(props);
	}
	
	
	render(){
		return(
			<nav id = "nav">

					<h1>React Pig Latin Translator <i onClick = {this.props.removeHidden} class="fa fa-info-circle hidden"></i></h1>
					<div id = "info-container">
					<div id = "info" class = "hidden"><i onClick = {this.props.addHidden} class="fa fa-3x fa-times-circle"></i><h1>Pig Latin takes the first consonant (or consonant cluster) of an English word, moves it to the end of the word and suffixes an "ay". If a word begins with a vowel you just add "way" to the end.</h1></div>
					
					</div>
				
			</nav>
			)
	}
}
//pig farm footer component
class Farm extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
				<div id = "farm-container">
					
					
					<div id = "pig">
						
						<object type="image/svg+xml" data={'./pig-with-round-tail.svg'} class="pig-svg">
						</object>
						
					</div>
					<div id = "grass"></div>
				</div>
			)
	}
}


ReactDOM.render(<App/>, document.getElementById('root'));