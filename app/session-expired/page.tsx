export default function SessionExpiredPage() {
  return (
    <main className="simple-auth">
      <section className="simple-card">
        <h1>Your session has expired</h1>
        <p>Please sign in again to continue to your workspace.</p>
        <a className="primary-button" href="/login">Sign in</a>
      </section>
    </main>
  )
}
