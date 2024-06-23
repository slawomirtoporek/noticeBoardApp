import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import AdsBoard from '../../features/AdsBoard/AdsBoard';


const Home = () => {

  const navigate = useNavigate();
  const user = useSelector(getUser);

  const handleClick = () => {
    navigate('/ad/add');
  };

  return(
    <>
      {user && (
        <Button onClick={handleClick}>
          Add ad
        </Button>
      )}
      <AdsBoard />
    </>
  );
};

export default Home;