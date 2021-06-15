import React from 'react'
import StarRating from 'react-bootstrap-star-rating';

const Rate = () => {
    return (
        <div>
            <StarRating
                defaultValue={5}
                min={0}
                max={5}
                step={1} />
        </div>
    );
}

export default Rate;