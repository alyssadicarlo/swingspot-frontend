import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import './index.css';

const SearchForm = () => {

    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const _handleUpdate = async (newInput) => {
        if (newInput) {
            setLoading(true);
            setInput(newInput);
            const results = await _fetchResults(newInput);
            setResults(results);
            setLoading(false);
        } else {
            setInput(newInput);
            setResults([]);
        }
    }

    const _fetchResults = async (newInput) => {
        const response = await fetch(
            `http://localhost:3333/topics/?search=${newInput}`
        ).then(response => response.json());
        return response;
    }

    const debouncedCallback = debounce(_handleUpdate, 300);

    const debouncedUpdateHandler = useCallback(debouncedCallback, [debouncedCallback]);

    return (
        <>
            <header className="page-header">
                <h1>Search
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </h1>
            </header>
            <div className="search-box">
                <input className="search-input" type="text" placeholder="Search ↵" onChange={(event) => debouncedUpdateHandler(event.target.value)}/>
                <ul className="search-results">
                    {loading ? 
                        <li className="post-entry">Loading...</li>
                    :
                        (
                            results?.length > 0 && (
                                results.map(result => {
                                    return (
                                        <Link to={`/topics/${result.topic_data.slug}`} key={result.topic_data.id} >
                                            <li className="post-entry">
                                                <header className="entry-header">
                                                    {result.topic_data.name} »
                                                </header>
                                            </li>
                                        </Link>
                                    )
                                })
                            )
                        )}
                </ul>
            </div>
        </>
    )
}

export default SearchForm;