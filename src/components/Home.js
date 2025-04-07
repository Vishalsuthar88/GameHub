import React, { useEffect, useState } from 'react';
import Header from './Header';
import { fetchGames, fetchGenres } from '../api/rawg';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../redux/bookmarkSlice';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsBookmarkFill } from 'react-icons/bs';
import FilterSidebar from './FilterSidebar';

const Home = () => {
    const dispatch = useDispatch();
    const bookmarks = useSelector((state) => state.bookmarks.items);

    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(12);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genres, setGenres] = useState([]);

    const loadGenres = async () => {
        const data = await fetchGenres();
        if (data && data.results) {
            setGenres(data.results);
        }
    };

    const getGenreSlug = (genreName) => {
        const found = genres.find((g) => g.name === genreName);
        return found ? found.slug : null;
    };

    const loadGames = async (searchQuery = '', genreName = selectedGenre) => {
        setLoading(true);

        const genreSlug = getGenreSlug(genreName);

        const data = await fetchGames({
            search: searchQuery,
            page,
            page_size: pageSize,
            genres: genreSlug || undefined,
        });

        if (data && data.results) {
            setGames(data.results);
            setTotalPages(Math.ceil(data.count / pageSize));
        }

        setLoading(false);
    };

    const handleSearch = (query) => {
        setPage(1);
        loadGames(query);
    };

    useEffect(() => {
        loadGenres();
        loadGames();
    }, []);

    useEffect(() => {
        loadGames();
    }, [page, selectedGenre]);

    return (
        <>
            <Header onSearch={handleSearch} />
            <Row className='mt-5'>
            <Col md={2} className='mt-4' >
                <FilterSidebar
                    genres={genres}
                    selectedGenre={selectedGenre}
                    onGenreChange={(genre) => {
                        setSelectedGenre(genre);
                        setPage(1);
                    }}
                />
                </Col>
                <Col md={10}>
                    <Container className="py-4 mt-4">
                        <h3 className="mb-4 text-center">GameHub - Top Games</h3>
                        {loading ? (
                            <div className="text-center">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        ) : (
                            <>
                                <Row>
                                    {games.map((game) => {
                                        const isBookmarked = bookmarks.some((b) => b.id === game.id);
                                        return (
                                            <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                                <Card className="position-relative h-100">
                                                    <div
                                                        className="position-absolute top-0 end-0 p-2"
                                                        style={{ zIndex: 10 }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (isBookmarked) {
                                                                dispatch(removeBookmark(game.id));
                                                            } else {
                                                                dispatch(addBookmark(game));
                                                            }
                                                        }}
                                                        title={isBookmarked ? 'Remove from Library' : 'Add to Library'}
                                                    >
                                                        <BsBookmarkFill
                                                            size={24}
                                                            color={isBookmarked ? 'gray' : 'dodgerblue'}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                    <Link to={`/game-detail/${game.id}`} className="text-decoration-none text-dark">
                                                        <Card.Img variant="top" src={game.background_image} alt={game.name} />
                                                        <Card.Body>
                                                            <Card.Title>{game.name}</Card.Title>
                                                            <Card.Text>
                                                                <strong>Genres:</strong>{' '}
                                                                {game.genres?.map((g) => g.name).join(', ') || 'N/A'} <br />
                                                                <strong>Rating:</strong> {game.rating || 'N/A'} <br />
                                                                <strong>Released:</strong> {game.released || 'N/A'} <br />
                                                                <strong>Platforms:</strong>{' '}
                                                                {game.platforms?.map((p) => p.platform.name).join(', ') || 'N/A'}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Link>
                                                </Card>
                                            </Col>
                                        );
                                    })}
                                </Row>

                                <div className="d-flex justify-content-center mt-4">
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={page === 1}
                                    >
                                        Prev
                                    </button>
                                    <span className="align-self-center">Page {page} of {totalPages}</span>
                                    <button
                                        className="btn btn-primary ms-2"
                                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={page === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </Container>
                    </Col>
                    </Row>
               
        </>
    );
};

export default Home;
