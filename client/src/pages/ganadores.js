import React from "react";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import ReactTable from "react-table-6";

import { Row, Col, Button } from "reactstrap";

class Ganadores extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: []
    };
  }

  componentDidMount() {
    setAuthToken(localStorage.tokenUser);
    axios
      .get("/api/user/all")
      .then(res => {
        console.log(res);
        this.setState({
          user: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="content">
        <Row md="12" className="ml-auto mr-auto mt-5">
          <Col md="12">
            <h3 className="info-title">Ganadores</h3>
          </Col>
        </Row>
        <Row md="12" className="ml-auto mr-auto mt-5">
          <Col md="12">
            <ReactTable
              data={this.state.user}
              filterable
              resizable={false}
              columns={[
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Money",
                  accessor: "money"
                },
                {
                  Header: "Actions",
                  Cell: row => (
                    <div>
                      <Button
                        className="btn-fill"
                        color="primary"
                        type="submit"
                      >
                        Jugar
                      </Button>
                    </div>
                  )
                }
              ]}
              defaultPageSize={5}
              showPaginationTop
              showPaginationBottom={false}
              className="-striped -highlight"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Ganadores;
