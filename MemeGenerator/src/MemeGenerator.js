import React, { Component } from 'react';

import bottom from './cssstyle.css';
class MemeGenerator extends Component{
    constructor(){
        super();
        this.state={
            toptext:'',
            bottomtext:'',
            randomimg:'http://i.imgflip.com/1bij.jpg',
            allmemeimgs:[]
          
        };
        this.handleChange=this.handleChange.bind(this)
        this.handlesubmit=this.handlesubmit.bind(this)
    }
    componentDidMount(){
     fetch('https://api.imgflip.com/get_memes')
     .then(response=>response.json())
     .then(response=>{
         const {memes}=response.data
         console.log(memes[0])
         this.setState({allmemeimgs:memes})
     })
    }
    handleChange(event){
        const {name,value}=event.target
        this.setState({[name]:value})
    }
    handlesubmit(event){
        event.preventDefault()
        const randNum=Math.floor(Math.random()*this.state.allmemeimgs.length)
        const randMemeimg=this.state.allmemeimgs[randNum].url;
        this.setState({randomimg:randMemeimg})
    }
    render(){
        return(
          
        <div>
           <form className="meme-form" onSubmit={this.handlesubmit}>
                <input
                type="text"
                name="toptext"
                placeholder="Top Text"
                value={this.state.toptext}
                onChange={this.handleChange}
                />
                 <input
                type="text"
                name="bottomtext"
                placeholder="Bottom Text"
                value={this.state.bottomtext}
                onChange={this.handleChange}
                />
                <button>Generate</button>
            </form>
            <div className='meme'>
             <img src={this.state.randomimg} alt='' />
            <h2 className='top'>{this.state.toptext}</h2>
            <h2 className='bottom'>{this.state.bottomtext}</h2>
             </div>
        </div>
        )
    }
}

export default MemeGenerator;
