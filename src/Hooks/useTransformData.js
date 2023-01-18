import { useCallback } from 'react';

import useHttp from './useHttp';

const _apiRandomAnime = 'https://api.jikan.moe/v4/random/anime';
const _apiGetAnimeById = 'https://api.jikan.moe/v4/anime/';

const useTransfomData = () => {

    const {request, process, setProcess} = useHttp();

    const getRandomAnime = useCallback(async () => {
        const res = await request(_apiRandomAnime);
        console.log('Произошла трансофрмация');
        return _transformDataAnime (res);
    }, [request])

    const getAnimeById = useCallback(async (id) => {
        const res = await request(`${_apiGetAnimeById}${id}`)
        return _transformDataAnime (res)
    }, [request])

    const getAnimeCharacters = useCallback(async (id) => {
        const res = await request(`https://api.jikan.moe/v4/anime/${id}/characters`);
        //return res
        return _transformDataCharacters(res.data);
    }, [request])

    const getCharacter = useCallback(async (id) => {
        const res = await request(`https://api.jikan.moe/v4/characters/${id}`);
        return _transformCharacter(res);
    }, [request])

    const getPerson = useCallback(async (id) => {
        const res = await request(`https://api.jikan.moe/v4/people/${id}`);
        return _transformPerson(res);
    }, [request])

    const getAnimeBySearch = useCallback(async(word, page, filtrationInfo) => { 
        const filter = (filtrationInfo) => {
            switch(filtrationInfo) {
                case 'noFilter': return '';
                case 'date': return '&order_by=start_date';
                case 'rating': return '&order_by=rating';
                case 'score': return '&order_by=score';
                default: throw new Error('Imposibble error in getAnimeBySearch')
            }
        }
        const res = await request(`https://api.jikan.moe/v4/anime?q=${word}&limit=9&page=${page}${filter(filtrationInfo)}`);
        return _transformSearchData(res);
    }, [request])



    const _transformDataAnime = (res) => {
        return {
            id: res.data.mal_id,
            title: res.data.title_english || res.data.title || res.data.title_japanese,
            description: res.data.synopsis,
            thumbnail: res.data.images.webp.large_image_url,
            genres: res.data.genres,
            aired: res.data.aired.string,
            // For singlePage.
            score: res.data.score,
            rank: res.data.rank,
            popularity: res.data.popularity,
            members: res.data.members,
            type: res.data.type,
            episodes: res.data.episodes,
            status: res.data.status,
            //producers: res.data.produsers.name || 'No information',
            studios: res.data.studios,
            source: res.data.source,
            duration: res.data.duration,
            themes: res.data.themes,
            rating: res.data.rating,
            demographics: res.data.demographics,
            background: res.data.background,
            trailer: res.data.trailer,
        }
    }

    const _transformDataCharacters = (res) => {
        return res.map(item => {
            return {
                charId: item.character.mal_id,
                url: item.character.url,
                name: item.character.name,
                thumbnail: item.character.images.webp.image_url,
                role: item.role,
                voiceActors: item.voice_actors.find(item => item.language === 'Japanese'),
            }
        })
    }

    const _transformCharacter = (res) => {
        if(typeof res === 'undefined') throw new Error('anus')
        return {
            name: res.data.name,
            nameKanji: res.data.name_kanji,
            about: res.data.about,
            favorites: res.data.favorites,
            thumbnail: res.data.images.webp.image_url,
            nicknames: res.data.nicknames,
            url: res.data.url,
        }
    }

    const _transformPerson = (res) => {
        return {
            name: res.data.name,
            givenName: res.data.given_name,
            familyName: res.data.family_name,
            about: res.data.about,
            thumbnail: res.data.images.jpg.image_url,
            birthday: new Date(res.data.birthday).toDateString(),
            altName: res.data.alternate_names,
            favorites: res.data.favorites,
            website: res.data.website_url

        }
    }

    const _transformSearchData = (res) => {
        return {
            pagination: res.pagination,
            data :res.data.map(item => {
                return {
                    id: item.mal_id,
                    thumbnail: item.images.webp.large_image_url,
                    title: item.title,
                    type: item.type,
                    //status: item.status,
                    aired: item.aired.string
                }
            })
        }
    }

    return {getRandomAnime, getAnimeById, getAnimeCharacters, getCharacter, getPerson, getAnimeBySearch, process, setProcess}

}

export default useTransfomData;
