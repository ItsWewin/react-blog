import React, {Component} from 'react';
import Style from './categories_list.scss';

const CategoryList = ({ state, toggleArticle }) => (
  <div className="categories-area">
    <ul className="categories-list">
      { state && state.categories && state.categories.length > 0
        ? state.categories.map((item) => {
            return <li key={item.id}
                     className={ state.active_id == item.id ? 'active' : ''}
                     onClick={ () => toggleArticle(item.id)}
                   >
                     {item.name}
                   </li>
          })
        : '加载中...'
      }
    </ul>
  </div>
)

export default CategoryList;