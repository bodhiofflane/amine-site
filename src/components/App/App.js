import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { lazy, Suspense } from "react";

import './app.scss'

// Подключение компонентов.
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
//import RandomItems from '../RandomItems/RandomItems';
import Page404 from "../Page404/Page404";
import SinglePage from "../SinglePage/SinglePage";
import Spinner from "../Loading/Loading";

const RandomItems = lazy(() => import('../RandomItems/RandomItems'));
const SingleChar = lazy(() => import('../SingleChar/SingleChar'));
const SinglePerson = lazy(() => import('../SinglePerson/SinglePerson'));
const SearchPage = lazy(() => import('../SearchPage/SearchPage'));

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main className="main">
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<RandomItems />} />
                            <Route path="/anime/:animeId" element={<SinglePage />} />
                            <Route path="/character/:charId" element={<SingleChar />} />
                            <Route path="/person/:personId" element={<SinglePerson />} />
                            <Route path="/search/:searchWord" element={<SearchPage />} />
                            <Route path="*" element={<Page404 message={'This page does not exist'} />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
