import React from 'react';
import { Button } from '../../common/components/Button/Button';

import './FilmsForm.css'


export class FilmsForm extends React.Component {
    state = {
        title: this.props.films ? this.props.films.title : "",
        year: this.props.films ? this.props.films.year : "",
        producer: this.props.films ? this.props.films.producer : "",
        ranking: this.props.films ? this.props.films.ranking : "",
        status: this.props.films ? this.props.films.status : '',
    }

    handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value,
        })
    }

    render() {
        return (
            <form className="form" onSubmit={(e) => {
                e.preventDefault();

            }}>
                <label>
                    Title:  
                    <input type="text" name="title" value={this.state.title} onChange={this.handleOnChange}/>
                </label>
                <label>
                    Year: 
                    <input type="number" name="year" value={this.state.year} onChange={this.handleOnChange}/>
                </label>
                <label>
                    Producer: 
                    <input type="text" name="producer" value={this.state.producer} onChange={this.handleOnChange}/>
                </label>
                <label>
                    Ranking: 
                    <select name="ranking" type="text" value={this.state.ranking} onChange={this.handleOnChange}>
                        {(!this.state.ranking) && <option value="">Ranking</option>}
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label>
                    Status:
                    <select name="status" type="text" value={this.state.status} onChange={this.handleOnChange}>
                        {(!this.state.status) && <option value="">Status</option>}
                        <option value="View">View</option>
                        <option value="No view">No view</option>
                        <option value="Want to view">Want to view</option>
                    </select>
                </label>
                <Button 
                    kind="change"
                    onClick={() => {
                    const ranking = Number(this.state.ranking);
                    this.props.onSave({
                        ...this.state,
                        ranking, 
                    });
                }}
                >
                    {this.props.films ? "Change" : "Add"}
                </Button>
                <button onClick={() => this.props.onCancel()}>Cancel</button>
            </form>
        )
    }
}