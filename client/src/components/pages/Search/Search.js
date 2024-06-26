import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getAdsBySearch, getAds } from '../../../redux/adsRedux';
import AdsGrid from "../../features/AdsGrid/AdsGrid";
import { Spinner } from "react-bootstrap";

const Search = () => {
  const [listAds, setListAds] = useState([]);
  const dispatch = useDispatch();
  const { searchPhrase } = useParams();
  const foundAds = useSelector(getAds);

  useEffect(() => {
    if (foundAds && Array.isArray(foundAds)) {
      const sortedAds = [...foundAds].sort((x, y) => new Date(x.publicationDate) - new Date(y.publicationDate));
      setListAds(sortedAds);
    } else {
      setListAds([]);
    };
  }, [foundAds]);

  useEffect(() => {
    dispatch(getAdsBySearch(searchPhrase));
  }, [dispatch, searchPhrase]);

  if (!foundAds) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  };

  return(
    <>
      <p className="fs-6">Searched phrase: {searchPhrase}</p>
      {
        listAds.length ?
        (<AdsGrid ads={listAds} />) :
        `No ads found with the phrase ${searchPhrase}...`
      }
    </>
  );
};

export default Search;