import './error.css';

export default function Error() {
  return (
    <div className = "errorPage">
      <div>
        <div className = "errorMessage">
          <div className = "first">
            <p>404</p>
          </div>
          <div className = "second">
            <p>This page could not be found.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
