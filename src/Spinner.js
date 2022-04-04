import React from 'react';


class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidCatch(error, info) {
        console.log("Error", error, info);
    }

    componentDidMount() {
        const url = '/spinners/key_n_positions.json';
        fetch(url, {method: 'GET'}).
        then(res => {
            try {
                console.log(res.status);
                //const data = res.json();
                //console.log(data)
            } catch (e) {
                console.log("Error", e);
            }
        }).catch(e => {
            console.log("Error", e);
        })
    }

    render() {
        return (<div>{JSON.stringify(this.state.data)}</div>);
    }
}

export default Spinner;