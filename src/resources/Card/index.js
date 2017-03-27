import React, { Component, PropTypes} from 'react';

export default class Card extends Component {
    constructor(props){
        super(props);
    }
    static defaultProps = {
        text:"",
    }
    static propTypes = {
        text:PropTypes.string,
        onClick:PropTypes.func
    }
    render(){
        // const {imgSrc,imgLink,imgWidth,imgHeight} = this.props;
        // const imgStyle = {
        //     width:imgWidth,
        //     height:imgHeight,
        //     borderRadius:parseInt(imgWidth,10)/2
        // }
        const {text,onClick} = this.props;
        return (
            <p onClick={onClick}>{text}</p>
        );
    }
}