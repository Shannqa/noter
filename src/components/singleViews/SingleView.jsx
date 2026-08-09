function SingleView({ title, children }) {
  return(
    <div className={styles.singleView}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}

export default singleView;