import React, { Component } from "react";
import { Row, Col, Card, CardHeader, CardText, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import { API } from "../config";
import instance from "../axios-orders";

class FileUpload extends Component {
  state = {
    documents: [],
  };

  deleteDocument = (id) => {
    instance
      .get("/api/document/" + id)

      .then((resData) => {
        this.setState({
          title: resData.post.title,
          author: resData.post.creator.name,
          image: "http://localhost:8090/" + resData.post.imageUrl,
          date: new Date(resData.post.createdAt).toLocaleDateString("en-US"),
          content: resData.post.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    instance.get("/document").then((res) => {
      this.setState({ documents: res.data });
    });
  }

  render() {
    return (
      <div className="bg-success">
        <Col xs="8">
          <Card>
            <CardHeader className="p-2 mb-2 bg-primary text-white" />
            <CardBody>
              <CardText>
                <table className="table table-stripe">
                  <thead>
                    <tr>
                      <th>Document Id</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.documents.map((document) => (
                      <tr>
                        <td>{document.document_id}</td>
                        <td>{document.description}</td>
                        <td>{document.name}</td>
                        <td>
                          <a href={document.fileLink} target="_blank">
                            View File
                          </a>
                        </td>
                        <td>
                          <Link
                            to={`api/document/${document._id}`}
                            class="btn btn-success"
                          >
                            Detail Description
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={this.deleteDocument.bind(
                              this,
                              document._id
                            )}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardText>
            </CardBody>
          </Card>
        </Col>

        <Row>
          <Col>
            <div class="float-sm-right m-b-sm">
              <h4>
                <Link
                  to={"/api/document/upload"}
                  className="btn btn-secondary btn-sm active"
                  role="button"
                  aria-pressed="true"
                >
                  Add a New Document
                </Link>
              </h4>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FileUpload;
