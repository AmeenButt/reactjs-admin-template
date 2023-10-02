import basePath from "basePath";
import { color } from "global";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom/dist";
import { toast } from "react-toastify";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import baseUrl from "url";

const Header = () => {
  let navigator = useNavigate();
  let location = useLocation()
  const getData = async () => {
    try {
      // await fetch(`${baseUrl}profile/getAllUsers`).then(res => res.json()).then(response => {
      //   if (response.status) {
      //     localStorage.setItem('totalusers', response.count)
      //   }
      //   else {
      //     localStorage.setItem('totalQueries', 0)
      //   }
      // }).catch(err => {
      //   toast.error(err, {
      //     position: toast.POSITION.TOP_LEFT
      //   });
      //   navigator(`/${basePath}/auth/error`);

      // })
      // await fetch(`${baseUrl}workout_plan_exersises/getAllExersises`).then(res => res.json()).then(response => {
      //   console.log(response)
      //   if (response.status) {
      //     localStorage.setItem('totalExercises', response.count)
      //   }
      //   else {
      //     localStorage.setItem('totalExercises', 0)
      //   }
      // }).catch(err => {
      //   toast.error(err, {
      //     position: toast.POSITION.TOP_LEFT
      //   });
      //   navigator(`/${basePath}/error`);

      // })
      // await fetch(`${baseUrl}workout_category/getAllcategories`).then(res => res.json()).then(response => {
      //   if (response.status) {
      //     localStorage.setItem('totalCategories', response.count)
      //   }
      //   else {
      //     localStorage.setItem('totalCategories', 0)
      //   }

      // }).catch(err => {
      //   toast.error(err, {
      //     position: toast.POSITION.TOP_LEFT
      //   });
      //   navigator(`/${basePath}/error`);

      // })
      // await fetch(`${baseUrl}workout_plan/getAllWorkoutPlans`).then(res => res.json()).then(response => {

      //   if (response.status) {
      //     localStorage.setItem('totalPlans', response.count)
      //   }
      //   else {
      //     localStorage.setItem('totalPlans', 0)
      //   }
      // }).catch(err => {
      //   toast.error(err, {
      //     position: toast.POSITION.TOP_LEFT
      //   });
      //   navigator(`/${basePath}/error`);

      // })
    } catch (err) {
      toast.error(err, {
        position: toast.POSITION.TOP_LEFT
      });
      navigator(`/${basePath}/error`);

    }
  }
  useEffect(() => {
    console.log(location)
    getData()
  }, [])

  return (
    <>
      <div className="header pb-8 pt-5 pt-md-8" style={{
        backgroundColor: location.pathname == `/${basePath}/admin/index` ? color : 'transparent'
      }}>
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {localStorage.getItem('totalusers')}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Exercises
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{localStorage.getItem('totalExercises')}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Categories
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{localStorage.getItem('totalCategories')}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Plans
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{localStorage.getItem('totalPlans')}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
