import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize ,onPageChange} = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if(pageCount==null) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li className="page-item" key={page}>
            <a className="page-link" onClick={()=>onPageChange(page)}>{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
