import React, { useState, useEffect } from 'react';
import { fetchGameDetail } from '../api/rawg';
import { Card, Container, Spinner, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../redux/bookmarkSlice';

const GameDetail = () => {
    const dispatch = useDispatch();
    const bookmarks = useSelector(state => state.bookmarks.items);
    const { id } = useParams();

    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGame = async () => {
            const data = await fetchGameDetail(id);
            setGame(data);
            setLoading(false);
        };
        loadGame();
    }, [id]);

    if (loading) {
        return (
            <Container className='text-center mt-5'>
                <Spinner animation="border" />
            </Container>
        );
    }

    if (!game) {
        return <Container className='mt-5'>Game not found.</Container>;
    }

    const isBookmarked = bookmarks.some((b) => b.id === game.id);

    const handleBookmarkToggle = () => {
        if (isBookmarked) {
            dispatch(removeBookmark(game.id));
        } else {
            dispatch(addBookmark(game));
        }
    };

    return (
        <Container className='py-4'>
            <h2 className='text-center'>Game Detail Page</h2>
            <Card>
                <Card.Img variant="top" src={game.background_image} />
                <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <Card.Text>
                        <strong>Released:</strong> {game.released}<br />
                        <strong>Genres:</strong> {game.genres?.map(g => g.name).join(', ')}<br />
                        <strong>Rating:</strong> {game.rating} / {game.rating_top}<br />
                        <strong>Tags:</strong> {game.tags?.map(t => t.name).join(', ')}<br /><br />
                        <strong>Description:</strong>
                    </Card.Text>
                    <div dangerouslySetInnerHTML={{ __html: game.description }} />
                    <Button
                        variant={isBookmarked ? 'danger' : 'success'}
                        onClick={handleBookmarkToggle}
                    >
                        {isBookmarked ? 'Remove from Library' : 'Add to Library'}
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default GameDetail;
