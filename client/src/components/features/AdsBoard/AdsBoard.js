import { useDispatch, useSelector } from "react-redux";
import { fetchAds, getAds } from "../../../redux/adsRedux";
import { useEffect, useState } from "react";
import AdsGrid from "../AdsGrid/AdsGrid";
import { Spinner } from "react-bootstrap";

const AdsBoard = () => {

  const [listAds, setListAds] = useState([]);
  const dispatch = useDispatch();
  const ads = useSelector(getAds);
  
  useEffect(() => {
    if (ads && Array.isArray(ads)) {
      const sortedAds = [...ads].sort((x, y) => new Date(x.publicationDate) - new Date(y.publicationDate));
      setListAds(sortedAds);
    };
  }, [ads]);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  if (!listAds) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  };
  
  return (
    <AdsGrid ads={listAds} />
  );
};

export default AdsBoard;