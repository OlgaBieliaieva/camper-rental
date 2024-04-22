import BookingForm from "../BookingForm/BookingForm";
import StarIcon from "../Icons/StarIcon";
import styles from "./Reviews.module.css";

export default function Reviews({ product, onClose }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsWrapper}>
        <ul className={styles.reviewsList}>
          {product?.reviews.map((review, index) => (
            <li key={index} className={styles.listItem}>
              <div className={styles.titleWrapper}>
                <div className={styles.avatar}>
                  {review.reviewer_name.slice(0, 1)}
                </div>
                <div className={styles.title}>
                  <p>{review.reviewer_name}</p>
                  <ul className={styles.rating}>
                    {stars.map((_, index) => (
                      <li key={index}>
                        <StarIcon
                          className={`${styles.starIcon} ${
                            index <= Math.ceil(review.reviewer_rating - 1)
                              ? styles.active
                              : ""
                          }`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                
              </div>
              <p className={styles.reviewContent}>{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
      <BookingForm product={product} onClose={onClose}/>
    </div>
  );
}
