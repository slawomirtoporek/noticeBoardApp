import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from "../../../redux/usersRedux";
import { Button, Row, Col } from 'react-bootstrap';
import SearchFormAd from "../SearchFormAd/SearchFormAd";
import styles from "../TopBar/TopBar.module.scss";

const TopBar = () => {
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const handleClick = () => {
    navigate('/ad/add');
  };

  return (
    <Row>
    <div className="d-flex justify-content-between">
      <Col lg={4} md={6} sm={6}>
      < SearchFormAd />
      </Col>
      {user && (
        <Col lg={3} md={3} sm={3} className="d-flex justify-content-end">
          <Button onClick={handleClick} className={styles.btnAddAd}>
            Add ad
          </Button>
        </Col>
      )}
    </div>
    </Row>
  );
};

export default TopBar;