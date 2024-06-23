import { Row, Col } from "react-bootstrap";
import AdViewShort from '../AdViewShort/AdViewShort';

const AdsGrid = ({ ads = [] }) => {
  
  return (
    <>
      <Row>
        {
          ads.map((ad) => (
            <Col key={ad._id} lg={4}  md={6} xs={12} >
              <AdViewShort id={ad._id} title={ad.title} image={ad.image} location={ad.location} />
            </Col>
          ))
        }
      </Row>
    </>
  );
};

export default AdsGrid;