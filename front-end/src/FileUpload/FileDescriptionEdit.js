import React, { Component } from "react";
import axios from "axios";

import { API } from "../config";
import instance from "../axios-orders";

import { Card, CardHeader, CardText, CardBody, Row, Col } from "reactstrap";

class FileDescriptionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: {},
      url: "",
    };
  }

  onChange = (e) => {
    const state = this.state.document;
    state[e.target.name] = e.target.value;
    this.setState({
      document: state,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const description = this.state.document.description;

    axios
      .put("/api/document/edit/" + this.props.match.params.id, description)
      .then(() => {
        this.props.history.push("/");
      })
      .catch((error) => {
        alert("Oops some error happened, please try again");
      });
  };

  // When this DocumentEdit component mounts I want the existing 'description' to be fetched.
  componentDidMount() {
    instance.get("/document/" + this.props.match.params.id).then((res) => {
      this.setState({ document: res.data.doc });
      this.setState({ url: res.data.url });
    });
    console.log(this.state.document);
  }

  render() {
    const { description, name } = this.state.document;
    const url = this.state.url;

    return (
      <div>
        <Row>
          <Col xs="4">
            <Card>
              <CardHeader className="p-2 mb-2 bg-primary text-white">
                Edit the description field of this document
              </CardHeader>
              <CardBody>
                <CardText>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="description">Edit Description:</label>
                      <input
                        type="text"
                        value={description}
                        class="form-control"
                        name="description"
                        onChange={this.onChange}
                        placeholder=" Enter the new Description"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Edit Name:</label>
                      <input
                        type="text"
                        value={name}
                        class="form-control"
                        name="name"
                        onChange={this.onChange}
                        placeholder=" Enter the new Description"
                      />
                    </div>

                    <button type="submit" class="btn btn-primary">
                      Submit the updated Description
                    </button>
                    <img src={url} alt="" />
                  </form>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FileDescriptionEdit;
