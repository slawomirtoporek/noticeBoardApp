import { IMG_URL } from "../../../config";
import { Card, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import styles from './AdViewShort.module.scss';

const AdViewShort = ({ id, title, image, location }) => {

  const srcImage = `${IMG_URL}${image}`;
  const urlAd = `/api/ad/${id}`;

  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={srcImage} className={styles.imageAd} />
      <Card.Body>
        <Card.Title>{ title }</Card.Title>
        <Card.Text>{ location }</Card.Text>
        <Button variant="primary" as={NavLink} to={urlAd} className="float-end" >Read more</Button>
      </Card.Body>
    </Card>
  );
};

export default AdViewShort;