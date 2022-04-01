const tokenName = (link) => {
  if (link === "http://localhost:3000/img/marketplace/1.png") {
    return "Old Mcdonald Alpaca";
  } else if (link === "http://localhost:3000/img/marketplace/2.png") {
    return "Ragnar Alpaca";
  } else if (link === "http://localhost:3000/img/marketplace/3.png") {
    return "Arthur Alpaca";
  } else if (link === "http://localhost:3000/img/marketplace/4.png") {
    return "Merlin Alpaca";
  } else if (link === "http://localhost:3000/img/marketplace/5.png") {
    return "Alpaca Armstrong";
  }
};

export default tokenName;
