import React from 'react';
import ReactDOM from 'react-dom';
const COLORS = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#b15928"];

class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinCount: 1,
            view: {
                h: 0,
                w: 0,
            }, 
            center: {
                y: 0,
                x: 0,
            },
            data: []
        }
    }

    componentDidCatch(error, info) {
        console.log("Error", error, info);
    }

    setSize() {
        const height = window.innerHeight;
        const width = window.innerWidth;
        this.setState({ 
            view: {
                h: height,
                w: width
            },
            center: {
                y: height/2,
                x: 25
            }
        });
    }

    componentDidMount() {
        this.setSize();
        
        const url = 'spinners/key_n_positions.json';
        fetch(url, {method: 'GET'}).
        then(res => res.json()).
        then(json => {
            try {
                console.log("Loaded", json);
                this.setState({
                    data: json
                });
            } catch (e) {
                console.log("Error", e);
            }
        }).catch(e => {
            console.log("Error", e);
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
  
      createLinesAlongCurve(startDeg, endDeg, radius) {
          const CENTER = this.state.center;
          const deltaDeg = 5;
          let data = "M " + CENTER.x + " " + CENTER.y + " \n";
          for(let i = startDeg; i < (endDeg + deltaDeg); i = i + deltaDeg) {
              const deg = Math.min(i, endDeg);
              const p = this.cacluatePointOnCircle(deg, radius);
              let x = CENTER.x + p.x;
              let y = CENTER.y + p.y;
              data += " L " + x + " " + y + " \n";
          }
          return data + " z";
    }
 
    getColor(i, outOf) {
        if (COLORS.length == (outOf - 1)) {
            return COLORS[i % (COLORS.length - 1)];
        } else {
            return COLORS[i % COLORS.length];
        }
    }

    renderSlice(slice, ringNumber, ringCount, sliceNumber, numberOfSlices) {
        const pieWidth = this.state.view.w - this.state.center.x * 2;
        const sliceWidth = pieWidth - (pieWidth / ringCount) * ringNumber;
        const key = "r" + ringNumber + "s" + sliceNumber;
        const pieSize = 360 / (numberOfSlices);
        const halfSlice = pieSize / 2;
        return (
            <g key={"g" + key} transform={"rotate(" + (pieSize * sliceNumber) + " " + this.state.center.x  + " " + this.state.center.y + ")"}>
                <path key={"p" + key} d={this.createLinesAlongCurve(-halfSlice, halfSlice, sliceWidth)}
                    fill={this.getColor(sliceNumber, numberOfSlices)} stroke="#000" strokeWidth={1}/>
                <text key={"t" + key} x={sliceWidth} y={this.state.center.y} textAnchor="end" fontSize="1.15em">{slice}</text>
            </g>
        );
    }

    addRule(id, ...rules) {
        let styleEl = document.getElementById(id);
        if (styleEl) {
            document.head.removeChild(styleEl);
        }
        styleEl = document.createElement("style");
        styleEl.setAttribute("id", id);
        document.head.appendChild(styleEl);
        var styleSheet = styleEl.sheet;
        Object.values(rules).forEach((r,i) => {
            styleSheet.insertRule(r, i);
            console.log(r)
        });
        console.log(styleSheet);
    }


    renderSpinner(spinner, ringNumber, ringCount) {
        let isBackwards = ringNumber % 2 == 0 ? 1 : -1;
        let randomRotation =  Math.round(720 + 360 * Math.random());
        let centerString = " " + this.state.center.x + " " + this.state.center.y;
        let centerStringPx = " " + Math.round(this.state.center.x) + "px " + Math.round(this.state.center.y) + "px";
        let sliceSize = Math.round(360 / spinner.length);
        let snap = sliceSize - (randomRotation % sliceSize);
        
        let className = "cssRule" + ringNumber + "_" + this.state.spinCount;
        this.addRule(className,
            ` @keyframes ${className} {
                0% {
                    transform:rotate(0deg);
                    transform-origin: ${centerStringPx};
                } 
                35% {
                    transform:rotate(${randomRotation/2 * isBackwards}deg);
                    transform-origin: ${centerStringPx};
                } 
                90% {
                    transform:rotate(${randomRotation * isBackwards}deg);
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
            }`);

        //console.log(`slice = ${sliceSize} des=${randomRotation} snap=${snap}`);
        
        return (
            <g key={"g" + ringNumber + "_" + this.state.spinCount} className={className}>
                <g key={"ring" + ringNumber + "_" + this.state.spinCount} transform={"rotate(" +(randomRotation+snap)*isBackwards + " " + centerString +")"}>
                    {
                    spinner.map((slice,sliceNumber) => {
                        return this.renderSlice(slice, ringNumber, ringCount, sliceNumber, spinner.length);
                    })}
                </g>
           </g>
        );
    }

    renderSpinners() {
        return this.state.data.map((spinner, i) => {
            return this.renderSpinner(spinner, i, this.state.data.length);
        });
    }

    refresh() {
        this.setSize();
        let spinCount = this.state.spinCount + 1;
        this.setState({
            spinCount: spinCount
        });
        
        //console.log(spinCount);
    }

    render() {
        return (
            <div>
                <svg key={"s" + this.state.spinCount} width={this.state.view.w} height={this.state.view.h} onMouseUp={(e) => this.refresh()}>
                    {this.renderSpinners()}
                </svg>
            </div>
        );
    }
}

export default Spinner;