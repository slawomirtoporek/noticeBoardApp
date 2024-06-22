import { useDispatch, useSelector } from "react-redux";
import { fetchAds, getAds } from "../../../redux/adsRedux";
import { useEffect, useState } from "react";
import AdsGrid from "../AdsGrid/AdsGrid";

const AdsBoard = () => {

  const [listAds, setListAds] = useState(null);
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
  
  return (
    <AdsGrid ads={listAds} />
  );
};

export default AdsBoard;