import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';

const CreateRecipePage = () => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const create_recipe = (data) => {
    console.log(data);
    const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    console.log(token);
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + JSON.parse(token),
      },
      body: JSON.stringify(data),
    };

    fetch("/recipe/recipies", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        reset()
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <h1>CreateRecipe Page</h1>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            {...register("title", { required: true, maxLength: 25 })}
          />
          {errors.title && (
            <p style={{ color: "red" }}>
              <small>title is required</small>
            </p>
          )}
          {errors.title?.type === "maxLength" && (
            <p style={{ color: "red" }}>
              <small>Max length is 8</small>
            </p>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            {...register("description", { required: true, maxLength: 233 })}
          />
          {errors.description && (
            <p style={{ color: "red" }}>
              <small>description is required</small>
            </p>
          )}
          {errors.description?.type === "maxLength" && (
            <p style={{ color: "red" }}>
              <small>Max length should be 255</small>
            </p>
          )}
        </Form.Group>
        <Form.Group>
          <Button
            as="sub"
            variant="primary"
            onClick={handleSubmit(create_recipe)}
          >
            Save
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateRecipePage;
