import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../components/Sidebar';

function Home() {
  return (
    <Grid>
      <Row>
        <Col xs={24} md={8}>
          <Sidebar/>
        </Col>
      </Row>
    </Grid>
  )
}

export default Home;
