import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "../SearchFormAd/SearchFormAd.module.scss";

const SearchFormAd = () => {

  const [searchPhrase, setSearchPhrase] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};

    if (!searchPhrase) {
      errors.search = "Phrase is required";
    };

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateFields()) {
      setStatus('loading');
      navigate(`/search/${encodeURIComponent(searchPhrase)}`);
    };
      
  };

  return (
    <Form onSubmit={handleSubmit} className="w-auto">

      {status === "loading" && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Form.Group className="mb-3 d-flex justify-content-between position-relative" controlId="formTitle">
        <Form.Control
          value={searchPhrase}
          name="search"
          type="text"
          placeholder="Search ads..."
          onChange={e => setSearchPhrase(e.target.value)}
        />
        {errors.search && (
          <small className={`d-block form-text text-danger mt-2 position-absolute ${styles.errorMsg}`}>
            {errors.search}
          </small>
        )}
      <Button variant="primary" type="submit" className="mx-2">
        Search
      </Button>
      </Form.Group>
    </Form>
  );
};

export default SearchFormAd;