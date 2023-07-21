import styles from './styles.module.css';
export default function Loading() {
    return (
        <div className={styles.loader}>
            <span>Loading</span>
        </div>
    );
}
