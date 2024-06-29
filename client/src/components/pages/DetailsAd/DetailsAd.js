import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IMG_URL } from "../../../config";
import { Button, Card, ListGroup, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getAdById, fetchAds } from "../../../redux/adsRedux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faUser, faPhone, faCity, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import styles from "../DetailsAd/DetailsAd.module.scss";
import { formatDate } from "../../../utils/formatDate";
import RemoveAd from "../../features/RemoveAd/RemoveAd";

const DetailsAd = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { id } = useParams();
  const user = useSelector(getUser);
  const ad = useSelector((state) => getAdById(state, id));

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch, id]);

  
  useEffect(() => {
    if (ad === undefined) {
      navigate("/");
    };
  }, [ad, navigate]);

  if (!ad) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  };
  
  const isUserOwner = ad && ad.user && user && user.login  ===  ad.user.login;
  
  return (
    <>
      {ad ? 
          (
            <Row>
              <Col xs={12} md={12} lg={8} className="mx-auto">
                <Card>
                  {isUserOwner &&
                    (<Card.Header className="d-flex justify-content-between">
                      <Card.Text className="d-flex align-items-center m-0">{ad.title}</Card.Text>
                      <div>
                        <Button as={NavLink} to={`/ad/edit/${id}`} className="mx-3">Edit</Button>
                        <RemoveAd />
                      </div>
                    </Card.Header>)
                  }
                  <Card.Body>
                    <Row className="d-flex flex-row">
                      <Col xs={12} md={12} lg={8}>
                        <Card.Img variant="left" src={`${IMG_URL}${ad.image}`} className="w-100 h-100"/>
                      </Col>
                      <Col lg={4} xs={12} md={12}>
                        <ListGroup variant="flush" className={styles.listDetails}>
                          <Card.Title className={styles.headerAd}>{ad.title}</Card.Title>
                          <ListGroup.Item><FontAwesomeIcon icon={faCoins} className={styles.icon} />{ad.price}<span className="fs-4 ms-1">$</span></ListGroup.Item>
                          <ListGroup.Item><FontAwesomeIcon icon={faCity} className={styles.icon} />{ad.location}</ListGroup.Item>
                          <ListGroup.Item><FontAwesomeIcon icon={faCalendarDays} className={styles.icon} />{formatDate(ad.publicationDate)}</ListGroup.Item>
                        </ListGroup>
                        <ListGroup variant="flush" className={styles.listDetails}>
                          {ad && ad.user && (
                            <div className="d-flex flex-row align-items-center my-4">
                              <Card.Img variant="left" src={`${IMG_URL}${ad.user.avatar}`} className={styles.userAvatar} />
                              <div className="d-flex flex-column w-100">
                                <ListGroup.Item className={styles.userData}><FontAwesomeIcon icon={faUser} className={styles.icon} />{ad.user.login}</ListGroup.Item>
                                <ListGroup.Item className={styles.userData}><FontAwesomeIcon icon={faPhone} className={styles.icon} />{ad.user.phoneNumber}</ListGroup.Item>
                              </div>
                            </div>
                          )}
                        </ListGroup>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Body>
                    <Row>
                        <Col xs={12} md={12} lg={9}>
                          <Card.Text>
                            {ad.content}
                          </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )
        :
        <NotFound />
      }
    </>
  );
};

export default DetailsAd;