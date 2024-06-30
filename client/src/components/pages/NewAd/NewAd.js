import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import AdForm from '../../features/AdForm/AdForm';
import { getUser } from "../../../redux/usersRedux";
import { addAdRequest } from '../../../redux/adsRedux';

const NewAdd = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const handleSubmit = (ad) => {
    const formData = new FormData();
    formData.append("title", ad.title);
    formData.append("content", ad.content);
    formData.append("publicationDate", ad.publicationDate);
    formData.append("price", ad.price);
    formData.append("image", ad.image);
    formData.append("location", ad.location);
    
    dispatch(addAdRequest(formData));

    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return(
    <Row>
        <Col className="col-12 col-sm-6 mx-auto">
          <h1 className="my-3">Add Ad</h1>
          <AdForm action={handleSubmit} />
        </Col>
    </Row>
  );
};

export default NewAdd;