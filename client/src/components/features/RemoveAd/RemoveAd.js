import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteAd, getAdById, fetchAds } from "../../../redux/adsRedux";
import { getUser } from "../../../redux/usersRedux";

const RemoveAd = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const ad = useSelector((state) => getAdById(state, id));
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);


  const handleDeleteAd = () => {
    dispatch(deleteAd(id)).then(() => {
      dispatch(fetchAds());
      navigate("/");
    });
  };

  useEffect(() => {
    if(ad && ad.user && user && ad.user.login !== user.login) {
      navigate("/");
    };

    dispatch(fetchAds());
  }, [navigate, dispatch, ad, user]);

  
  if (!ad || !ad.user) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  };

  return(
    <>
      <Button onClick={handleShowModal} variant="danger">Delete</Button>
      <Modal show={show} onClick={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The operation will completly remove this advertisment from the app. Are you sure you want to do that?</p>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteAd}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveAd;