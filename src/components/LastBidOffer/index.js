import { useEffect, useState } from "react";
import axios from "axios";

const LastBidOffer = ({ offerId }) => {
  const [data, setData] = useState(0);
  useEffect(() => {
    (async () =>
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/offers/${offerId}/offerBiddings?limit=1&order=DESC`
        )
        .then((res) => {
          setData(res.data[0].price);
        })
        .catch((err) => console.log(err)))();
  }, [offerId]);

  return <span>{data}</span>;
};

export default LastBidOffer;
