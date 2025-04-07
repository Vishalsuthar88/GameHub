import React from 'react'
import { useSelector } from 'react-redux';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Library = () => {
  const bookmarks = useSelector((state) => state.bookmarks.items);

  return (
    <>
      <SignedIn>
        <Container className="py-4">
          <h2 className="mb-4 text-center">Your Library</h2>
          {bookmarks.length === 0 ? (
            <p>No games in your library yet.</p>
          ) : (
            <Row>
              {bookmarks.map((game) => (
                <Col key={game.id} xs={12} sm={6} md={4} lg={3} className='mb-4'>
                  <Link to={`/game-detail/${game.id}`} className='text-decoration-none text-dark'>
                    <Card style={{ height: '100%' }}>
                      <Card.Img variant='top' src={game.background_image} alt={game.name} />
                      <Card.Body>
                        <Card.Title>{game.name}</Card.Title>
                        <Card.Text>
                          <strong>Genres:</strong> {game.genres.map(g => g.name).join(', ')}<br />
                          <strong>Rating:</strong> {game.rating}<br />
                          <strong>Released:</strong> {game.released}<br />
                          <strong>Platforms:</strong> {game.platforms.map(p => p.platform.name).join(', ')}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
export default Library      