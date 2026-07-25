import { Link } from 'react-router-dom'
import styles from './ComingSoon.module.css'

function ComingSoon({ title }) {
  return (
    <main className={styles.wrap}>
      <h1>{title}</h1>
      <p>
        This page hasn't been migrated to React yet. It's still available in
        the static HTML/CSS version of SlotHive while we work through it
        page by page.
      </p>
      <Link to="/" className="button">Back home</Link>
    </main>
  )
}

export default ComingSoon