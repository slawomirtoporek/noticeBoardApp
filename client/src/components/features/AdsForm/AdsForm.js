import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AdForm = ({ action, ...data }) => {

  const initialState = {
    title: data.title || "",
    content: data.content || "",
    publicationDate: new Date(),
    image: data.image || null,
    price: data.price || "",
    location: data.location || "",
  };

  const [inputFields, setInputFields] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setInputFields((prevFields) => ({ ...prevFields, image: file }));
    setErrors((prevErrors) => ({ ...prevErrors, image: null }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!inputFields.title) {
      newErrors.title = "Title is required";
    } else if (inputFields.title.length < 10) {
      newErrors.title = "Title should be at least 10 characters long";
    } else if (inputFields.title.length > 50) {
      newErrors.title = "Title should not exceed 50 characters";
    }

    if (!inputFields.content) {
      newErrors.content = "Content is required";
    } else if (inputFields.content.length < 20) {
      newErrors.content = "Content should be at least 20 characters long";
    } else if (inputFields.content.length > 1000) {
      newErrors.content = "Content should not exceed 1000 characters";
    }

    if (!inputFields.price) {
      newErrors.price = "Price is required";
    }

    if (!inputFields.location) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      action(inputFields);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={inputFields.title}
          name="title"
          type="text"
          placeholder="Enter title"
          onChange={handleInput}
        />
        {errors.title && (
          <small className="d-block form-text text-danger mt-2">
            {errors.title}
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formContent">
        <Form.Label>Content</Form.Label>
        <Form.Control
          value={inputFields.content}
          name="content"
          type="text"
          placeholder="Enter content"
          onChange={handleInput}
        />
        {errors.content && (
          <small className="d-block form-text text-danger mt-2">
            {errors.content}
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          name="image"
          onChange={handleImage}
        />
        {errors.image && (
          <small className="d-block form-text text-danger mt-2">
            {errors.image}
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          value={inputFields.price}
          name="price"
          type="number"
          placeholder="Enter price"
          onChange={handleInput}
        />
        {errors.price && (
          <small className="d-block form-text text-danger mt-2">
            {errors.price}
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          value={inputFields.location}
          name="location"
          type="text"
          placeholder="Enter location"
          onChange={handleInput}
        />
        {errors.location && (
          <small className="d-block form-text text-danger mt-2">
            {errors.location}
          </small>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Confirm
      </Button>
    </Form>
  );
};

export default AdForm;