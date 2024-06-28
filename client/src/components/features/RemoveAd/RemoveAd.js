import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteAd, getAds, getUser } from "../../../redux/adsRedux";

const RemoveAd = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const ad = useSelector(getAds);
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);


  const handleDeleteAd = () => {
    dispatch(deleteAd(id));
    navigate("/");
  };

  useEffect(() => {
    if(ad.user.login !== user.login) {
      navigate("/");
    };
  }, [navigate, ad, user]);

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