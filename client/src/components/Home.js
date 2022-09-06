import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Recipe from "./Recipe";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const LoggedInHome = () => {
  const [recipies, setRecipies] = useState([]);
  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState(0);
  const navigate = useNavigate();
  const {
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("/recipe/recipies")
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
        setRecipies(data);
      })
      .catch((err) => console.error(err));
  }, []);
  const getAllRecipies = () => {
    fetch("/recipe/recipies")
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      setRecipies(data);
    })
    .catch((err) => console.error(err));
  
  };
  const closeModel = () => {
    setShow(false);
  };
  const showModal = (id) => {
    setRecipeId(id);
    setShow(true);
    recipies.map((recipe) => {
      if (recipe.id === id) {
        setValue("title", recipe.title);
        setValue("description", recipe.description);
      }
    });
  };
  const update_recipe = (data) => {
    console.log(data);
    let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    const requestOptions = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(token),
      },
      body: JSON.stringify(data),
    };
    fetch(`/recipe/recipe/${recipeId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const reload = window.location.reload();
        reload();
      })
      .catch((error) => console.error(error));
    setShow(false);
  };
  const deleteRecipe = (id) => {
    console.log(`deleting ${id}`);
    console.log(id);
    let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(token),
      },
      body: JSON.stringify(id),
    };
    fetch(`/recipe/recipe/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const reload = window.location.reload();
        reload();
      })
      .catch((error) => console.error(error));
  };
  const deletefunc = (id) => {
    console.log('deleting function');
    console.log(id);
    let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(token)
      }
    };
    fetch(`/recipe/recipe/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getAllRecipies();
      })
      .catch((error) => console.error(error));

  }
  return (
    <div className="recipies">
      <Modal show={show} size="lg" onHide={closeModel}>
        <Modal.Header CloseButton>
          <Modal.Title>Update Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                onClick={handleSubmit(update_recipe)}
              >
                Save
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <h1>List of Recipies</h1>
      {recipies.map((recipe, index) => (
        <Recipe
          title={recipe.title}
          key={index}
          description={recipe.description}
          onClick={() => {
            showModal(recipe.id);
          }}
          onDelete={() => {
            // deleteRecipe(recipe.id);
            deletefunc(recipe.id)
          }}
        />
      ))}
    </div>
  );
};
const LoggedOutHome = () => {
  return (
    <div className="home container">
      <h1 className="heading">Welcome to the Recipies</h1>
      <Link to="/signup" className="btn btn-primary  btn-lg">
        Getting Started
      </Link>
    </div>
  );
};

const HomePage = () => {
  const [logged] = useAuth();
  return (
    //  {logged?<loggedInHome/>:<loggedOutHome/>}
    <div>{logged ? <LoggedInHome /> : <LoggedOutHome />}</div>
  );
};

export default HomePage;
