export default function Loading() {
  return <div className="appShell" aria-label="Loading marketplace"><div className="skeleton skeletonTitle" /><div className="skeleton skeletonSearch" />{[1,2,3].map((item) => <div className="skeleton skeletonCard" key={item} />)}</div>;
}
