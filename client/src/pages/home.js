import React from "react";
import { connect } from "react-redux";
import { loadUser } from "../actions/authActions";

// reactstrap components
import { Row, Col } from "reactstrap";

class Home extends React.Component {
  componentWillMount() {
    this.props.loadUser();
    // eslint-disable-next-line
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8"></Col>
          </Row>
        </div>
      </>
    );
  }
}
export default connect(null, { loadUser })(Home);
