import swapBackground from "../../assets/img/swap-bg.png";
import { Image, Row, Col, Form, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { useBetween } from "use-between";
import useSharableState from "../../../src/SharableState.js";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchData } from "../../redux/data/dataActions";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #212428;
    border-bottom: 0;
    box-shadow: 0 4px 20px 0 rgba(10,10,10, .8);
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: #fff;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: none !important;
  }
  header#myHeader .logo .d-3{
    display: block !important;
  }
  footer.footer-light .subfooter span img.d-1{
    display: none !important;
  }
  footer.footer-light .subfooter span img.d-3{
    display: inline-block !important;
  }
  .de_countdown{
    right: 10px;
    color: #fff;
  }
  .author_list_pp{
    margin-left:0;
  }
  footer.footer-light .subfooter{
    border-top: 1px solid rgba(255,255,255,.1);
  }
`;

// LOADER
const override = css`
  border-bottom-color: transparent !important;
  border-color: #ffffff;
  top: 2px;
`;

const tokenOption = [
  { label: "BNB", value: "1" },
  { label: "JTOKEN", value: "2" },
];

const Swap = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [coinRate, setCoinRate] = useState("");
  const [token, setToken] = useState("");
  const [coinOneVal, setCoinOneVal] = useState("");
  const [coinTwoVal, setCoinTwoVal] = useState("");
  const [toToken, setToToken] = useState("");
  const { JTOKENAddress } = useBetween(useSharableState);
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState("");
  const [renderBtn, setRenderBtn] = useState(false);

  useEffect(() => {
    if (blockchain.account !== null) {
      dispatch(fetchData(blockchain.account));
      checkJTOKEN();

    }
  }, [blockchain.JTOKEN]); // eslint-disable-line

  //CHECK SPAL APPROVE
  const checkJTOKEN = () => {
    blockchain.JTOKEN.methods
      .allowance(blockchain.account, JTOKENAddress)
      .call({ from: blockchain.account })
      .then((receipt) => {
        setApproved(receipt);
      });
  };

  const checkRenderBtn = () => {
    if (approved !== "0") {
      setRenderBtn(true);
    }
  };

  var Web3 = require("web3");

  const swapBtn = () => {
    if (toToken == "JTOKEN") {
      let coinOne = Web3.utils.toWei(String(coinOneVal), "ether");
      let coinTwo = Web3.utils.toWei(String(coinTwoVal), "ether");
      let tmp_hashedValue = coinOne + coinTwo + 1111;
      let hashedValue = Web3.utils.sha3(tmp_hashedValue, { encoding: "hex" });
      console.log(hashedValue);
      blockchain.JTOKEN.methods
        .buyToken(coinOne, coinTwo, hashedValue)
        .send({ from: blockchain.account })
        .once("error", (err) => {
          console.log(err);
        });
    } else if (toToken == "BNB") {
      let coinTwo = Web3.utils.toWei(String(coinTwoVal), "ether");
      let tmp_hashedValue = coinTwo + 1111;
      let hashedValue = Web3.utils.sha3(tmp_hashedValue, { encoding: "hex" });
      console.log(hashedValue);
      blockchain.JTOKEN.methods
        .sendEtherToUser(blockchain.account ,coinTwo, hashedValue)
        .send({ from: blockchain.account })
        .once("error", (err) => {
          console.log(err);
        });
    }
  };

  const approveBtn = () => {
    document.getElementById("loadingbtn").style.display = "block";
    document.getElementById("approvebtn").style.display = "none";
    setLoading(true);
    blockchain.JTOKEN.methods
      .approve(JTOKENAddress, Web3.utils.toWei("99999999999", "ether"))
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loadingbtn").style.display = "none";
        document.getElementById("approvebtn").style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loadingbtn").style.display = "none";
        document.getElementById("swapbtn").style.display = "block";
      });
  };

  return (
    <div>
      <GlobalStyles />
      <section className="jumbotron no-bg bg-image background">
        <div className="text-center div-center w-100">
          <h2 className="style-2">Swap</h2>
          <Row className="justify-content-center">
            <Col md={5}>
              <Card>
                <Card.Header>
                  <h3 className="mb-2">Exchange</h3>
                  Trade tokens in an instant
                </Card.Header>

                <Card.Body>
                  <Card className="mb-3">
                    <Card.Body>
                      {/* {renderFrom()} */}
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{ float: "left" }}>
                              From
                            </Form.Label>
                            <Form.Label style={{ float: "right" }}>
                              Rate : {token ? coinRate : "-"}
                            </Form.Label>
                          </Col>
                        </Row>
                        <Row className="pt-2">
                          <Col>
                            <Form.Control
                              className="input-control m-0 p-0"
                              type="number"
                              placeholder="0.0"
                              value={coinOneVal}
                              onChange={(e) => {
                                setCoinOneVal(e.target.value);
                                if (toToken == "JTOKEN") {
                                  setCoinTwoVal(e.target.value * 100);
                                } else if (toToken == "BNB") {
                                  setCoinTwoVal(e.target.value / 100);
                                }
                              }}
                            ></Form.Control>
                          </Col>
                          <Col md="auto">
                            <Row>
                              <Col>
                                <Form.Control
                                  as="select"
                                  className="m-0 p-0"
                                  style={{ textAlign: "right" }}
                                  onChange={(e) => {
                                    setToken(parseInt(e.target.value, 10));
                                    //API pass value to get balance
                                    if (e.target.value === "1") {
                                      setCoinRate(100);
                                      setToToken("JTOKEN");
                                      setCoinTwoVal(coinOneVal * 100);
                                    } else if (e.target.value === "2") {
                                      setCoinRate(0.01);
                                      setToToken("BNB");
                                      setCoinTwoVal(coinOneVal / 100);
                                    }
                                  }}
                                >
                                  <option disabled selected hidden>
                                    Select an currency
                                  </option>
                                  {tokenOption.map((option, optionIndex) => {
                                    return (
                                      <option
                                        value={option.value}
                                        key={`option_state_${optionIndex}`}
                                        style={{ color: "black" }}
                                      >
                                        {option.label}
                                      </option>
                                    );
                                  })}
                                </Form.Control>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Card.Body>
                  </Card>
                  <div className="demo-icon-wrap-s2 text-center mb-3">
                    <span aria-hidden="true" className="arrow_down"></span>
                  </div>
                  <Card className="mb-4">
                    <Card.Body>
                      {/* {renderTo()} */}
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{ float: "left" }}>
                              To
                            </Form.Label>
                            <Form.Label style={{ float: "right" }}>
                              Rate : {coinRate}
                            </Form.Label>
                          </Col>
                        </Row>
                        <Row className="pt-2">
                          <Col>
                            <Form.Control
                              className="input-control m-0 p-0 "
                              type="number"
                              placeholder="0.0"
                              value={coinTwoVal}
                              onChange={(e) => {
                                setCoinTwoVal(e.target.value);
                              }}
                              disabled
                            />
                          </Col>
                          <Col md="auto">
                            <Row>
                              <Col>{toToken}</Col>
                            </Row>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Card.Body>
                  </Card>
                  <Button
                    id="loadingbtn"
                    className="btn btn-purple mt-2"
                    style={{ display: "none" }}
                  >
                    Loading
                    <ClipLoader loading={loading} css={override} size={17} />
                  </Button>
                  {renderBtn ? (
                    <Button
                      className="btn btn-purple mt-2"
                      onClick={() => {
                        swapBtn();
                      }}
                    >
                      Swap
                    </Button>
                  ) : (
                    <Button
                      className="btn btn-purple mt-2"
                      onClick={() => {
                        approveBtn();
                      }}
                    >
                      Approve
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};
export default Swap;
