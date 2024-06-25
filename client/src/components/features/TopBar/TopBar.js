import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../redux/usersRedux';
import { Button } from 'react-bootstrap';
import SearchFormAd from "../SearchFormAd/SearchFormAd";
import styles from "../TopBar/TopBar.module.scss";

const TopBar = () => {
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const handleClick = () => {
    navigate('/ad/add');
  };

  return (
    <div className="d-flex justify-content-between">
      <SearchFormAd />
      {user && (
        <Button onClick={handleClick} className={styles.btnAddAd}>
          Add ad
        </Button>
      )}
    </div>
  );
};

export default TopBar;