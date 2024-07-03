import { useDispatch, useSelector } from "react-redux";
import { fetchAds, getAds } from "../../../redux/adsRedux";
import { useEffect, useState } from "react";
import AdsGrid from "../AdsGrid/AdsGrid";
import { Spinner } from "react-bootstrap";

const AdsBoard = () => {

  const dispatch = useDispatch();
  const ads = useSelector(getAds);
  
  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);
  
  
  if (!ads) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  };
  
  const sortedAds = [...ads].sort((x, y) => new Date(x.publicationDate) - new Date(y.publicationDate));
  
  return (
    <AdsGrid ads={sortedAds} />
  );
};

export default AdsBoard;