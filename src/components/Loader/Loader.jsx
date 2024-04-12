import { Bars } from 'react-loader-spinner';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <Bars
        height="200"
        width="200"
        color="#9c27b0"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}