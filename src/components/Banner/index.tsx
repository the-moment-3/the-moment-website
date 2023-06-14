import styles from './styles.module.css';

export const Banner = ({ label = 'The Moment3!' }: { label?: string }) => {
  const labelList = new Array(15).fill(label);
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        {labelList.map((label, idx) => {
          return (
            <div className={styles.label} key={idx}>
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
