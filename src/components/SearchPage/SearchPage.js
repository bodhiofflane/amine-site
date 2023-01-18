import { useCallback, useEffect, useState, useContext, useReducer } from "react";
import { Link, useParams } from "react-router-dom";

import useTransfomData from "../../Hooks/useTransformData";
import { viewContent } from "../../utilits/viewContent";

import SearchBar from "../SearchBar/SearchBar";

// Импортирую созданный контекст.
import { FilterContext } from "../../context/context";

import './searchPage.scss';

const SearchPage = () => {

    const { searchWord } = useParams();

    const [data, setData] = useState(null)
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);


    // Фильтры.
    const [filtrationInfo, dispatchDataFilter] = useReducer(filterReducer, 'noFilter');

    function filterReducer(state, action) {
        switch (action) {
            case 'date':
                console.log(state)
                return 'date';
            case 'rating':
                console.log(state)
                return 'rating';
            case 'score':
                return 'score';
            default:
                throw new Error('Imposibble error in filterReducer');
        }
    }

    const { getAnimeBySearch, process, setProcess } = useTransfomData();

    const getData = useCallback(() => {
        getAnimeBySearch(searchWord, page, filtrationInfo)
            .then(res => {
                setData(res.data);
                setPagination(res.pagination)
                setProcess('complited');
            });
    }, [getAnimeBySearch, searchWord, setProcess, page, filtrationInfo])

    useEffect(() => {
        getData()
    }, [getData])

    // Передача поискового слова с помощью функции. Т.к. использовал ...rest.
    const getSearchWord = () => searchWord;
    const getPagination = () => pagination;

    return (
        <>
            <FilterContext.Provider value={{
                filtrationInfo,
                dispatchDataFilter
            }}>
                {viewContent(process, Content, data, null, setPage, getSearchWord, getPagination)}
            </FilterContext.Provider>
        </>

    );

}
export default SearchPage;

const Content = ({ data, functions }) => {

    const { filtrationInfo, dispatchDataFilter } = useContext(FilterContext)

    const [setPage, getSearchWord, getPagination] = functions;

    // Пагинация с сервера.
    const { current_page, items } = getPagination();

    return (

        <>
            <h1 className="general-title">Поиск по запросу: {getSearchWord()}</h1>
            <div className="search-page">
                <div className="search-page__filter">


                    <button
                        className={filtrationInfo === 'date' ? 'toggle active' : 'toggle'}
                        onClick={() => dispatchDataFilter('date')}
                    >
                        Sort by date
                    </button>
                    <button
                        className={filtrationInfo === 'rating' ? 'toggle active' : 'toggle'}
                        onClick={() => dispatchDataFilter('rating')}
                    >
                        Sort by rating
                    </button>
                    <button
                        className={filtrationInfo=== 'score' ? 'toggle active' : 'toggle'}
                        onClick={() => dispatchDataFilter('score')}
                    >
                        Sort by score
                    </button>

                    <div className="random__random-navigation">
                        <SearchBar />
                    </div>
                </div>

                <div className="search-page__container">
                    {
                        data.map(item => {
                            return (
                                <Link key={item.id} className="char-list__link" to={`/anime/${item.id}`}>
                                    <div className="char-list__char-card">
                                        <img style={{ 'height': '250px' }} className="char-list__char-img" src={item.thumbnail} alt={item.name} />

                                        <div className="char-list__char-info">
                                            {
                                                item.title && item.title.length !== 0 ?
                                                    <p className="single__description no-border">
                                                        Anime name: <span className="single__important">{item.title}</span>
                                                    </p>
                                                    : null
                                            }
                                            {
                                                item.type && item.type.length !== 0 ?
                                                    <p className="single__description no-border">
                                                        Type: <span className="single__important">{item.type}</span>
                                                    </p>
                                                    : null
                                            }
                                            {
                                                item.aired && item.aired.length !== 0 ?
                                                    <p className="single__description no-border">
                                                        Aired: <span className="single__important">{item.aired}</span>
                                                    </p>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>

                <div className="search-page__button-group">
                    <button
                        className="btn no-border-radius"
                        onClick={() => {
                            return current_page === 1 ? null : setPage((prev) => prev + -1)
                        }}>Предыдущяя страница
                    </button>
                    <p style={{ 'textAlign': 'center' }} className="single__description no-border">
                        <span style={{ 'margin': 0 }} className="single__important">{current_page}</span>
                    </p>
                    <button
                        className="btn no-border-radius"
                        onClick={() => {
                            return current_page * 9 >= items.total ? null : setPage((prev) => prev + 1)
                        }}>Следующаяя страница
                    </button>
                </div>

            </div>
        </>
    );

}