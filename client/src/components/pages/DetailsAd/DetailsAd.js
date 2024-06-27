import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IMG_URL } from "../../../config";
import { Button, Card, ListGroup, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAdByIdDetails, getAds, getUser } from "../../../redux/adsRedux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faUser, faPhone, faCity, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import styles from "../DetailsAd/DetailsAd.module.scss";
import { formatDate } from "../../../utils/formatDate";

const DetailsAd = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const ad = useSelector(getAds);
  const user = useSelector(getUser);
  console.log(user.login);

  useEffect(() => {
    dispatch(getAdByIdDetails(id));
  }, [dispatch, id]);

  return (
    <>
      { ad ? 
          (
            <Row>
              <Col xs={12} md={12} lg={8} className="mx-auto">
                <Card>
                  {ad.user && ad.user.login === user.login &&
                    (<Card.Header className="d-flex justify-content-between">
                      <Card.Text className="d-flex align-items-center m-0">{ad.title}</Card.Text>
                      <div>
                        <Button as={NavLink} to={`/ad/edit/${id}`} className="mx-3">Edit</Button>
                        <Button as={NavLink} to={`/ad/remove/${id}`} variant="danger">Delete</Button>
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
                          {ad.user && (
                            <div className="d-flex flex-row align-items-center my-4">
                              <>
                                <Card.Img variant="left" src={`${IMG_URL}${ad.user.avatar}`} className={styles.userAvatar} />
                              </>
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