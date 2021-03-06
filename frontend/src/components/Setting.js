import React from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Config } from '../config';

export default class Setting extends React.Component {

  state = {
    romance: "1",
    cliche: "1",
    horror: "1",
    boring: "1",
    violence: "1",
    storylength: "5000",
  }

  handleChange = (value) => (event) => {
    this.setState({[value]: event.target.value});
  }

  submit = () => {
    console.log(this.props);
    // get ready for fetch
    let url = Config.url+"/books";
    const book1 = this.props.firstNovel.label;
    const book2 = this.props.secondNovel.label;
    let params = {
      book1: book1,
      book2: book2,
      romance: this.state.romance,
      cliche: this.state.cliche,
      horror: this.state.horror,
      boring: this.state.boring,
      violence: this.state.violence,
      // storylength: this.state.storylength,
    }
    console.log(params);
    let paramsArray = [];
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
    } else {
        url += '&' + paramsArray.join('&')
    }
    // fetch generated story
    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      mode: 'cors'
    })
    .then((resp) => resp.json())
    .catch((error)=>{console.log(error)})
    .then((response) => {
      if (!response) {
        // alert('Ooops, there is something wrong with your network!');
        return;
      }
      // console.log(response);
      this.props.setFinalNovel(response);
      this.props.changeActiveStep(2);
    });
    // this.props.changeActiveStep(2);
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Row form>
            <Col md={6}>
              <Label for="romance">Romance Rating  <img style={{width:"20px"}} src={process.env.PUBLIC_URL+"/images/romance.svg" }/></Label>
              <Input type="select" name="select" id="romance"
                    value={this.state.romance} onChange={this.handleChange("romance")}>
                <option value={1} label="Lowest"/>
                <option value={2} label="Low"/>
                <option value={3} label="Middle"/>
                <option value={4} label="High"/>
                <option value={5} label="Highest"/>
              </Input>
            </Col>
            <Col md={6}>
              <Label for="horror">Horror Rating <img style={{width:"20px"}} src={process.env.PUBLIC_URL+"/images/horror.svg" }/></Label>
              <Input type="select" name="horror" id="horror"
                    value={this.state.horror} onChange={this.handleChange("horror")}>
                <option value={1} label="Lowest"/>
                <option value={2} label="Low"/>
                <option value={3} label="Middle"/>
                <option value={4} label="High"/>
                <option value={5} label="Highest"/>
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row form>
            <Col md={6}>
              <Label for="cliche">Cliche Rating <img style={{width:"20px"}} src={process.env.PUBLIC_URL+"/images/cliche.svg" }/></Label>
              <Input type="select" name="cliche" id="cliche"
                    value={this.state.cliche} onChange={this.handleChange("cliche")}>
                <option value={1} label="Lowest"/>
                <option value={2} label="Low"/>
                <option value={3} label="Middle"/>
                <option value={4} label="High"/>
                <option value={5} label="Highest"/>
              </Input>
            </Col>
            <Col md={6}>
              <Label for="violence">Violence Rating <img style={{width:"20px"}} src={process.env.PUBLIC_URL+"/images/violence.svg" }/></Label>
              <Input type="select" name="violence" id="violence"
                    value={this.state.violence} onChange={this.handleChange("violence")}>
                <option value={1} label="Lowest"/>
                <option value={2} label="Low"/>
                <option value={3} label="Middle"/>
                <option value={4} label="High"/>
                <option value={5} label="Highest"/>
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row form>
            <Col md={6}>
              <Label for="boring">Boring Rating <img style={{width:"20px"}} src={process.env.PUBLIC_URL+"/images/boring.svg" }/></Label>
              <Input type="select" name="boring" id="boring"
                    value={this.state.boring} onChange={this.handleChange("boring")}>
                <option value={1} label="Lowest"/>
                <option value={2} label="Low"/>
                <option value={3} label="Middle"/>
                <option value={4} label="High"/>
                <option value={5} label="Highest"/>
              </Input>
            </Col>
            {/* <Col md={6}>
              <Label for="storyLength">Story Length</Label>
              <Input type="select" name="sLength" id="storyLength"
                    value={this.state.storylength} onChange={this.handleChange("storylength")}>
                <option value="5000" label="0~5000"/>
                <option value="10000" label="5000~10000"/>
                <option value="20000" label="10000~20000"/>
              </Input>
            </Col> */}
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3"></Col>
            <Col sm="2">
              <Button type="button"
                color="primary"
                onClick={this.submit}
                className="btn btn-primary btn-block">
                Submit
              </Button>
            </Col>
            <Col sm="2"></Col>
            <Col sm="2">
              <Button type="button"
                onClick={() => this.props.changeActiveStep(0)}
                className="btn btn-block">
                Cancel
              </Button>
            </Col>
            <Col sm="3"></Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
}