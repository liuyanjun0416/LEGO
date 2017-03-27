import React, { Component, PropTypes} from 'react';

export default class AvatarCard extends Component {
    constructor(props){
        super(props);
    }
    static defaultProps = {
        imgWidth:"60px",
        imgHeight:"60px",
        imgSrc:"",
        imgLink:"javascript:;"
    }
    static propTypes = {
        imgWidth:PropTypes.string,
        imgHeight:PropTypes.string,
        imgSrc:PropTypes.string,
        imgLink:PropTypes.string,
        onClick:PropTypes.func
    }
    render(){
        const {imgSrc,imgLink,imgWidth,imgHeight,onClick} = this.props;
        const imgStyle = {
            width:imgWidth,
            height:imgHeight,
            borderRadius:parseInt(imgWidth,10)/2
        }
        return (
            <a href={imgLink} onClick={onClick}>
                <img src={imgSrc} alt="" style={imgStyle} />
            </a>
        );
    }
}