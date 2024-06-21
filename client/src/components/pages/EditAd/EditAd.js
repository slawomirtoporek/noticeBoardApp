import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import AdForm from '../../features/AdForm/AdForm';
import { getUser } from '../../../redux/usersRedux';
import { editAdRequest, fetchAds, getAdById } from '../../../redux/adsRedux';

const EditAd = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const dataAd = useSelector((state) => getAdById(state, id));

  const handleSubmit = (ad) => {
    const formData = new FormData();
    formData.append("title", ad.title);
    formData.append("content", ad.content);
    formData.append("publicationDate", ad.publicationDate);
    formData.append("price", ad.price);
    if (ad.image) {
      formData.append("image", ad.image);
    };
    formData.append("location", ad.location);

    dispatch(editAdRequest(formData, id));
    
    navigate("/");
  };

  useEffect(() => {

    // if (!user || dataAd.user._id !== user.id) {
    //   navigate("/");
    // };

    if (dataAd && Object.keys(dataAd).length === 0) {
      navigate("/");
    };

    if (!dataAd || (dataAd && Object.keys(dataAd).length === 0)) {
      dispatch(fetchAds());
    };
  }, [dataAd, dispatch, navigate, user]);
  return(
    <Row>
        <Col className="col-12 col-sm-3 mx-auto">
          <h1 className="my-3">Edit Ad</h1>
          <AdForm action={handleSubmit} {...dataAd} />
        </Col>
    </Row>
  );
};

export default EditAd;