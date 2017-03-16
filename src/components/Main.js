require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/PicHeader.css');
require('styles/PicItem.css');
//require('styles/gallery.scss');

import React from 'react';
import URL from 'url';

let yeomanImage = require('../images/yeoman.png');
//获取图片相关数据
var imageDatas=require('../data/imageData.json');

//设置属性imageURL的值，这个值为图片的路径，由图片名信息转成
imageDatas=function getImageURL(imageDatasArr){
	for(var i=0;i<imageDatasArr.length;i++){
		var singleImageData=imageDatasArr[i];
		singleImageData.imageURL=require('../images/'+singleImageData.fileName);
		imageDatasArr[i]=singleImageData;
	}
	return imageDatasArr;
}(imageDatas);

var PicHeader=React.createClass({
//增加一个方法getLogo(),得到logo图片
	getLogo(){
		return(
			<div className="picHeader-logo">
				<a hrea="http://news.ycombinator.com/">
					<img id="picHeader-image" src={yeomanImage}/>
				</a>
			</div>
		);
	},
//增加一个getTitle(),返回一个标题
	getTitle(){
		return(
			<div className="picHeader-title">
				<a className="picHeader-textLink" href="https://news.ycombinator.com/">Hack News</a>
			</div>
		);
	},
	//增加一个getNav(),返回一个导航栏
	getNav(){
		var navLinks=[
		{
			name:'comments',
			url: 'piccomments'
		},
		{
			name:'ask',
			url: 'ask'
		},
		{
			name:'submit',
			url: 'submit'
		}
		];
		return(
			<div className='picHeader-nav'>
			{
				navLinks.map(function(navLink){
					return(
						<a key={navLinks.url} className='picHeader-navLink picHeader-textLink' href={'https://news.ycombinator.com/' + navLink.url} >
						{navLink.name}
						</a>
					);
				})
			}
			</div>
		);
	},
//添加getLogin(),返回一个登陆按钮
	getLogin(){
		return (
			<div className="picHeader-login">
				<a className="picHeader-textLink" id="picHeader-loginText" href="https://news.ycombinator.com/login?goto=news">login</a>
			</div>
		);
	},

	render() {
	    return (
	        <div className="picHeader">
	          {this.getLogo()}
	          {this.getTitle()}
	          {this.getNav()}
	          {this.getLogin()}
	        </div>
        );
  }
});

var PicItem=React.createClass({
	getDomain(){
		return URL.parse(this.props.item.url).hostname;
	},

	//增加一个getTitle(),返回包含了标题和地址的组件
	getTitle(){
		return(
			<div className="picItem-title">
				<a className="picItem-titleLink" href={this.props.item.url ? this.props.item.url : 'https://news.ycombinator.com/item?id=' + this.props.item.id}>{this.props.item.title}</a>
				<span className="picItem-domain">
					<a href={'https://news.ycombinator.com/from?site='+this.getDomain()}>{this.getDomain()}</a>
				</span>
			</div>
		);
	},

	//返回评论数
	getComment(){
		var commentText='discuss';
		if(this.props.item.kids&&this.props.item.kids.length)
			commentText=this.props.item.kids.length;
		return (
			<a>{commentText}</a>
		);
	},
	//返回分数，作者，评论数
	getSubtext(){
		return(
			<div className="picItem-subtext">
			{this.props.item.score}  points by {this.props.item.by} | {this.getComment()}
			</div>
		) ;
	},
	getRank(){
		return (
			<div className="picItem-rank">
				{this.props.rank}
			</div>
		);
	 },

	render() {
    	return (
        	<div className="picItem">
        		{this.getRank()}
        		<div className="picItem-itemText">
         			{this.getTitle()}
         			{this.getSubtext()}
         		</div>
        	</div>
        );
  }
});



class AppComponent extends React.Component {
  render() {
  	var testData={
		by:    'bane',
  		score:  55,
  		kids:[1,3,415,15161,224141],
  		title:  'This are many pictures!',
		url:   'https://news.ycombinator.com'
  	};
	

    return (
      <div className="picList">
      	<PicHeader/>
      	<PicItem item={testData} rank ={1}/>
        
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
//<img src={yeomanImage} alt="Yeoman Generator" />
//<div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
			
// var ImgFigure=React.createClass({
// 	render: function(){

// 		return (
// 			<figure>
			// <img src={this.props.data.imgURL}
		// 			 alt={this.props.data.title}
		// 		/>
// 				<figcaption>
// 					<h2>{this.props.data.title}</h2>
// 				</figcaption>
// 			</figure>
// 		)
// 	}
// });
// //管理图片
 //  	var controllerUnits=[],imgFigures=[];
	// imageDatas.forEach(function(value){
	// 	imgFigures.push(<ImgFigure data={value}/>)
	// });
	// <section className="stage">
        // 	<section className="img-sec">
        // 		{imgFigures}
        // 	</section>
        // </section>
        // <nav className="controller-nav">
        // 	{controllerUnits}
        // </nav>