import styles from './styles.module.css';
export default function Skeleton() {
    return (
        <div>
            <div className='o-vertical-spacing o-vertical-spacing--l'>
                <div className='blog-post o-media'>
                    <div className='o-media__figure'>
                        <span
                            className={styles.skeletonBox}
                            style={{ width: '100%', height: '80px' }}></span>
                    </div>
                    <div className='o-media__body'>
                        <div className='o-vertical-spacing'>
                            <h3 className='blog-post__headline'>
                                <span
                                    className={styles.skeletonBox}
                                    style={{ width: '55%' }}></span>
                            </h3>
                            <p>
                                <span
                                    className={styles.skeletonBox}
                                    style={{ width: '80%' }}></span>
                                <span
                                    className={styles.skeletonBox}
                                    style={{ width: '90%' }}></span>
                                <span
                                    className={styles.skeletonBox}
                                    style={{ width: '83%' }}></span>
                                <span
                                    className={styles.skeletonBox}
                                    style={{ width: '80%' }}></span>
                            </p>
                            <div className='blog-post__meta'>
                                <span
                                    className={styles.skeletonBox}
                                    style={{ width: '70%' }}></span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <li className="blog-post o-media">
        <div className="o-media__figure">
          <span className={styles.skeletonBox} style={{width:"100%",height:"80px"}}></span>
        </div>
        <div className="o-media__body">
          <div className="o-vertical-spacing">
            <h3 className="blog-post__headline">
              <span className={styles.skeletonBox} style="width:55%;"></span>
            </h3>
            <p>
              <span className={styles.skeletonBox} style="width:80%;"></span>
              <span className={styles.skeletonBox} style="width:90%;"></span>
              <span className={styles.skeletonBox} style="width:83%;"></span>
              <span className={styles.skeletonBox} style="width:80%;"></span>
            </p>
            <div className="blog-post__meta">
              <span className={styles.skeletonBox} style="width:70px;"></span>
            </div>
          </div>
        </div>
      </li>
      <li className="blog-post o-media">
        <div className="o-media__figure">
          <span className={styles.skeletonBox} style="width:100px;height:80px;"></span>
        </div>
        <div className="o-media__body">
          <div className="o-vertical-spacing">
            <h3 className="blog-post__headline">
              <span className={styles.skeletonBox} style="width:55%;"></span>
            </h3>
            <p>
              <span className={styles.skeletonBox} style="width:80%;"></span>
              <span className={styles.skeletonBox} style="width:90%;"></span>
              <span className={styles.skeletonBox} style="width:83%;"></span>
              <span className={styles.skeletonBox} style="width:80%;"></span>
            </p>
            <div className="blog-post__meta">
              <span className={styles.skeletonBox} style="width:70px;"></span>
            </div>
          </div>
        </div>
      </li> */}
            </div>
        </div>
    );
}
