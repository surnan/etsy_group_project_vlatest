const ReviewCard = ({rev}) => {
    console.log('The stars are ', rev.stars)
    return (
        <>
        <h3>{rev.stars}</h3>
        <p>{rev.review}</p>
        </>
        
    )
};

export default ReviewCard