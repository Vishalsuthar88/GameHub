import React, { useEffect,useState } from 'react'
import Header from './Header';
import { fetchGames} from '../api/rawg';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
// const API_KEY=process.env.REACT_APP_RAWG_API_KEY;
const Home = () => {
    
    const [loading, setLoading] = useState(true);
    // const [searchQuery, setSearchQuery] = useState('');
    const [games, setGames] = useState([]);
     const loadGames = async(searchQuery='')=>{
        setLoading(true);
        const data = await fetchGames(searchQuery ? {search: searchQuery}:{});
        if(data && data.results){
            setGames(data.results);
        }
        setLoading(false);
    }
    const handleSearch = (query) => {
        loadGames(query);
      };
    useEffect(() => {
        loadGames(); 
      }, []);

   
   
  return (
    <>
    <Header onSearch={handleSearch} />
    <Container className='py-4'>
        <h3 className='mb-4'>
            GameHub - Top Games
        </h3>
        {loading? (
            <div className='text-center'>
                <Spinner animation='border' variant='primary'/>
            </div>
        ):(
            <Row>
                {games.map((game)=>(
                    <Col key={game.id} xs={12} sm={6} md={4} lg={3} className='mb-4'>
                    <Card style={{height:'100%'}}>
                        <Card.Img variant='top' src={game.background_image} alt={game.name}/>
                        <Card.Body>
                            <Card.Title>{game.name}</Card.Title>
                            <Card.Text>
                                {game.description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
        )}
    </Container>
  </>
  )
}

export default Home