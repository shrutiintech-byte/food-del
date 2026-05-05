import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {

  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>

      <div className="food-display-list">

        {/* ✅ SAFE CHECK BEFORE MAP */}
        {food_list && food_list.length > 0 ? (
          food_list.map((item, index) => {

            // category filter
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={item._id || index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }

            return null;
          })
        ) : (
          <p className="loading-text">Loading food items...</p>
        )}

      </div>
    </div>
  );
};

export default FoodDisplay;