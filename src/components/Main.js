require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
//获取图片数据
let imageDatas=require("../data/imageDatas.json");

//利用自执行函数，将图片的信息转换为图片的url信息
imageDatas=((imageDatasArr) =>{
  for(let i=0,j=imageDatasArr.length;i<j;i++){
    let singleImageData=imageDatasArr[i];

    singleImageData.imageURL=require('../images/'+singleImageData.fileName);

    imageDatasArr[i]=singleImageData;
  }

  return imageDatasArr;
})(imageDatas);
var ImgFigure=React.createClass({
  render:function(){
    return(
      <figure className="img-figure">
        <img src={this.props.data.imageURL} data={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
})
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.Constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: { //水平方向的取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: { //垂直方向
        x: [0, 0],
        topY: [0, 0]
      }
    };

    this.state = {
      imgsArrangeArr: [

      ]
    };
  }
  rearrange(centerIndex){
    let imgsArrangeArr=this.state.imgsArrangeArr,
      Constant=this.Constant,
      centerPos=Constant.centerPos,
      hPosRange=Constant.hPosRange,
      vPosRange=Constant.vPosRange,
      hPosRangeLeftSecX=hPosRange.leftSecX,
      hPosRangeRightSecX=hPosRange.rightSecX,
      hPosRangeY=hPosRange.y,
      vPosRangeTopY=vPosRange.topY,
      vPosRangeX=vPosRange.x,

        imgsArrageTopArr=[];
        topImgNum=Math.ceil(Math.random()*2), //取一个或者不取
        topImgSpliceIndex=0,
        imgsArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1);
        //首先居中centerIndex图片，centerIndex图片不需要旋转
        imgsArrangeCenterArr[0]={
            pos:centerPos,
            rotate:0,
            isCenter:true
        }

      //取出要布局上侧的图片的状态信息
        topImgSpliceIndex=Math.floor(Math.random()*(imgsArrangeArr.length-topImgNum));
        imgsArrageTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
        //布局位于上侧的图片
    imgsArrageTopArr.forEach((value,index)=>{
      imgsArrageTopArr[index]={
        pos:{
          top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
          left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
        },
        rotate:get30DegRandom(),
        isCenter:false
      }
    });
    //布局左两侧的图片
    for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLORX = null;

      //前半部分布局左边,右边部分布局右边
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX
      }
      imgsArrangeArr[i] = {
        pos: {
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      };
    }
    if (imgsArrangTopArr && imgsArrangTopArr[0]) {
      imgsArrangeArr.splice(topImgSpiceIndex, 0, imgsArrangTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });
  }

  /*利用rearramhe函数
   *居中对应index的图片
   *
   */
  center(index) {
    return () => {
      this.rearrange(index);
    }
  }


  //重新布局所有图片
 componentDidMount(){
    let stageDOM=ReactDOM.findDOMNode(this.refs.stage),
      //拿到舞台的大小
      stageW=stageDOM.scrollWidth,
      stageH=stageDOM.scrollHeight,
      halfStageW=Math.ceil(stageW/2),
      halfStageH=Math.ceil(stageH/2);
    //拿到一个imageFigure的大小
   let imageFigureDOM=React.findDOMNode(this.refs.imgFigure0),
     imgW=imgFigureDOM.scrollWidth,
     imgH=imgFigureDOM.scrollHeight,
     halfImgW=Math.ceil(imgW/2),
     halfImgH=Math.ceil(imgH/2);
   //计算中心图片的位置点
   this.Constant.centerPos={
     left:halfStageW-halfImgW,
     top:halfStageH-halfImgH
   }
   //计算左侧，右侧区域图片排布的取值范围
    this.Constant.hPosRange.leftSecX[0]=-halfImgW;
    this.Constant.hPosRange.leftSecX[1]=halfStageW-halfImgW*3;

    this.Constant.hPosRange.rightSecX[0]=halfStageW+halfImgW;
    this.Constant.hPosRange.rightSecX[1]=stageW-halfImgW;

    this.Constant.hPosRange.y[0]=-halfImgH;
    this.Constant.hPosRange.y[1]=stageH-halfImgH;
   //计算上侧区域图片排布的范围
    this.Constant.vPosRange.topY[0]= -halfImgH;
    this.Constant.vPosRange.topY[1]=halfStageH-halfImgH*3;

    this.Constant.vPosRange.x[0]=halfStageW-imgW;
    this.Constant.vPosRange.x[1]=halfStageW;
    let num=Math.floor(Math.random()*10);

 }
  render() {
    let controllerUnts=[],
    imgFigures=[];
    imageDatas.forEach((value,index) =>{
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index]={

        }
      }
      imgFigures.push(<ImgFigure data={value} key={index}/>)
    });

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnts}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
