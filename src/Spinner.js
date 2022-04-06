import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './utils';

class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinCount: 1,
            view: { h: 0, w: 0 }, 
            data: []
        }
    }

    componentDidCatch(error, info) {
        console.log("Error", error, info);
    }

    setSize() {
        const height = window.innerHeight - 2;
        const width = window.innerWidth - 2;
        this.setState({ 
            view: { h: height, w: width },
        });
    }

    componentDidMount() {
        this.setSize();
        let url = Utils.getQueryParameter('url');
        if (!url) {
            let path = document.location.pathname;
            if (!path.endsWith("/")) {
                path += "/";
            }
            url = path + 'spinners/default.json';
        }
        console.log('Loading', url)
        fetch(url, {method: 'GET'}).
        then(res => res.text()).
        then(body => {
            try {
                console.log("Content", body);
                const json = JSON.parse(body);
                console.log("Loaded", json);
                this.setState({
                    data: json
                });
            } catch (e) {
                console.error("Error", e);
            }
        }).catch(e => {
            window.alert(`Unable to read data from ${url} : ${e}`);
            console.error("Error", e);
        })
    }

    cacluatePointOnCircle(deg, radius) {
        // 𝑥=𝑟 sin𝜃, 𝑦 = 𝑟 cos𝜃.
        const piFactor = (Math.PI / 180);
        const rad = deg * piFactor;
        return { 
            x: Math.cos(rad) * radius, 
            y: Math.sin(rad) * radius
        };
      }
  
      createLinesAlongCurve(center, startDeg, endDeg, radius) {
          const deltaDeg = 5;
          let data = "M " + center.x + " " + center.y + " \n";
          for(let i = startDeg; i < (endDeg + deltaDeg); i = i + deltaDeg) {
              const deg = Math.min(i, endDeg);
              const p = this.cacluatePointOnCircle(deg, radius);
              let x = center.x + p.x;
              let y = center.y + p.y;
              data += " L " + x + " " + y + " \n";
          }
          return data + " z";
    }
 
    renderSlice(center, radius, slice, ringNumber, ringCount, sliceNumber, numberOfSlices) {
        const sliceWidth = radius - (radius/ringCount) *  ringNumber;
        const key = "r" + ringNumber + "s" + sliceNumber;
        const pieSize = 360 / (numberOfSlices);
        const halfSlice = pieSize / 2;
        return (
            <g key={"g" + key} transform={"rotate(" + (pieSize * sliceNumber) + " " + center.x  + " " + center.y + ")"}>
                <path key={"p" + key} d={this.createLinesAlongCurve(center, -halfSlice, halfSlice, sliceWidth)}
                    fill={Utils.getColor(sliceNumber, numberOfSlices)} stroke="#000" strokeWidth={1}/>
                <text key={"t" + key} x={center.x + sliceWidth - 25} y={center.y} textAnchor="end" fontSize="1.15em">{slice}</text>
            </g>
        );
    }


    renderSpinners() {
        const ringCount = this.state.data.length;
        const viewPort = this.state.view;
        let radius = viewPort.h / 2;
        let center = { 
            x: viewPort.w / 2,
            y: viewPort.h / 2
        };

        if (viewPort.w < viewPort.h) {
            radius = viewPort.w - 50;
            center.x = 25;
        }
        console.log(viewPort, radius, center);

        return this.state.data.map((spinner, ringNumber) => {
            let isBackwards = ringNumber % 2 == 0 ? 1 : -1;
            let randomRotation =  Math.round(720 + 360 * Math.random());
            let centerStringPx = " " + Math.round(center.x) + "px " + Math.round(center.y) + "px";
            let sliceSize = Math.round(360 / spinner.length);
            let snap = sliceSize - (randomRotation % sliceSize);
            
            let className = "cssRule" + ringNumber;
            Utils.addRule(className,
                ` @keyframes ${className} {
                    0% {
                        transform:rotate(0deg);
                        transform-origin: ${centerStringPx};
                    } 
                    100% {
                        transform:rotate(${(randomRotation+snap) * isBackwards}deg);
                        transform-origin: ${centerStringPx};
                    }
                }`,
                ` .${className} { 
                    background: red;
                    animation-name: ${className};
                    animation-duration: 4s;
                    animation-fill-mode: forwards;
                }`);

            
            return (
                <g key={"g" + ringNumber + "_" + this.state.spinCount} className={className}>
                    <g key={"ring" + ringNumber + "_" + this.state.spinCount}>
                        {
                        spinner.map((slice,sliceNumber) => {
                            return this.renderSlice(center, radius, slice, ringNumber, ringCount, sliceNumber, spinner.length);
                        })}
                    </g>
               </g>
            );
        });
    }

    render() {
        return (
            <div onMouseUp={(e) => this.refresh()}>
                <svg key={"s" + this.state.spinCount} width={this.state.view.w} height={this.state.view.h}>
                    {this.renderSpinners()}
                </svg>
            </div>
        );
    }

    refresh() {
        this.setSize();
        let spinCount = this.state.spinCount + 1;
        this.setState({
            spinCount: spinCount
        });
    }
}

export default Spinner;