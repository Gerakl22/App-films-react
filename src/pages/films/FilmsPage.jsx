import React from 'react';

import { FilmsForm } from './FilmsForm';
import { Button } from '../../common/components/Button/Button';

import { getFilm, addFilm, deleteFilm, editFilm } from './server';
import { add, remove, update } from '../../common/utils/state';


import "./FilmsPage.css"


const FilmsPageMode = {
    ADD: "films_add",
    EDIT: "films_edit",
    LIST: "films_list",
};


export class FilmsPage extends React.Component {
    state = {
        isLoading: true,
        error: null,
        films: null,

        mode: FilmsPageMode.LIST,

        selectFilmId: null,
    };

    makeRequest = async (requestFunction) => {
        this.setState({isLoading: true});

        try {
            await requestFunction();
        } catch(error) {
            this.setState(() => ({error}));
        } finally {
            this.setState({isLoading: false});
        }  
    };

    addedFilm = (filmToAdd) => {
            this.setState({mode: FilmsPageMode.LIST});
            this.makeRequest(async () => {
                const addedFilm = await addFilm(filmToAdd);
                this.setState(({films}) => ({films: add(films, addedFilm)}))
            });
    }

    updateFilm = (filmUpdate) => {
        this.setState({mode: FilmsPageMode.LIST});
        this.makeRequest(async () => {
            const updatedFilm = await editFilm(this.state.selectFilmId, filmUpdate);

            this.setState(({films}) => ({
                films: update(films, this.state.selectFilmId, updatedFilm),
                selectFilmId: null,
            }))
        })
    }


    componentDidMount() {

        this.makeRequest(async () => {
            const films = await getFilm();

            this.setState(() => ({films}))
        })

    }

    render() {
        if(this.state.isLoading) {
            return " ...Loading...";
        }

        if(this.state.error) {
            return "...Error..."
        }

        if(this.state.mode !== FilmsPageMode.LIST) {
            return <FilmsForm 
            films={this.state.selectFilmId && this.state.films.find((f) => f.id === this.state.selectFilmId)}
            onSave={this.state.mode === FilmsPageMode.ADD ? this.addedFilm : this.updateFilm}
            onCancel={() => this.setState({mode: FilmsPageMode.LIST})}
            />
        } 

        return (
            <>
            <Button kind='success' onClick={() => this.setState({mode: FilmsPageMode.ADD})}>Add film</Button>
            <table className="table-film">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Producer</th>
                        <th>Ranking(0-5)</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="tbody-film">
                    {this.state.films && this.state.films.map((film) => (
                        <tr key={film.id}>
                            <td>{film.title}</td>
                            <td>{film.year}</td>
                            <td>{film.producer}</td>
                            <td>{film.ranking}</td>
                            <td>{film.status}</td>
                            <td>
                                <button
                                onClick={() => this.setState({
                                    mode: FilmsPageMode.EDIT,
                                    selectFilmId: film.id,
                                })}
                                >Edit</button>
                            </td>
                            <td>
                                <Button
                                    kind='danger'
                                    onClick={ () => {
                                        this.makeRequest(async () => { 
                                            await deleteFilm(film.id);

                                        this.setState(({films}) => ({
                                            films: remove(films, film.id),
                                        }));

                                        })
                                    }}
                                >Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            </>
        )
    }
}