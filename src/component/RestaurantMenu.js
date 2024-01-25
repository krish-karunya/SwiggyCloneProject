import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constant";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();
  console.log(resId);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setResInfo(json.data);
    console.log(json);
    // console.log(json.data.cards[0].card.card.info);
  };
  if (resInfo === null) {
    return <Shimmer />;
  }
  const { name, cuisines, costForTwo } = resInfo.cards[0].card.card.info;

  const { itemCards } =
    resInfo.cards[2].groupedCard.cardGroupMap.REGULAR.cards[2].card.card;
  console.log(itemCards);

  return (
    <div>
      <h1>{name}</h1>
      <h2>
        {cuisines.join(",")} -{costForTwo / 100}
      </h2>
      {/* <h2>{itemCards[7].card.info.name}</h2> */}
      <ul>
        {" "}
        {itemCards.map((item) => {
          return (
            <li key={item.card.info.id}>
              {item.card.info.name}-Rs.{item.card.info.price / 100}
              <h4>{item.card.info.ratings.aggregatedRating.rating}</h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;